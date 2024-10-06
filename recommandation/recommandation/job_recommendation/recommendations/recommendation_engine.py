# recommendations/recommendation_engine.py
from .models import JobPosting

def recommend_jobs(user_profile):
    recommended_jobs = []
    
    # Retrieve all job postings
    job_postings = JobPosting.objects.all()
    
    for job in job_postings:
        # Check if skills match
        if set(job.skills_required).intersection(set(user_profile.skills)):
            # Check if experience level matches
            if job.experience_level_required == user_profile.experience_level:
                # Check if desired roles match
                if job.title in user_profile.preferences.desired_roles:
                    recommended_jobs.append(job)
    
    return recommended_jobs
