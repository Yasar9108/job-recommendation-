from django.db import models
# Create your models here.

class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    skills = models.JSONField()  # List of skills
    experience_level = models.CharField(max_length=50)
    desired_roles = models.JSONField()  # List of desired roles
    locations = models.JSONField()  # List of preferred locations
    job_type = models.CharField(max_length=50)  # Full-Time, Part-Time, etc.

class JobPosting(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    skills_required = models.JSONField()  # List of required skills
    experience_required = models.CharField(max_length=50)
    job_type = models.CharField(max_length=50)  # Full-Time, Part-Time, etc.