from django.contrib import admin

from .models import SEOMeta, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title",)


@admin.register(SEOMeta)
class SEOMetaAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)
