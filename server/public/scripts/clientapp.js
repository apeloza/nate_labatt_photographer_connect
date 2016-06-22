var app = angular.module('app', ['ngRoute', 'ngMaterial']);

// routing
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/map', {
            templateUrl: '/views/map.html',
            controller: 'MapController'
        })
        .when('/user', {
          templateUrl: '/views/user.html',
          controller: 'MapController'
        })
        .when('/myJobs', {
            templateUrl: '/views/myJobs.html',
            controller: 'MyJobsController'
        })
        .when('/createUser', {
            templateUrl: '/views/createUser.html',
            controller: 'CreateUserController'
        })
        .when('/userList', {
            templateUrl: 'views/userList.html',
            controller: 'UserController'
        })
        .when('/jobsList', {
            templateUrl: 'views/jobsList.html',
            controller: 'JobsListController'
        })
        .when('/createJob', {
            templateUrl: 'views/createJob.html',
            controller: 'CreateJobController'
        })
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        });

}]);
