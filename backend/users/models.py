from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator
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

  objects = UserAccountManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name','phone_number']

  def __str__(self):
    return self.email