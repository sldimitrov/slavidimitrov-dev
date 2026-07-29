from rest_framework import serializers

from .models import ContactMessage, SEOMeta, Tag


class TagSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="title")

    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]


class SEOMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEOMeta
        fields = ["id", "title", "description"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
