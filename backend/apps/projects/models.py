from django.db import models
from ..core.models import Timestamped


class Project(Timestamped):
    title = models.CharField(max_length=100)
    description = models.TextField()
    skills = models.TextField()

    def __str__(self):
        return self.title


class ProjectImage(Timestamped):
    image = models.ImageField(upload_to='images/')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)


class ProjectLink(Timestamped):
    link = models.CharField(max_length=100)

    def __str__(self):
        return self.link