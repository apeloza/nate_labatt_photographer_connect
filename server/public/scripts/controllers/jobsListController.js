app.controller('JobsListController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/");
      }
  });
  console.log('Jobs list Controller running');
  console.log($location.path());
}]);
