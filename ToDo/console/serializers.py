from rest_framework import serializers
from console.models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('pk', 'description', 'scheduledDate', 'scheduled', 'notes')