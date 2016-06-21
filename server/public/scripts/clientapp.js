var app = angular.module('app', ['ngRoute', 'ngMaterial']);

// routing
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/map', {
      templateUrl: '/views/login.html',
      controller : 'MapController'
    })
    .when('/myJobs', {
      templateUrl: '/views/myJobs.html',
      controller : 'MyJobsController'
    })
    .when('/createUser', {
      templateUrl: '/views/creatUser.html',
      controller : 'CreateUserController'
    })
    .when('/userList', {
      templateUrl: 'views/userList.html',
      controller : 'UserListController'
    })
    .when('/jobsList', {
      templateUrl: 'views/jobsList.html',
      controller : 'JobsListController'
    })
    .when('/createJob', {
      templateUrl: 'views/createJob.html',
      controller : 'CreateJobController'
    })
}]);
