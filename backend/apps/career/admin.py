from django.contrib import admin

from .models import Achievement, Education, Skill, WorkExperience


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "field_of_study", "start_date", "end_date")
    list_filter = ("institution",)
    search_fields = ("institution", "degree", "field_of_study")
    ordering = ("-start_date",)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "start_date", "end_date")
    list_filter = ("company",)
    search_fields = ("company", "role")
    filter_horizontal = ("achievements",)
    ordering = ("-start_date",)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)
