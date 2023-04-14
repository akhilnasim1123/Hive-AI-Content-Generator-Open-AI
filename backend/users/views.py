import json
from requests import session
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .models import BlogIdea, BlogIdeaSave, BlogSection, UserAccount,StoryDetails
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .functions import *
from django.core import serializers
from django.db.models import Sum


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = UserAccount.objects.get(email=user)
        user_data = UserSerializer(user_data)
        return Response(user_data.data, status=status.HTTP_200_OK)


# Sherlock@11

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def UserData(request):
    if request.method == 'GET':
        user = UserAccount.objects.filter(is_superuser=False)
        user = UserSerializer(user, many=True)
        return Response(user.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Block(request):
    if request.method == 'POST':
        email = request.data
        user = UserAccount.objects.get(email=email)
        if user.is_active == True:
            user.is_active = False
            user.save()
        else:
            user.is_active = True
            user.save()
        all_user = UserAccount.objects.filter(is_superuser=False).order_by()
        all_user = UserSerializer(all_user, many=True)
        return Response(all_user.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Update(request):
    if request.method == 'POST':
        data = request.data
        email = data['email']
        url = data['url']
        user = UserAccount.objects.get(email=email)
        user.image_url = url
        user.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Delete(request):
    if request.method == 'POST':
        data = request.data
        email = data
        user = UserAccount.objects.get(email=email)
        user.delete()
        all_user = UserAccount.objects.filter(is_superuser=False).order_by()
        all_user = UserSerializer(all_user, many=True)
        return Response(all_user.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Search(request):
    if request.method == 'POST':
        data = request.data
        searchData = UserAccount.objects.filter(
            first_name__icontains=data, is_superuser=False)
        searchData = UserSerializer(searchData, many=True)
        return Response(searchData.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def BlogTopicIdeas(request):
    if request.method == 'POST':
        data = request.data

        topic = data['topic']
        user = data['email']
        request.session['topic'] = topic
        keywords = data['keywords']
        request.session['keywords'] = keywords

        user = UserAccount.objects.get(email=user)

        blog_topic = generateBlogTopicIdeas(topic, keywords)

        blog = BlogIdea.objects.create(
            title=topic, keywords=keywords, user=user, wordCount=250)
        request.session['blog_topic'] = blog_topic
        blog = BlogIdeaSerializer(blog)
        context = {'blog_topic': blog_topic, 'blog': blog.data}
        return Response(context, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def BlogTopic(request):
    if request.method == 'POST':
        data = request.data
        topic = data['topic']
        topic = str(topic)
        keywords = data['keywords']
        keywords = str(keywords)
        accuracy = data['accuracy']
        words = data['words']
        blog_topic = generateBlogTopic(topic, keywords, words, accuracy)
        return Response(blog_topic, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Story(request):
    if request.method == 'POST':
        data = request.data
        topic = data['topic']
        keywords = data['keywords']
        accuracy = data['accuracy']
        email = data['email']
        words = data['words']
        user = UserAccount.objects.get(email=email)
        story = generateStory(topic, keywords, words, accuracy)
        story_save = StoryDetails.objects.create(
                title = topic,
                keywords = keywords,
                accuracy = accuracy,
                user = user,
                story = story,
                wordCount= words)
        return Response(story, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def BlogIdeasSave(request):
    data = request.data
    blogTopic = data['content']
    email = data['email']
    keywords = data['keywords']
    title = data['topic']
    user = UserAccount.objects.get(email=email)
    blog = BlogIdeaSave.objects.create(
        title=title,
        blog_ideas=blogTopic,
        keywords=keywords,
        user=user,
    )
    blog.save()
    blog = BlogIdeaSerializer(blog)
    return Response(blog.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def generateBlogsSect(request):
    data = request.data

    headings = data['checkedList']
    topic = data['topic']
    keywords = data['keywords']
    unique_id = data['unique_id']

    blog = BlogIdea.objects.get(
        title=topic, keywords=keywords, unique_id=unique_id)
    for heading in headings:
        section = generateBlogSections(topic, heading, keywords)
        blog_section = BlogSection.objects.create(
            title=heading,
            body=section,
            blog=blog,
            user = blog.user
        )
        blog_section.save()
    sections = BlogSection.objects.filter(blog=blog)
    sections = BlogSectionSerializer(sections, many=True)
    return Response(sections.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def UserCollection(request):
    wordCount = 0
    data = request.data
    print(request.user)
    email = data['email']
    print(email)

    user = UserAccount.objects.get(email=email)
    print(user,'email')

    blogIdeas = BlogIdea.objects.filter(user=user)
    BlogIdea_wordCount =BlogIdea.objects.filter(user=user).aggregate(Sum('wordCount'))
    BlogIdea_wordCount = BlogIdea_wordCount['wordCount__sum']
    blogIdeasCount = BlogIdea.objects.filter(user=user).count()

    blogSection = BlogSection.objects.filter(user=user)
    BlogSection_wordCount = BlogSection.objects.filter(user=user).aggregate(Sum('wordCount'))
    blogSectionCount = BlogSection.objects.filter(user=user).count()

    blog_idea_save = BlogIdeaSave.objects.filter(user=user)
    blogIdeaSaveCount = BlogIdea.objects.filter(user=user).count()
    blogIdeaSaveWordCount = BlogIdeaSave.objects.filter(user=user).aggregate(Sum('wordCount'))
    blogIdeaSaveWordCount = blogIdeaSaveWordCount['wordCount__sum']

    story =StoryDetails.objects.filter(user=user)
    storyCount = StoryDetails.objects.filter(user=user).count()
    storyCountWords = StoryDetails.objects.filter(user=user).aggregate(Sum('wordCount'))
    storyCountWords = storyCountWords['wordCount__sum']



    blogIdeas = BlogIdeaSerializer(blogIdeas, many=True)
    blogSection = BlogSectionSerializer(blogSection,many=True)
    blog_idea_save = BlogIdeaSaveSerializer(blog_idea_save, many=True)
    story = StorySerializer(story, many=True)

    wordCount =  + int(BlogIdea_wordCount) + int(BlogIdea_wordCount) +int(storyCountWords)
    print(wordCount)
    context = {
        'blogIdeas': blogIdeas.data,
        'blogSection': blogSection.data,
        'blog_idea_save': blog_idea_save.data,
        'blogIdeasCount': blogIdeasCount,
        'blogSectionCount': blogSectionCount,
        'blogIdeaSaveCount':blogIdeaSaveCount,
        'total_words':wordCount,
        'story':story.data,
        'storyCount':storyCount,

    }
    return Response(context,status=status.HTTP_200_OK)


