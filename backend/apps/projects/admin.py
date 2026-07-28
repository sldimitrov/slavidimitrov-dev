from django.contrib import admin

from .models import Project, ProjectImage, ProjectLink


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


class ProjectLinkInline(admin.TabularInline):
    model = ProjectLink
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title", "description")
    filter_horizontal = ("skills", "tags")
    inlines = [ProjectImageInline, ProjectLinkInline]
