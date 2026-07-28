from django.urls import path

from . import views

app_name = "core"

urlpatterns = [
    path("tags/", views.TagListView.as_view(), name="tag-list"),
]
