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
    achievements = AchievementSerializer(many=True, read_only=True)

    class Meta:
        model = WorkExperience
        fields = ["id", "company", "role", "start_date", "end_date", "description", "achievements"]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "title", "description"]
