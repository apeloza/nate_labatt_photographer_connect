app.controller('JobsListController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
    $scope.user = {};
    $scope.jobs = [];

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
            console.log($scope.jobs);
            if ($scope.jobs === undefined) {
                alert("No Jobs in Database");
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

    console.log('Jobs list Controller running');
    console.log($location.path());
}]);
