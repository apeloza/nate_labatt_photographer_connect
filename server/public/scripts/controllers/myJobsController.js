
app.controller('MyJobsController', ['$scope', '$http', '$location', 'DataFactory', function ($scope, $http, $location, DataFactory) {
  console.log('My Jobs Controller running');
  $http.get('/user').then(function(response) {
    if(response.data.level == 'admin'){
      $location.path('/user');
    }
      if (response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/");
      }
  });
}]);
