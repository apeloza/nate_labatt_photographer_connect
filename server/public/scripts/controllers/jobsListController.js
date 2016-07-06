app.controller('JobsListController', ['$scope', '$http', '$location', '$mdToast', 'DataFactory', function($scope, $http, $location, $mdToast, DataFactory) {
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
            if ($scope.sortedJobs.addons == undefined) {
              $scope.sortedJobs.addons = [];
              $scope.sortedJobs.addons.push({ name: "None"}) ;
            }

            if ($scope.jobs === undefined) {
                alert("No Jobs in Database");
            } else {
              console.log($scope.jobs);
            }

        });
    }

    $scope.editJob = function (job) {
      console.log(job);
      $http.put('/jobs/update/' + job._id, job).then(function (response) {
        var toast = $mdToast.simple()
           .textContent('Job updated')
           .action('Go Away')
           .position('bottom left right')
           .hideDelay(3000)
           .highlightAction(false);
        $mdToast.show(toast).then(function(response) {
           if ( response == 'ok' ) {
              console.log('job updated');
            }
        });
      });
    };

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

    $scope.delete = function(id) {
                    var toast = $mdToast.simple()
                       .textContent('Did you want to delete that job?')
                       .action('UNDO')
                       .position('bottom left right')
                       .hideDelay(5000)
                       .highlightAction(false);
                    $mdToast.show(toast).then(function(response) {
                       if ( response == 'ok' ) {
                          console.log('dont delete');
                       } else {
                         console.log('job deleted');
                         $http.delete('/jobs/' + id).then(function(response) {
                                 if (response === 204) {
                                     console.log("Job deleted");
                                 }
                                 updateJobs();
                             });
                       }
                    });
                 };

  // Sort function
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
  };



  $scope.setActive = function(obj) {
      $scope.activeJob = obj;
      $scope.messages = $scope.activeJob.chat.messages;
  };

}]);
