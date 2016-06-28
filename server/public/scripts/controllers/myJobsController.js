app.controller('MyJobsController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
    console.log('My Jobs Controller running');
    $scope.loggedUser = {};
    $scope.userJobs = {};
    $scope.timeFrame = {};
    DataFactory.authenticate().then(function() {
        $scope.loggedUser.username = DataFactory.storeUsername();
        $scope.loggedUser.userLevel = DataFactory.storeUserLevel();
        if ($scope.loggedUser.userLevel == 'admin') {
            $location.path('/user');
        }
        if ($scope.loggedUser.username) {
            console.log('User Data: ', $scope.loggedUser.username);
        } else {
            $location.path('/');
        }
    });
    DataFactory.getAllJobs().then(function() {
        $scope.userJobs = DataFactory.findUserJobs();

    });
    $scope.preferredTime = ['6:00 AM',
        '6:30 AM',
        '7:00 AM',
        '7:30 AM',
        '8:00 AM',
        '8:30 AM',
        '9:00 AM',
        '9:30 AM',
        '10:00 AM',
        '10:30 AM',
        '11:00 AM',
        '11:30 AM',
        '12:00 PM',
        '12:30 PM',
        '1:00 PM',
        '1:30 PM',
        '2:00 PM',
        '2:30 PM',
        '3:00 PM',
        '3:30 PM',
        '4:00 PM',
        '4:30 PM',
        '5:00 PM',
        '5:30 PM',
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
        '7:30 PM',
        '8:00 PM',
        '8:30 PM',
        '9:00 PM'
    ];
    $scope.submitDate = function() {
        console.log($scope.timeFrame.time);
        console.log($scope.timeFrame.date);
    };
}]);
