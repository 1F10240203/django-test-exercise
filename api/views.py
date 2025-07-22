from django.shortcuts import render
from rest_framework import viewsets, routers
from todo.models import Task
from .serializers import TaskSerializer

# Create your views here.
class TaskApi(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        return queryset

router = routers.DefaultRouter()
router.register(r"task", TaskApi)