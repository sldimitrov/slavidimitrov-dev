from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Tag
from .serializers import ContactMessageSerializer, TagSerializer


class TagListView(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(tags, request)
        serializer = TagSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class ContactMessageCreateView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
