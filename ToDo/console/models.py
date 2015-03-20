from django.db import models

# Create your models here.
class Task(models.Model):
    description = models.CharField(max_length=100, blank=False)
    scheduledDate = models.DateField(null=True, blank=True)
    scheduled = models.BooleanField(blank=False, default=True)
    notes = models.TextField(null=True, blank=True)
