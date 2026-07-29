from django.contrib import admin

from .models import Category, Comment, Post


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0
    readonly_fields = ("name", "email", "content", "created_at")
    can_delete = True


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "published_at", "reading_time")
    list_filter = ("category", "tags")
    search_fields = ("title", "content", "excerpt")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags",)
    readonly_fields = ("reading_time",)
    inlines = [CommentInline]


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "post", "created_at")
    list_filter = ("post",)
    search_fields = ("name", "email", "content")
