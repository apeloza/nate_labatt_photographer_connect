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
        .when('/mail', {
          templateUrl: '/views/mail.html',
          controller: "MailController"
        })
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        });

}]);

// Theme palette
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal',{
      'default': 'A700'
    })
    .accentPalette('cyan', {
      'default': 'A700'
    })
    .warnPalette('red', {
      'default': 'A200'
    });

});
