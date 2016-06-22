app.controller('NavController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Nav Controller running');

  $scope.userLevel = '';

  getUserLevel();
  console.log($scope.userLevel);
  
  function getUserLevel() {
    $http.get('/user').then(function(response) {
      $scope.userLevel = response.data.level;
    });
  };




  }]);
