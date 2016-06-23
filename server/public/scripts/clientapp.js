var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngMap']);

// routing
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider

        .when('/user', {
          templateUrl: '/views/map.html',
          controller: 'MapController'
        })
        .when('/myJobs', {
            templateUrl: '/views/myJobs.html',
            controller: 'MyJobsController'
        })
        .when('/createUser', {
            templateUrl: '/views/createUser.html',
            controller: 'UserController'
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
