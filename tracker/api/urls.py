from django.urls import path

from .views import JobsView

urlpatterns = [path('<username>/jobs', JobsView.as_view(), name='jobs-view'),
               ]