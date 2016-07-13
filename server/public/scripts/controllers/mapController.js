app.controller('MapController', ['$scope', '$http', '$location', '$timeout', 'DataFactory', function($scope, $http, $location, $timeout, DataFactory) {
    $scope.user = {};
    $scope.isUser = false;
    $scope.mapMarkers = [];

    //The DataFactory ensures the user is logged in. If they are not, they are sent back to the landing page.
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

    //This array stores mapmarkers fetched from the server.
    $scope.mapMarkers = [];

    //The DataFactory gets a list of all jobs (which it then filters to open jobs), and then the mapmarkers for the Google Maps API are created.
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
                jobid: $scope.openJobs[i]._id,
                squareFeet: $scope.openJobs[i].squareFeet.name,
                afterDark: $scope.openJobs[i].afterDark.name,
                addons: $scope.openJobs[i].addons,
                latLng: $scope.openJobs[i].latLng
            };
            mapmarker.due = new Date(mapmarker.due);
            mapmarker.due = mapmarker.due.toLocaleDateString("en-US");
            mapmarker.date = new Date(mapmarker.date);
            mapmarker.date = mapmarker.date.toLocaleDateString("en-US");
            if (mapmarker.addons[0] == undefined) {
                mapmarker.addons.push({
                    name: "None"
                });
            }
            if (mapmarker.afterDark == '') {
                mapmarker.afterDark = "None";
            }
            $scope.mapMarkers.push(mapmarker);
        }
        console.log($scope.mapMarkers);
    });

    //The selectedPin Object is initialized. It is used to display information in the modal that appears when a marker is clicked.
    $scope.selectedPin = {
        address: '',
        price: '',
        due: '',
        time: '',
        date: '',
        jobID: '',
        addons: '',
        dark: '',
        feet: '',
        link: ''
    };

    //This function fires when a marker is clicked on. It updates the selected pin and displays the modal.
    $scope.showData = function(event, mapmarker) {
        $scope.pinSelected = true;
        $scope.selectedPin.address = mapmarker.position;
        $scope.selectedPin.price = mapmarker.price;
        $scope.selectedPin.due = mapmarker.due;
        $scope.selectedPin.time = mapmarker.time;
        $scope.selectedPin.date = mapmarker.date;
        $scope.selectedPin.addons = mapmarker.addons;
        $scope.selectedPin.dark = mapmarker.afterDark;
        $scope.selectedPin.feet = mapmarker.squareFeet;
        $scope.selectedPin.jobid = mapmarker.jobid;
        $scope.selectedPin.link = encodeURI(mapmarker.position);
    };
    //This fires when the X is clicked on the modal to hide it.
    $scope.closeModal = function() {
        $scope.pinSelected = false;
    };

    //This function signs out a job to a user.
    $scope.takeJob = function(jobid) {
        var credentials = {
            username: $scope.user.username
        };

        $http.put('/jobs/' + jobid, credentials).then(function(response) {
            if (response == 500) {
                alert("That job has already been taken. Please refresh and try again.");
            } else {
                $location.path('/myJobs');
            }

        });
    };

}]);
