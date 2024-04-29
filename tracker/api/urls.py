from django.urls import path

from .views import JobsView, JobView

urlpatterns = [path('<username>/jobs', JobsView.as_view(), name='jobs-view'),
               path('<username>/jobs/<job_id>', JobView.as_view(), name='job-view')
               ]