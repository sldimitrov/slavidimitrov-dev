from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from ..core.models import SEOMeta, Tag, Timestamped


class Category(Timestamped):
    title = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.title


class Post(Timestamped):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField(blank=True, default="")
    content = models.TextField()
    cover_image = models.ImageField(upload_to="blog/covers/", blank=True, null=True)
    published_at = models.DateTimeField(default=timezone.now)
    reading_time = models.PositiveIntegerField(default=1, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="posts")
    tags = models.ManyToManyField(Tag, related_name="posts", blank=True)
    seo = models.OneToOneField(SEOMeta, on_delete=models.SET_NULL, null=True, blank=True, related_name="post")

    class Meta:
        ordering = ["-published_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        word_count = len(self.content.split())
        self.reading_time = max(1, round(word_count / 200))
        super().save(*args, **kwargs)


class Comment(Timestamped):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.name} on {self.post.title}"
