from django.urls import path
from .views import RegisterView, RetrieveUserView
from . import views


urlpatterns = [
  path('register', RegisterView.as_view()),
  path('me', RetrieveUserView.as_view()),
]