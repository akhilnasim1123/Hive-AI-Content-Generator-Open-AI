import json
from requests import session
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import BlogSectionSerializer, BlogSerializer, UserCreateSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Blog, BlogIdeaSave, BlogSection, UserAccount
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .functions import *
from django.core import serializers


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
        print(request.user)
        user = request.user
        print(user)
        print(user)
        user_data = UserAccount.objects.get(email=user)
        print(user_data.is_superuser)
        user_data = UserSerializer(user_data)
        return Response(user_data.data, status=status.HTTP_200_OK)


# Sherlock@11

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def UserData(request):
    if request.method == 'GET':
        user = UserAccount.objects.filter(is_superuser=False)
        print(user)
        user = UserSerializer(user, many=True)
        return Response(user.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Block(request):
    if request.method == 'POST':
        email = request.data
        print(email)
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
        print(searchData)

        searchData = UserSerializer(searchData, many=True)
        print(searchData)
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
        Blog.objects.create(title=topic, keywords=keywords,user=user)

        blog_topic = generateBlogTopicIdeas(topic, keywords)
        request.session['blog_topic'] = blog_topic

        print(blog_topic)
        print(request.session['topic'])
        return Response(blog_topic, status=status.HTTP_200_OK)


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
        print(blog_topic)
        return Response(blog_topic, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Story(request):
    if request.method == 'POST':
        data = request.data
        topic = data['topic']
        topic = str(topic)
        keywords = data['keywords']
        keywords = str(keywords)
        accuracy = data['accuracy']
        words = data['words']
        story = generateStory(topic, keywords, words, accuracy)
        print(story)
        return Response(story, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def BlogIdeasSave(request):
    data = request.data
    blogTopic = data['content']
    email = data['email']
    keywords = data['keywords']
    title = data['topic']
    print(keywords)
    print(email)
    user = UserAccount.objects.get(email=email)

    blog = BlogIdeaSave.objects.create(
        title=title,
        blog_ideas=blogTopic,
        keywords=keywords,
        user=user,
    )
    blog.save()
    blog = BlogSerializer(blog)
    return Response(blog.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def generateBlogsSect(request):
    data = request.data

    headings = data['checkedList']
    topic = data['topic']
    keywords = data['keywords']

    blog = Blog.objects.get(title=topic, keywords=keywords)
    print(headings)
    for heading in headings:
        section =generateBlogSections(topic,heading,keywords)
        print(section)
        blog_section = BlogSection.objects.create(
            title = heading,
            body = section,
            blog = blog
        )
        blog_section.save()
    sections = BlogSection.objects.filter(blog=blog)
    sections = BlogSectionSerializer(sections,many=True)
    print(sections.data)
    return Response(sections.data, status=status.HTTP_200_OK)

