import json
from requests import session
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .helpers import sent_otp_to_mobile

from .emails import sent_otp_via_email


from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .models import BlogIdea, BlogIdeaSave, BlogSection, UserAccount, StoryDetails
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .functions import *
from django.core import serializers
from django.db.models import Sum
from django.db.models import Q


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.create(serializer.validated_data)

        
        user = UserSerializer(user)
        print(user.data['email'])



        return Response(user.data, status=status.HTTP_201_CREATED)
    





class RetrieveUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = UserAccount.objects.get(email=user)
        print(user_data.currentSub)
        user_data = UserSerializer(user_data)
        return Response(user_data.data, status=status.HTTP_200_OK)


# Sherlock@11

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def email_login(request):
    data = request.data
    email = data['email']
    user = UserAccount.objects.filter(email=email).exists()
    print(email)
    print(user)
    if user == True:
        otp = sent_otp_via_email(email)
        print(otp)
        message = "Otp Sended"
        return Response(message,status=status.HTTP_200_OK)
    else:
        message="Invalid email, please try again"
        return Response(message,status=status.HTTP_401_UNAUTHORIZED)
    

# @api_view(['GET', 'POST'])
# @permission_classes([AllowAny])
# def Phone_login(request):
#     data = request.data
#     phone = data.get('phone')
#     user = UserAccount.objects.filter(phone_number=phone).exists()
#     if user:
#         otp = sent_otp_to_mobile(phone)
#         print(otp)
#         return Response(status=status.HTTP_200_OK,message="OTP sended")
#     else:
#         return Response(status=status.HTTP_401_UNAUTHORIZED,message="Invalid email, please try again")
    

    


from django.contrib.auth.hashers import check_password
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def otp_verify(request):
    data = request.data
    otp = data['otp']
    otp_verifying = OTP.objects.filter(otp=otp).exists()
    if otp_verifying:
        message="Verification Success"
        otp_data = OTP.objects.get(otp=otp)
        userdata = UserAccount.objects.get(email = otp_data.user.email)
        user = UserPasswordsSerializer(userdata)
        print(user)
        pas = check_password(user.data,userdata.password)
        print(pas)
        context = {
            'user': user.data,
            'message':message,
        }
        return Response(context,status=status.HTTP_200_OK)
    else:
        message="Verification Failure"
        return Response(message,status=status.HTTP_401_UNAUTHORIZED)








