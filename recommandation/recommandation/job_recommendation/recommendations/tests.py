from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from .models import UserProfile, JobPosting

class APITest(TestCase):
    def setUp(self):
        # Initialize the API client
        self.client = APIClient()

        # Create a test user profile
        self.user_profile = UserProfile.objects.create(
            name="Jane Doe",
            skills=["Python", "Django", "REST APIs"],
            experience_level="Intermediate",
            desired_roles=["Backend Developer", "Software Engineer"],
            locations=["Remote", "New York"],
            job_type="Full-Time"
        )

        # Create a test job posting
        self.job_posting = JobPosting.objects.create(
            title="Backend Developer",
            skills_required=["Python", "Django"],
            experience_required="Intermediate",
            location="Remote",
            job_type="Full-Time",
            description="Looking for a Backend Developer with experience in Python and Django."
        )

    def test_create_user_profile(self):
        url = reverse('create_user_profile')  # Ensure this matches your URL configuration
        data = {
            "name": "Jane Doe",
            "skills": ["Python", "Django", "REST APIs"],
            "experience_level": "Intermediate",
            "desired_roles": ["Backend Developer", "Software Engineer"],
            "locations": ["Remote", "New York"],
            "job_type": "Full-Time"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(UserProfile.objects.count(), 2)  # Check if the profile was created

    def test_recommend_jobs(self):
        url = reverse('recommend_jobs') + f'?user_id={self.user_profile.id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIn(self.job_posting.title, [job['title'] for job in response.data])  # Check if the job is in the recommendations

    def test_recommend_jobs_user_not_found(self):
        url = reverse('recommend_jobs') + '?user_id=999'  # A non-existing user ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)  # Expecting a 404 for a non-existing user

    def test_create_user_profile_invalid_data(self):
        url = reverse('create_user_profile')
        data = {
            "name": "",  
            "skills": ["Python", "Django"],
            "experience_level": "Intermediate",
            "desired_roles": ["Backend Developer"],
            "locations": ["Remote"],
            "job_type": "Full-Time"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)  # Expecting a bad request for invalid data
