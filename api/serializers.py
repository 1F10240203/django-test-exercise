from rest_framework import serializers
from todo.models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("title", "completed", "posted_at", "due_at")