app.controller('JobsListController', ['$scope', '$http', '$location', 'DataFactory', function ($scope, $http, $location, DataFactory) {
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
