var todoApp = angular.module('todoApp', ['ui.bootstrap', 'ngRoute', 'ngAnimate']);

todoApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home',{
            templateUrl: 'static/templates/hometemplate.html'
        }).
        when('/details/:taskId',{
            templateUrl: 'static/templates/task_details.html',
            controller: function($routeParams, $scope, taskService){
                taskService.getTask($routeParams.taskId)
                    .then(function(data){
                        $scope.task = data;
                });

            }
        }).
        when('/quick',{
            templateUrl: 'static/templates/quickschedule.html',
            controller: 'todoCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);

todoApp.filter('dueDate', function(){
    return function(date, todaysDate){
        return date < todaysDate ? 'This task is overdue' : date;
    }
});

todoApp.filter('taskSet', function(){
    var todaysDate = new Date().toISOString().split('T')[0];
    return function(tasks, category){
        if(typeof tasks !='undefined') {
            switch (category) {
                case 'Today':
                    return tasks.filter(function (task) {
                        return task.scheduledDate == todaysDate;
                    });
                    break;
                case 'Future':
                    return tasks.filter(function (task) {
                        return task.scheduledDate > todaysDate;
                    });
                    break;
                case 'Someday':
                    return tasks.filter(function (task) {
                        return task.scheduled == false;
                    });
                    break;
                case 'Overdue':
                    return tasks.filter(function (task) {
                        return task.scheduledDate < todaysDate;
                    });
                case 'quick':
                    return tasks.filter(function (task) {
                       return task.scheduledDate == todaysDate || task.scheduledDate < todaysDate || task.scheduled == false;
                    });
                default:
            }
        }
    }
});

todoApp.controller('todoCtrl', ['$scope', '$log', '$modal', 'taskService', function ($scope, $log, $modal, taskService){
    $scope.current = 0;
    var todaysDate = new Date().toISOString().split('T')[0];
    $scope.todaysDate = todaysDate;
    $scope.taskIndex = 0;

    updateTasks = function(){
        taskService.getTasks()
        .then(function(data){
            $scope.tasks = data ;
            $scope.sortTasks($scope.tasks);
       });
    };


    $scope.sortTasks = function(taskList){
        var tasks=taskList.sort(function(a, b){
                if (b.pk>a.pk){
                    return 1;
                }
            });
            $scope.allTasks = tasks;
            $scope.quickTasks = tasks.filter(function (task) {
                       return task.scheduledDate == todaysDate || task.scheduledDate < todaysDate || task.scheduled == false;
            });
    };

    $scope.createTask = function(){
        $scope.todaysTasks.unshift({description: $scope.newTask, scheduledDate: todaysDate});
        taskService.addTasks($scope.newTask, todaysDate).then(function(){
            updateTasks();
        });
        $scope.newTask="";
    };

    $scope.schedule = function(task, days){
        if(days<0){
            task.scheduled = false;
        }else{
            var today = new Date();
            today.setDate(today.getDate()+days);
            task.scheduledDate=today.toISOString().split('T')[0];
            task.scheduled = true;
        }
        taskService.updateTask(task);
        $scope.taskIndex++;
    };


    updateTasks();
}]);

todoApp.factory('taskService', function ($http, $log, $q){

    return {
        getTasks: function(){
            return $http.get('/api/tasks/')
                .then(function(response){
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }
                }, function(response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getTask: function(taskId){
            return $http.get('/api/task/'+taskId)
                .then(function(response){
                    if(typeof response.data === 'object') {
                        console.log(response.data);
                        return response.data;
                    }
                });
        },
        addTasks: function(taskDesc, todaysDate){
            data = {description: taskDesc, scheduledDate: todaysDate};
            return $http.post('/api/tasks/', data)
                .then(function(response){
                   console.log(response);
                });
        },
        updateTask: function(task){
            return $http.put('/api/task/'+task.pk+'/', {'description':task.description,'scheduledDate':task.scheduledDate,'scheduled':task.scheduled,'notes':task.notes})
                .error(function(response){
                    console.log(response);
                });
        }
    }
});

todoApp.directive('taskList', function(){
    return{
        scope: {
            collapsed: "=",
            tasks: "=",
            title: "@"
        },
        transclude: true,
        restrict: "E",
        templateUrl: "static/templates/tasks_section.html",
        controller: 'taskListCtrl'
    }
});

todoApp.controller('taskListCtrl', ['$scope', '$modal', 'taskService', function($scope, $modal, taskService){
    $scope.updateTaskDesc = function(task) {
        taskService.updateTask(task);
    };
    $scope.openDateSlider = function(task){
        var modalInstance = $modal.open({
            templateUrl: 'static/templates/dateslider.html',
            controller: function($scope){
                $scope.todaysDate = new Date();
                $scope.datePick = task["scheduledDate"];
                $scope.cancelModal = function(){
                    modalInstance.dismiss();
                };
                $scope.applyDate = function(){
                    task.scheduledDate=$scope.datePick.toISOString().split('T')[0];
                    task.scheduled = true;
                    taskService.updateTask(task);
                    modalInstance.dismiss();
                }
            }
        })
    }
}]);

todoApp.factory('dateService',function($modal){
    return {
        todaysDate: new Date().toISOString().split('T')[0],
        promptDateSlider: function(task){
            var modalInstance = $modal.open({
                templateUrl: 'static/tempaltes/dateslider.html',
                controller: function($scope){
                    $scope.datePick = task["scheduledDate"];
                    $scope.cancelModal = function(){
                        modalInstance.dismiss();
                    };
                    $scope.applyDate = function(){
                        task.scheduled=true;
                        task["scheduledDate"]=$scope.datePick.toISOString().split('T')[0];
                        console.log(task);
                        taskService.updateTask(task);
                        modalInstance.dismiss();
                    }
                }
            })
        }
    };
});