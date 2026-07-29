from rest_framework import serializers

from .models import Achievement, Education, Skill, WorkExperience


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ["id", "title", "description"]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["id", "institution", "degree", "field_of_study", "start_date", "end_date", "description"]


class WorkExperienceSerializer(serializers.ModelSerializer):
    achievements = serializers.SerializerMethodField()

    class Meta:
        model = WorkExperience
        fields = ["id", "company", "role", "start_date", "end_date", "description", "achievements"]

    def get_achievements(self, obj):
        return [achievement.title for achievement in obj.achievements.all()]


class SkillSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="title")

    class Meta:
        model = Skill
        fields = ["id", "name", "category", "proficiency"]
