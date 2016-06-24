
app.controller('MyJobsController', ['$scope', '$http', '$location', 'DataFactory', function ($scope, $http, $location, DataFactory) {
  console.log('My Jobs Controller running');
  $scope.user = {};

  DataFactory.authenticate().then(function(){
    $scope.user.username = DataFactory.storeUsername();
    $scope.user.userLevel = DataFactory.storeUserLevel();
    if($scope.user.userLevel == 'admin'){
      $location.path('/user');
    }
    if($scope.user.username){
      console.log('User Data: ', $scope.username);
    } else {
      $location.path('/');
    }
  });
}]);
