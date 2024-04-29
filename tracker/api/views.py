from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import Job
from .serializers import JobSerializer


# Create your views here.
class JobsView(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        jobs = Job.objects.filter(user=user).order_by("-date_applied")
        serialized_jobs = JobSerializer(jobs, many=True)
        return Response(serialized_jobs.data, status=status.HTTP_200_OK)

    def post(self, request, username):
        serializer = JobSerializer(data=request.data)
        user = get_object_or_404(User, username=username)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



