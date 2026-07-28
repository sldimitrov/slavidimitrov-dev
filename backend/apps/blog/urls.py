from django.urls import path

from . import views

app_name = "blog"

urlpatterns = [
    path("categories/", views.CategoryListView.as_view(), name="category-list"),
    path("posts/", views.PostListView.as_view(), name="post-list"),
    path("posts/<int:pk>/", views.PostDetailView.as_view(), name="post-detail"),
]
