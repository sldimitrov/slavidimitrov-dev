from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Education, Skill, WorkExperience
from .serializers import EducationSerializer, SkillSerializer, WorkExperienceSerializer


class EducationListView(APIView):
    def get(self, request):
        education = Education.objects.all()
        serializer = EducationSerializer(education, many=True)
        return Response(serializer.data)


class WorkExperienceListView(APIView):
    def get(self, request):
        experience = WorkExperience.objects.prefetch_related("achievements").all()
        serializer = WorkExperienceSerializer(experience, many=True)
        return Response(serializer.data)


class SkillListView(APIView):
    def get(self, request):
        skills = Skill.objects.all()
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)
