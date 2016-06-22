app.controller('NavController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Nav Controller running');

  $scope.userLevel = {level: ''};

  getUserLevel();
  console.log($scope.userLevel, "After function is called");

  function getUserLevel() {
    $http.get('/user').then(function(response) {
      $scope.userLevel.level = response.data.level;
      console.log($scope.userLevel, "After function is called");
    });
  }


  }]);
