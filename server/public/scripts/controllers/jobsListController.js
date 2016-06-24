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

  // Change job status to finished
  $scope.finish = function (id) {
    $http.put('/jobs/finish', id).then(function(response) {
      if (response === 200){
        console.log("Job finished");
      }
    });
  }

  // Delete job
  $scope.delete = function (id) {
    $http.post('/jobs/delete', id).then(function(response) {
      if (response === 200){
        console.log("Job deleted");
      }
    });
  }

  console.log('Jobs list Controller running');
  console.log($location.path());
}]);