@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def UsersData(request):
    if request.method == 'POST':
        user = UserAccount.objects.filter(is_superuser=False).order_by('id')
        user = UserSerializer(user, many=True)
        return Response(user.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def UserData(request):
    if request.method == 'POST':
        data = request.data
        if data is None:
            value = None
        else:
            value = data['value']
        if value:
            user = UserAccount.objects.filter(subscriptionType=value,is_superuser=False).order_by('id')
            user = UserSerializer(user, many=True)
            return Response(user.data, status=status.HTTP_200_OK)
        user = UserAccount.objects.filter(is_superuser=False).order_by('id')
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
            first_name__icontains=data , is_superuser=False)
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
        word_list = blog_topic[1].split()
        number_of_words = len(word_list)
        wordCountChecker = CountChecker(user, number_of_words)
        print(blog_topic)
        print(number_of_words)
        print(wordCountChecker)
        if wordCountChecker:
            blog = BlogIdea.objects.create(
                title=topic, keywords=keywords, user=user, wordCount=number_of_words)
            request.session['blog_topic'] = blog_topic
            blog = BlogIdeaSerializer(blog)
            context = {'blog_topic': blog_topic, 'blog': blog.data}
            return Response(context, status=status.HTTP_200_OK)
        else:
            return Response(user.wordCount, status='words count limit exceeded')   


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def BlogTopic(request):
    if request.method == 'POST':
        data = request.data

        topic = data['topic']
        keywords = data['keywords']
        accuracy = data['accuracy']
        words = data['words']
        email = data['email']
        
        user = UserAccount.objects.get(email=email)
        blog_topic = generateBlogTopic(topic, keywords, words, accuracy)
        word_list = blog_topic[1].split()
        number_of_words = len(word_list)
        wordCountChecker = CountChecker(user, number_of_words)
        if wordCountChecker:
            blog = BlogCollection.objects.create(
                title = topic,
                blog = blog_topic,
                keywords = keywords,
                accuracy = accuracy,
                user = user,
            )
            print(number_of_words)
            print(wordCountChecker)
            return Response(blog_topic, status=status.HTTP_200_OK)
        else:
            return Response(user.wordCount, status='words count limit exceeded')     



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
        word_list = story[1].split()
        number_of_words = len(word_list)
        wordCountChecker = CountChecker(user, number_of_words)
        print(story[0])
        print(number_of_words)
        print(wordCountChecker)
        if wordCountChecker:
            story_save = StoryDetails.objects.create(
                title=topic,
                keywords=keywords,
                accuracy=accuracy,
                user=user,
                story=story,
                wordCount=number_of_words)
            return Response(story, status=status.HTTP_200_OK)
        else:
            error = 'words count limit exceeded'
            return Response(error, status=status.HTTP_507_INSUFFICIENT_STORAGE)            


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
    condition = True
    for heading in headings:
        section = generateBlogSections(topic, heading, keywords)
        word_list = section.split()
        number_of_words = len(word_list)
        wordCountChecker = CountChecker(blog.user, number_of_words)
        if wordCountChecker:
            blog_section = BlogSection.objects.create(
                title=heading,
                body=section,
                blog=blog,
                user=blog.user
            )
            blog_section.save()
        else:
            condition = False
            return condition
    if condition:
        sections = BlogSection.objects.filter(blog=blog)
        sections = BlogSectionSerializer(sections, many=True)
        return Response(sections.data, status=status.HTTP_200_OK)
    else:
        return Response(blog.user.wordCount, status='words count limit exceeded')


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def UserCollection(request):
    wordCount = 0
    data = request.data
    email = data['email']


    BlogIdea_wordCount = 0
    blogIdeaSaveWordCount = 0  
    storyCountWords = 0 


    user = UserAccount.objects.get(email=email)

    blogIdeas = BlogIdea.objects.filter(user=user)
    BlogIdea_wordCount = BlogIdea.objects.filter(
        user=user).aggregate(Sum('wordCount'))
    BlogIdea_wordCount = BlogIdea_wordCount['wordCount__sum']
    blogIdeasCount = BlogIdea.objects.filter(user=user).count()

    blogSection = BlogSection.objects.filter(user=user)
    BlogSection_wordCount = BlogSection.objects.filter(
        user=user).aggregate(Sum('wordCount'))
    blogSectionCount = BlogSection.objects.filter(user=user).count()

    blog_idea_save = BlogIdeaSave.objects.filter(user=user)
    blogIdeaSaveCount = BlogIdea.objects.filter(user=user).count()
    blogIdeaSaveWordCount = BlogIdeaSave.objects.filter(
        user=user).aggregate(Sum('wordCount'))
    blogIdeaSaveWordCount = blogIdeaSaveWordCount['wordCount__sum']
    print(blog_idea_save)

    story = StoryDetails.objects.filter(user=user)
    storyCount = StoryDetails.objects.filter(user=user).count()
    storyCountWords = StoryDetails.objects.filter(
        user=user).aggregate(Sum('wordCount'))
    storyCountWords = storyCountWords['wordCount__sum']

    blogIdeas = BlogIdeaSerializer(blogIdeas, many=True)
    blogSection = BlogSectionSerializer(blogSection, many=True)
    blog_idea_save = BlogIdeaSaveSerializer(blog_idea_save, many=True)
    story = StorySerializer(story, many=True)
    if BlogIdea_wordCount == None:
        BlogIdea_wordCount = 0
    if blogIdeaSaveWordCount == None:
        blogIdeaSaveWordCount = 0
    if storyCountWords == None:
        storyCountWords = 0

    print(BlogIdea_wordCount,blogIdeaSaveWordCount,storyCountWords)
    

    wordCount = + int(BlogIdea_wordCount) + int(blogIdeaSaveWordCount) + int(storyCountWords)
    print(wordCount)

    user.wordCount = wordCount
    user.save()
    context = {
        'blogIdeas': blogIdeas.data,
        'blogSection': blogSection.data,
        'blog_idea_save': blog_idea_save.data,
        'blogIdeasCount': blogIdeasCount,
        'blogSectionCount': blogSectionCount,
        'blogIdeaSaveCount': blogIdeaSaveCount,
        'total_words': wordCount,
        'story': story.data,
        'storyCount': storyCount,

    }
    return Response(context, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def PrimeSearch(request):
    if request.method == 'POST':
        data = request.data
        searchData = UserAccount.objects.filter(
            Q(first_name__icontains=data) | Q(email__icontains=data) |  Q(subscriptionType__icontains=data) | Q(wordCount__icontains=data), is_superuser=False)
        searchData = UserSerializer(searchData, many=True)
        return Response(searchData.data, status=status.HTTP_200_OK)
    

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def FreeTrailData(request):
    if request.method == 'GET':
        user = UserAccount.objects.filter(is_superuser=False,subscriptionType = 'Free Trail')
        userDetails = UserSerializer(user, many=True)

        freeTrail = Prime.objects.all()
        print(freeTrail)
        freeTrailDet = PrimeSerializer(freeTrail, many=True)
        print(freeTrailDet)
        context = {
            'userDetails':userDetails.data,
            'freeTrailDet':freeTrailDet.data
        }
        return Response(context, status=status.HTTP_200_OK)
    

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def EditPrime(request):
    if request.method == 'POST':
        data = request.data
        words = data['words']
        prize = data['prize']
        key = data['key']
        prime = data['prime']
        month = data['month']

        prime = Prime.objects.get(
            unique_id = key,
            prime = prime,
        )
        prime.words = words
        prime.prize = prize
        prime.month = month
        prime.save()
        prime = Prime.objects.all().order_by('id')
        prime = PrimeSerializer(prime,many=True)

        return Response(prime.data, status=status.HTTP_200_OK)
    



@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def PrimeData(request):
    if request.method == 'GET':
        prime = Prime.objects.all()
        print(prime)
        prime = PrimeNameSerializer(prime, many=True)
        print(prime.data[2])
        return Response(prime.data, status=status.HTTP_200_OK)
    



@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Beginner(request):
    if request.method == 'GET':
        user = UserAccount.objects.filter(is_superuser=False,subscriptionType = 'Beginner Level')
        userDetails = UserSerializer(user, many=True)

        freeTrail = Prime.objects.all()
        print(freeTrail)
        freeTrailDet = PrimeSerializer(freeTrail, many=True)
        print(freeTrailDet)
        context = {
            'userDetails':userDetails.data,
            'freeTrailDet':freeTrailDet.data
        }
        return Response(context, status=status.HTTP_200_OK)
    


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def subscriptionPlans(request):
    data = request.data
    plans = Prime.objects.all()
    plans = PrimeSerializer(plans,many=True)
    return Response(plans.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def registerSubscriptions(request):
    data = request.data
    email = data.get('email')
    payment_id = data['paymentId']
    plan = data['key']
    amount = data['amount']
    user = UserAccount.objects.get(email=email)
    sub = Prime.objects.get(prime=plan)
    plans = PremiumSubscription.objects.create(
        user=user,
        payment_id=payment_id,
        plan = sub,
        payment=amount,

    )
    planCheck = CurrentSub.objects.filter(user=user).exists()
    if planCheck:
        current = CurrentSub.objects.get(user=user)
        current.delete()
    current = CurrentSub.objects.create(
        user=user,
        premiumPlan=plans
        )
    current.save()
        
    user.premium = True
    user.subscriptions = plan
    user.monthlyCount=sub.words
    user.approve = True
    user.save()
    user = UserSerializer(user)
    return Response(user.data, status=status.HTTP_200_OK)







    



        
