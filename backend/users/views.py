import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserCreateSerializer,UserSerializer
from rest_framework.permissions import IsAuthenticated
from .models import UserAccount
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
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
        
        user = request.user
        all_user = UserAccount.objects.all()
        print(all_user)
        print(user)
        user_data = UserAccount.objects.get(email=user)
        print(user_data.is_superuser)
        user = UserSerializer(user)
        all_user = UserSerializer(all_user)
        return Response(user.data, status=status.HTTP_200_OK)


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
        keywords = data['keywords']
        blog_topic = generateBlogTopicIdeas(topic, keywords)
        print(blog_topic)
        return Response(blog_topic,status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def BlogTopic(request):
    if request.method == 'POST':
        data = request.data
        topic = data['topic']
        keywords = data['keywords']
        accuracy = data['accuracy']
        words = data['words']
        blog_topic = generateBlogTopic(topic, keywords,words,accuracy)
        print(blog_topic)
        return Response(blog_topic,status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Story(request):
    if request.method == 'POST':
        data = request.data
        topic = data['topic']
        keywords = data['keywords']
        accuracy = data['accuracy']
        words = data['words']
        story = generateStory(topic, keywords,words,accuracy)
        print(story)
        return Response(story,status=status.HTTP_200_OK)

