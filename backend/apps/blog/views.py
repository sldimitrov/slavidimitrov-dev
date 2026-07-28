from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Post
from .serializers import CategorySerializer, PostDetailSerializer, PostListSerializer


class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(categories, request)
        serializer = CategorySerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class PostListView(APIView):
    def get(self, request):
        posts = Post.objects.select_related("category", "seo").prefetch_related("tags")
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(posts, request)
        serializer = PostListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class PostDetailView(APIView):
    def get(self, request, pk):
        post = get_object_or_404(
            Post.objects.select_related("category", "seo").prefetch_related("tags", "comments"),
            pk=pk,
        )
        serializer = PostDetailSerializer(post)
        return Response(serializer.data)
