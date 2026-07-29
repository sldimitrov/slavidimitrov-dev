from django.db import models
from django.utils.text import slugify

from ..career.models import Skill
from ..core.models import SEOMeta, Tag, Timestamped


class Project(Timestamped):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True, default="")
    description = models.TextField()
    content = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="projects/covers/", blank=True, null=True)
    repo_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    skills = models.ManyToManyField(Skill, related_name="projects", blank=True)
    tags = models.ManyToManyField(Tag, related_name="projects", blank=True)
    seo = models.OneToOneField(SEOMeta, on_delete=models.SET_NULL, null=True, blank=True, related_name="project")

    class Meta:
        ordering = ["-featured", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class ProjectImage(Timestamped):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="images/")
    alt_text = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Image for {self.project.title}"


class ProjectLink(Timestamped):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="links")
    link = models.URLField()

    def __str__(self):
        return self.link
