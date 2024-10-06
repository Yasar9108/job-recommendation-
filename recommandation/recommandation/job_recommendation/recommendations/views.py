from django.shortcuts import render
from rest_framework import generics
from .models import UserProfile, JobPosting
from .serializers import UserProfileSerializer, JobPostingSerializer

def home(request):
     return render(request,'index.html')
# if You want to add any front end Then You Can add here
class UserProfileCreateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class JobPostingListView(generics.ListAPIView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer
