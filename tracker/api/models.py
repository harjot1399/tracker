from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db.models.fields.related import ManyToManyField
from django.contrib.auth.models import User


# Create your models here.
class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    date_applied = models.DateField()
    company = models.CharField(max_length=255)
    status = models.CharField(max_length=100)

