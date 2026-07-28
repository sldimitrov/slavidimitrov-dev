from rest_framework import serializers

from .models import SEOMeta, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "title", "slug"]


class SEOMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEOMeta
        fields = ["id", "title", "description"]
