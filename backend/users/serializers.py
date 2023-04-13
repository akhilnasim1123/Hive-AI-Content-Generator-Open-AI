from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions

from .models import Blog, BlogSection


User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('first_name', 'last_name', 'phone_number','email', 'password')

  def validate(self, data):
    user = User(**data)
    password = data.get('password')

    try:
      validate_password(password, user)
    except exceptions.ValidationError as e:
      serializer_errors = serializers.as_serializer_error(e)
      raise exceptions.ValidationError(
        {'password': serializer_errors['non_field_errors']}
      )

    return data
  def create(self, validated_data):
    user = User.objects.create_user(
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      phone_number=validated_data['phone_number'],
      email=validated_data['email'],
      password=validated_data['password'],
    )

    return user



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User    
        fields = ('first_name', 'last_name', 'phone_number','email','is_active','is_superuser','image_url')

# class ContentSerializer(serializers.)

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog    
        fields = '__all__'

class BlogSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogSection   
        fields = ('title','body')


 