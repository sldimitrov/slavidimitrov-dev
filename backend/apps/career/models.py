from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from ..core.models import Timestamped


class Education(Timestamped):
    institution = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Achievement(Timestamped):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


class WorkExperience(Timestamped):
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()
    achievements = models.ManyToManyField(Achievement, related_name="work_experiences", blank=True)

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return f"{self.role} at {self.company}"


class Skill(Timestamped):
    class Category(models.TextChoices):
        LANGUAGE = "language", "Language"
        FRAMEWORK = "framework", "Framework"
        TOOL = "tool",
        DATABASE = "database",
        AUTOMATION = "automation",
        INFRASTRUCTURE = "infrastructure"

    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(
        max_length=20, choices=Category.choices, default=Category.LANGUAGE
    )
    proficiency = models.PositiveSmallIntegerField(
        default=50,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    class Meta:
        ordering = ["-proficiency"]

    def __str__(self):
        return self.title
