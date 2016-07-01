app.controller('NavController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.userLevel = {level: ''};

  getUserLevel();

  function getUserLevel() {
    $http.get('/user').then(function(response) {
      $scope.userLevel.level = response.data.level;
    });
  }

  $scope.logOut = function() {
$http.get('/user/logout').then(function(response) {
  console.log('logged out');
  $location.path("/");
});
};

  }]);
