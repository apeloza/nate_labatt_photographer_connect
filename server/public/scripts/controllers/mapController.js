app.controller('MapController', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/");
      }
  });
  console.log('Map Controller running');
  $scope.showData = function(){
console.log("Yep");
  };

}]);
