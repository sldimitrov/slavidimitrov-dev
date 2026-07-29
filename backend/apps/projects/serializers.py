from rest_framework import serializers

from ..career.serializers import SkillSerializer
from ..core.serializers import SEOMetaSerializer, TagSerializer
from .models import Project, ProjectImage, ProjectLink


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ["id", "image", "alt_text"]


class ProjectLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectLink
        fields = ["id", "link"]


class ProjectListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "cover_image",
            "tags",
            "featured",
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    seo = SEOMetaSerializer(read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    links = ProjectLinkSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "content",
            "cover_image",
            "repo_url",
            "live_url",
            "featured",
            "skills",
            "tags",
            "seo",
            "images",
            "links",
            "created_at",
            "updated_at",
        ]
