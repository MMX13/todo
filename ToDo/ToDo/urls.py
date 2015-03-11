from django.conf.urls import patterns, include, url
from django.contrib import admin
from console import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ToDo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', 'console.views.taskview'),
    url(r'^details/(?P<task_id>\d+)', 'console.views.detailsview'),
    url(r'^api/tasks/', views.ApiTaskView.as_view(), name='task_list'),
    url(r'^api/task/(?P<pk>\d+)', views.TaskApi.as_view(), name='task_api'),
)
