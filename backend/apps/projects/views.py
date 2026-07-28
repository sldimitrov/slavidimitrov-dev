from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project
from .serializers import ProjectDetailSerializer, ProjectListSerializer


class ProjectListView(APIView):
    def get(self, request):
        projects = Project.objects.select_related("seo").prefetch_related("tags", "skills")
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(projects, request)
        serializer = ProjectListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class ProjectDetailView(APIView):
    def get(self, request, pk):
        project = get_object_or_404(
            Project.objects.select_related("seo").prefetch_related("tags", "skills", "images", "links"),
            pk=pk,
        )
        serializer = ProjectDetailSerializer(project)
        return Response(serializer.data)
