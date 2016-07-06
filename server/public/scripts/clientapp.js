
var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngMap', 'jkAngularCarousel', 'ngMessages', 'ngAnimate']);

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
            templateUrl: 'views/landingPage.html',
            controller: 'LandingController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'LoginController'
        })
        .when('/mail', {
          templateUrl: '/views/mail.html',
          controller: "MailController"
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginController'
        })
        .when('/updatePrices', {
          templateUrl: 'views/updatePrices.html',
          controller: 'UpdatePrices'
        });
}]);

// Theme palette
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey',{
      'default': '300'
    })
    .accentPalette('grey', {
      'default': '400'
    })
    .warnPalette('red', {
      'default': '200'
    });
});

// FAB
app.controller('FabCtrl', ['$scope', '$location', function ($scope, $location) {
  this.topDirections = ['left', 'up'];
  this.bottomDirections = ['down', 'right'];
  this.isOpen = false;
  this.availableModes = ['md-fling', 'md-scale'];
  this.selectedMode = 'md-scale';
  this.availableDirections = ['up', 'down', 'left', 'right'];
  this.selectedDirection = 'right';

  $scope.jobsList = function () {
    $location.path('/jobsList');
  }

  $scope.createJob = function () {
    $location.path('/createJob');
  }

  $scope.userList = function () {
    $location.path('/userList');
  }

  $scope.createUser = function () {
    $location.path('/createUser');
  }

  $scope.updatePrices = function () {
    $location.path('/updatePrices');
  }
}]);
