from django.urls import path

from . import views

app_name = "career"

urlpatterns = [
    path("education/", views.EducationListView.as_view(), name="education-list"),
    path("experience/", views.WorkExperienceListView.as_view(), name="work-experience-list"),
    path("skills/", views.SkillListView.as_view(), name="skill-list"),
]
