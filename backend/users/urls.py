from django.urls import path
from .views import RegisterView, RetrieveUserView
from . import views


urlpatterns = [
  path('register', RegisterView.as_view()),
  path('me', RetrieveUserView.as_view()),
  path('user-data',views.UserData),
  path('Block',views.Block),
  path('update',views.Update),
  path('delete',views.Delete),
  path('search',views.Search),
  path('blog-ideas-generator',views.BlogTopicIdeas),
  path('blog-generator',views.BlogTopic),
  path('story-generator',views.Story),
  path('save-blog',views.BlogIdeasSave),
  path('generate-blog-sections',views.generateBlogsSect),
]