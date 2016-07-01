app.controller('JobsListController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
    $scope.user = {};
    $scope.jobs = [];
    $scope.sortedJobs = [];

    DataFactory.authenticate().then(function() {
        $scope.user.username = DataFactory.storeUsername();
        $scope.user.userLevel = DataFactory.storeUserLevel();
        if ($scope.user.userLevel == 'user') {
            $location.path('/user');
        }
        if ($scope.user.username) {
            console.log('User Data: ', $scope.user.username);
            updateJobs();
        } else {
            $location.path('/');
        }
    });

    function updateJobs() {
        DataFactory.getAllJobs().then(function() {

            $scope.jobs = DataFactory.findAllJobs();
            $scope.sortedJobs = DataFactory.findAllJobs();
            if ($scope.jobs === undefined) {
                alert("No Jobs in Database");
            } else {
              console.log($scope.jobs);
            }

        });
    }


    // Change job status to finished
    $scope.finish = function(id) {
        $http.put('/jobs/finish/' + id).then(function(response) {

            updateJobs();

        });
    };

    // Change job status back to open
    $scope.reopen = function(id) {
        $http.put('/jobs/reopen/' + id).then(function(response) {
            if (response === 204) {
                console.log("Job re-opened");
            }
            updateJobs();
        });
    };

    // Delete job
    $scope.delete = function(id) {
        $http.delete('/jobs/' + id).then(function(response) {
            if (response === 204) {
                console.log("Job deleted");
            }
            updateJobs();
        });
    };

  // Sort and search functions
  $scope.sort = function (order = 'all') {
    $scope.sortedJobs = [];

    if (order === 'open') {
      $scope.jobs.forEach(function (i) {
        if (i.jobStatus === 'open'){
        $scope.sortedJobs.push(i);
      }
      });
    } else if (order === 'accepted') {
      $scope.jobs.forEach(function (i) {
        if (i.jobStatus === 'accepted'){
        $scope.sortedJobs.push(i);
      }
      });
    } else if (order === 'finalized') {
      $scope.jobs.forEach(function (i) {
        if (i.jobStatus === 'finalized'){
        $scope.sortedJobs.push(i);
      }
      });
    } else if (order === 'finished') {
      $scope.jobs.forEach(function (i) {
        if (i.jobStatus === 'finished'){
        $scope.sortedJobs.push(i);
      }
      });
    } else if (order === 'all') {
      $scope.sortedJobs = $scope.jobs;
    }
  }


  // $scope.sort = function (order) {
  //   $http.get('/jobs/' + order).then(function(res) {
  //     if (res === 200){
  //     console.log(res.data);
  //   }
  //   });
  // };

  $scope.search = function (searchText) {

  }

}]);
