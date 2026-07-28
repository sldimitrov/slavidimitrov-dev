from django.db import models
from ..core.models import Timestamped


class Category(Timestamped):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Post(Timestamped):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Comment(Timestamped):
    content = models.TextField()
    date = models.DateField(auto_now_add=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return self.content