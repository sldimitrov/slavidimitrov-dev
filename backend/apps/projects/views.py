from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project
from .serializers import ProjectDetailSerializer, ProjectListSerializer


class ProjectListView(APIView):
    def get(self, request):
        projects = Project.objects.select_related("seo").prefetch_related("tags", "skills")

        tag = request.query_params.get("tag")
        if tag:
            projects = projects.filter(tags__slug=tag).distinct()

        featured = request.query_params.get("featured")
        if featured is not None:
            projects = projects.filter(featured=featured.lower() in ("true", "1"))

        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(projects, request)
        serializer = ProjectListSerializer(page, many=True, context={"request": request})
        return paginator.get_paginated_response(serializer.data)


class ProjectDetailView(APIView):
    def get(self, request, slug):
        project = get_object_or_404(
            Project.objects.select_related("seo").prefetch_related("tags", "skills", "images", "links"),
            slug=slug,
        )
        serializer = ProjectDetailSerializer(project, context={"request": request})
        return Response(serializer.data)
