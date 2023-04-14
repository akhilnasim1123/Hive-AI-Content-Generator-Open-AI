from django.utils import timezone
import uuid
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator
from django.utils.text import slugify




class UserAccountManager(BaseUserManager):
  
  def create_user(self, first_name, last_name,phone_number, email, password=None):
    if not email:
      raise ValueError('Users must have an email address')

    email = self.normalize_email(email)
    email = email.lower()

    user = self.model(
      first_name=first_name,
      last_name=last_name,
      phone_number=phone_number,
      email=email,
    )

    user.set_password(password)
    user.save(using=self._db)

    return user
  
  def create_superuser(self, first_name,last_name,phone_number,  email, password=None):
    user = self.create_user(
      first_name,
      last_name,
      phone_number,
      email,
      password=password,
    )

    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)

    return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255)
  email = models.EmailField(unique=True, max_length=255)
  phone_number = PhoneNumberField(max_length=17, unique=True)
  is_active = models.BooleanField(default=True)
  is_superuser = models.BooleanField(default=False)
  image_url = models.URLField(blank=True,null=True,max_length=300)
  is_staff = models.BooleanField(default=False,blank=True,null=True)

  objects = UserAccountManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name','phone_number']

  def __str__(self):
    return self.email
  


class BlogIdea(models.Model):
  title = models.CharField(max_length=255,null=True)
  blog_ideas = models.CharField(blank=True,max_length=300,null=True)
  keywords = models.CharField(blank=True,max_length=300,null=True)
  audience = models.CharField(blank=True,max_length=300,null=True)
  wordCount = models.IntegerField(blank=True,null=True)
  user = models.ForeignKey(UserAccount,on_delete=models.CASCADE)

  unique_id=models.CharField(null=True,max_length=100,blank=True)
  slug = models.SlugField(max_length=500,unique=True,blank=True,null=True)
  date_created = models.DateTimeField(null=True,blank=True)
  last_updated = models.DateTimeField(null=True,blank=True)


  def __str__(self):
    return '{} {}'.format(self.title,self.unique_id)
  
  def save(self, *args, **kwargs):
    if self.date_created is None:
      self.date_created = timezone.localtime(timezone.now())
    if self.unique_id is None:
      self.unique_id = str(uuid.uuid4()).split('-')[4]
    
    self.slug = slugify('{} {}'.format(self.title,self.unique_id))
    self.last_updated = timezone.localtime(timezone.now())
    super(BlogIdea, self).save(*args, **kwargs)




class BlogSection(models.Model):
  title = models.CharField(max_length=255)
  body = models.TextField(blank=True,null=True)
  blog = models.ForeignKey(BlogIdea,on_delete=models.CASCADE)
  wordCount = models.IntegerField(blank=True,null=True)
  user = models.ForeignKey(UserAccount,on_delete=models.CASCADE)
  unique_id=models.CharField(null=True,max_length=100,blank=True)
  slug = models.SlugField(max_length=500,unique=True,blank=True,null=True)
  date_created = models.DateTimeField(null=True,blank=True)
  last_updated = models.DateTimeField(null=True,blank=True)

  def __str__(self):
    return '{} {}'.format(self.title,self.unique_id)
  
  def save(self, *args, **kwargs):
    if self.date_created is None:
      self.date_created = timezone.localtime(timezone.now())
    if self.unique_id is None:
      self.unique_id = str(uuid.uuid4()).split('-')[4]
    
    self.slug = slugify('{} {}'.format(self.title,self.unique_id))
    self.last_updated = timezone.localtime(timezone.now())
    super(BlogSection, self).save(*args, **kwargs)
  


class BlogIdeaSave(models.Model):
  title = models.CharField(max_length=255,null=True)
  blog_ideas = models.CharField(blank=True,max_length=300,null=True)
  keywords = models.CharField(blank=True,max_length=300,null=True)
  audience = models.CharField(blank=True,max_length=300,null=True)
  wordCount = models.IntegerField(blank=True,null=True)
  user = models.ForeignKey(UserAccount,on_delete=models.CASCADE)

  unique_id=models.CharField(null=True,max_length=100,blank=True)
  slug = models.SlugField(max_length=500,unique=True,blank=True,null=True)
  date_created = models.DateTimeField(null=True,blank=True)
  last_updated = models.DateTimeField(null=True,blank=True)


  def __str__(self):
    return '{} {}'.format(self.title,self.unique_id)
  
  def save(self, *args, **kwargs):
    if self.date_created is None:
      self.date_created = timezone.localtime(timezone.now())
    if self.unique_id is None:
      self.unique_id = str(uuid.uuid4()).split('-')[4]
    
    self.slug = slugify('{} {}'.format(self.title,self.unique_id))
    self.last_updated = timezone.localtime(timezone.now())
    super(BlogIdeaSave, self).save(*args, **kwargs)




class StoryDetails(models.Model):
  title = models.CharField(max_length=255,null=True)
  story = models.CharField(blank=True,max_length=10000,null=True)
  keywords = models.CharField(blank=True,max_length=300,null=True)
  audience = models.CharField(blank=True,max_length=300,null=True)
  wordCount = models.IntegerField(blank=True,null=True)
  accuracy = models.IntegerField(blank=True,null=True)
  user = models.ForeignKey(UserAccount,on_delete=models.CASCADE)

  unique_id=models.CharField(null=True,max_length=100,blank=True)
  slug = models.SlugField(max_length=500,unique=True,blank=True,null=True)
  date_created = models.DateTimeField(null=True,blank=True)
  last_updated = models.DateTimeField(null=True,blank=True)


  def __str__(self):
    return '{} {}'.format(self.title,self.unique_id)
  
  def save(self, *args, **kwargs):
    if self.date_created is None:
      self.date_created = timezone.localtime(timezone.now())
    if self.unique_id is None:
      self.unique_id = str(uuid.uuid4()).split('-')[4]
    
    self.slug = slugify('{} {}'.format(self.title,self.unique_id))
    self.last_updated = timezone.localtime(timezone.now())
    super(StoryDetails, self).save(*args, **kwargs)