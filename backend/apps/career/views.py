from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Education, Skill, WorkExperience
from .serializers import EducationSerializer, SkillSerializer, WorkExperienceSerializer


class EducationListView(APIView):
    def get(self, request):
        education = Education.objects.all()
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(education, request)
        serializer = EducationSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class WorkExperienceListView(APIView):
    def get(self, request):
        experience = WorkExperience.objects.prefetch_related("achievements").all()
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(experience, request)
        serializer = WorkExperienceSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class SkillListView(APIView):
    def get(self, request):
        skills = Skill.objects.all()
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(skills, request)
        serializer = SkillSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
