app.controller('JobsListController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $http.get('/user').then(function(response) {
    if (response.data.level == 'user'){
      $location.path('/user');
    }
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/");
      }
  });

  $http.get('/jobs/alljobs').then(function(response) {
    if(response.data) {
      $scope.job = response.data;
      console.log($scope.job);
    } else {
      alert("No Jobs in Database");
    }
  });
  console.log('Jobs list Controller running');
  console.log($location.path());
}]);
