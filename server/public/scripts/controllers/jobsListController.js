app.controller('JobsListController', ['$scope', '$http', '$location', 'DataFactory', function ($scope, $http, $location, DataFactory) {
  $scope.user = {};

  DataFactory.authenticate().then(function(){
    $scope.user.username = DataFactory.storeUsername();
    $scope.user.userLevel = DataFactory.storeUserLevel();
    if($scope.user.userLevel == 'user'){
      $location.path('/user');
    }
    if($scope.user.username){
      console.log('User Data: ', $scope.username);
    } else {
      $location.path('/');
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
