from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["id", "title", "date_applied", "company", "status"]

        def save(self, **kwargs):
            # kwargs will include 'user', passed from the view
            job = Job(
                user=kwargs.get('user'),
                title=self.validated_data['title'],
                date_applied=self.validated_data['date_applied'],
                company=self.validated_data['company'],
                status=self.validated_data['status']
            )
            job.save()
            return job



