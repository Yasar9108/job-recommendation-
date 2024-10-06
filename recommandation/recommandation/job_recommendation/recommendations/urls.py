from django.urls import path
from .views import UserProfileCreateView, JobPostingListView,home

urlpatterns = [
    path("", home, name="home"),
    path('api/user/', UserProfileCreateView.as_view(), name='user-profile-create'),
    path('api/jobs/', JobPostingListView.as_view(), name='job-posting-list'),
]
