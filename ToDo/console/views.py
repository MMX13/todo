from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from console.models import Task
from datetime import datetime, date, timedelta
from rest_framework import generics
from console.serializers import TaskSerializer

# Create your views here.
def taskview(request):

    messages = []

    if request.method == 'POST':
        task = Task(description=request.POST['description'], scheduledDate = date.today())
        task.save()
        messages.append({'message': "Task added", 'status': "success"})

    tomorrowDate = date.today()+timedelta(days=1)
    todaysTasks = Task.objects.filter(scheduledDate=date.today())
    tomorrowsTasks = Task.objects.filter(scheduledDate=tomorrowDate)
    sometimeTasks = Task.objects.filter(scheduledDate__gt=tomorrowDate)

    context = {'todaysTasks': todaysTasks,
               'tomorrowsTasks': tomorrowsTasks,
               'sometimeTasks': sometimeTasks,
               'messages': messages}
    return render(request, 'ng-base.html', context)

def detailsview(request, task_id):
    task = Task.objects.get(pk=task_id)
    context = {'task':task}
    return render(request, 'task_details.html', context)


class ApiTaskView(generics.ListCreateAPIView):
    model = Task
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class TaskRetrieve(generics.RetrieveAPIView):
    model = Task
    serializer_class = TaskSerializer

class TaskApi(generics.RetrieveUpdateAPIView):
    model = Task
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
