from django.db import models

from ..core.models import SEOMeta, Tag, Timestamped


class Category(Timestamped):
    title = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.title


class Post(Timestamped):
    title = models.CharField(max_length=100)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="posts")
    tags = models.ManyToManyField(Tag, related_name="posts", blank=True)
    seo = models.OneToOneField(SEOMeta, on_delete=models.SET_NULL, null=True, blank=True, related_name="post")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Comment(Timestamped):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.name} on {self.post.title}"
