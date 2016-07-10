app.controller('JobsListController', ['$scope', '$http', '$location', '$mdDialog', 'DataFactory', function($scope, $http, $location, $mdDialog, DataFactory) {
    $scope.user = {};
    $scope.jobs = [];
    $scope.sortedJobs = [];
    $scope.status = '';

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
      $http.put('/jobs/update/' + job._id, job).then(function (response) {
        $scope.showAlert = function(ev) {
          console.log('updated');
          $mdDialog.show({
            controller: DialogController,
            contentElement: '#confirmEdit',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          });
        }();
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



$scope.delete = function(id, ev) {
  var confirm = $mdDialog.confirm()
    .title('Are you sure?')
    .ariaLabel('delete job')
    .targetEvent(ev)
    .ok('Yes')
    .cancel('No');
  $mdDialog.show(confirm).then(function() {
    $scope.status = 'deleted.';
    console.log('job deleted');
    $http.delete('/jobs/' + id).then(function(response) {
      if (response === 204) {
        console.log("Job deleted");
      }
      updateJobs();
    });
    }, function() {
      $scope.status = 'not deleted.';
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

  function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

}]);
