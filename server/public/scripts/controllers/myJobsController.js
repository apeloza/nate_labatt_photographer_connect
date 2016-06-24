
app.controller('MyJobsController', ['$scope', '$http', '$location', 'DataFactory', function ($scope, $http, $location, DataFactory) {
  console.log('My Jobs Controller running');
  $scope.loggedUser = {};
$scope.userJobs = {};
  DataFactory.authenticate().then(function(){
    $scope.loggedUser.username = DataFactory.storeUsername();
    $scope.loggedUser.userLevel = DataFactory.storeUserLevel();
    if($scope.loggedUser.userLevel == 'admin'){
      $location.path('/user');
    }
    if($scope.loggedUser.username){
      console.log('User Data: ', $scope.loggedUser.username);
    } else {
      $location.path('/');
    }
  });
  DataFactory.getAllJobs().then(function(){
$scope.userJobs = DataFactory.findUserJobs();

  });
}]);
