from django.db import models
from ..core.models import Timestamped


class Education(Timestamped):
    institution = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Achievement(Timestamped):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class WorkExperience(Timestamped):
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.CharField(max_length=100)
    achievements = models.ManyToManyField(Achievement)

    def __str__(self):
        return self.title

class Skill(Timestamped):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    def __str__(self):
        return self.title