app.controller('MapController', ['$scope', '$http', '$location', '$timeout', 'DataFactory', function($scope, $http, $location, $timeout, DataFactory) {
    $scope.user = {};
    $scope.isUser = false;
    $scope.mapMarkers = [];
    DataFactory.authenticate().then(function() {
        $scope.user.username = DataFactory.storeUsername();
        $scope.user.userLevel = DataFactory.storeUserLevel();
        if ($scope.user.userLevel == 'user') {
            $scope.isUser = true;
        }
        if ($scope.user.username) {
            console.log('User Data: ', $scope.user.username);
        } else {
            $location.path('/');
        }
    });
    $scope.mapMarkers = [];
    DataFactory.getAllJobs().then(function() {
        $scope.openJobs = DataFactory.findOpenJobs();
        console.log($scope.openJobs);
        for (var i = 0; i < $scope.openJobs.length; i++) {
            var mapmarker = {
                position: $scope.openJobs[i].address.line1 + ' ' +
                $scope.openJobs[i].address.city + ' ' + $scope.openJobs[i].address.state + ' ' +
                 $scope.openJobs[i].address.zip,
                price: $scope.openJobs[i].totalPrice,
                due: $scope.openJobs[i].dueDate,
                time: $scope.openJobs[i].timeFrame,
                date: $scope.openJobs[i].preferredDate,
                id: $scope.openJobs[i]._id
            };
            mapmarker.due = new Date(mapmarker.due);
            mapmarker.due = mapmarker.due.toLocaleDateString("en-US");
            mapmarker.date = new Date(mapmarker.date);
            mapmarker.date = mapmarker.date.toLocaleDateString("en-US");
            $scope.mapMarkers.push(mapmarker);
        }
        console.log($scope.mapMarkers);
    });


    $scope.selectedPin = {
        address: '',
        price: '',
        due: '',
        time: '',
        date: '',
        id: ''
    };
    console.log('Map Controller running');
    $scope.showData = function(event, mapmarker) {
      console.log($scope.selectedPin);
        $scope.pinSelected = true;
        $scope.selectedPin.address = mapmarker.position;
        $scope.selectedPin.price = mapmarker.price;
        $scope.selectedPin.due = mapmarker.due;
        $scope.selectedPin.time = mapmarker.time;
        $scope.selectedPin.date = mapmarker.date;
        $scope.selectedPin.id = mapmarker.id;
    };
    $scope.closeModal = function() {
        $scope.pinSelected = false;
    };
    $scope.takeJob = function(jobID) {
      var credentials = {
        username: $scope.user.username
      };
        console.log("Taken!");
        console.log(jobID);
        $http.put('/jobs/' + jobID, credentials).then(function(response) {
            console.log('Updated!');
            console.log(response);
        });
    };

}]);
