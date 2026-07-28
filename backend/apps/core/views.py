from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Tag
from .serializers import TagSerializer


class TagListView(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(tags, request)
        serializer = TagSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
