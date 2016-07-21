app.controller('CreateJobController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {

    $scope.user = {};
    var geocoder;

//The DataFactory checks to see if the user is logged in and an admin. If they aren't, they are redirected.
    DataFactory.authenticate().then(function() {
        $scope.user.username = DataFactory.storeUsername();
        $scope.user.userLevel = DataFactory.storeUserLevel();
        if ($scope.user.userLevel == 'user') {
            $location.path('/user');
        }
        if ($scope.user.username) {
            console.log('User Data: ', $scope.user.username);
            $scope.prices = {};
            $scope.chosenAddons = [];
            $scope.confirmed = [];
            $scope.addonPrice = 0;
            geocoder = new google.maps.Geocoder();
            getPrices();
        } else {
            $location.path('/');
        }
    });
    //The min date is set as the current date. That way a job cannot be created for a day that has already passed.
    $scope.myDate = new Date();
    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());

//The newJob Object is initialized. This will ultimately be sent to the server when a job is posted.
    $scope.newJob = {
        jobStatus: "open",
        chat: {
            messages: [],
            date: '',
            time: ''
        },
        squareFeet: {
            name: '',
            value: 0
        },
        afterDark: {
            name: '',
            value: 0
        }
    };
    $scope.newJob.addons = [];
    $scope.newJob.emails = [];
    $scope.newJob.latLng = {};
    $scope.newJob.photoURL = '';
    $scope.newJob.totalPrice = 0;

//These times and states are used in dropdowns on the page.
    $scope.time = ['Morning', 'Afternoon', 'Evening'];

    $scope.states = ['MN', 'WI'];



    // Add up total price
    $scope.total = function() {


        $scope.newJob.totalPrice = $scope.newJob.squareFeet.value + $scope.newJob.afterDark.value + $scope.addonPrice;

    };

    $scope.emails = [''];

    //This allows users to add additional e-mails, if they wish.
    $scope.addEmailField = function() {
        $scope.emails.push('');
    };

    // Push entered emails into emails array
    $scope.addEmail = function() {
        for (var i = 0; i < $scope.emails.length; i++) {
            $scope.emails[i] = push($scope.emails[$index]);
        }
        console.log($scope.emails);
    };

//This function adds together the aggregate value of all addons, to be used by the $scope.total function.
    $scope.addAddons = function(index, addon) {


        if ($scope.confirmed[index] === true) {
            console.log('true');
            $scope.newJob.addons.push(addon);
            $scope.addonPrice += addon.value;
            $scope.total();
            console.log($scope.newJob.addons);
            console.log($scope.addonPrice);
            console.log($scope.newJob.addons);
        } else {
            console.log('false');
            for (var i = 0; i < $scope.newJob.addons.length; i++) {
                if (addon.name == $scope.newJob.addons[i].name) {
                    index = i;
                    $scope.addonPrice -= addon.value;
                    $scope.newJob.addons.splice(index, 1);
                    $scope.total();
                }
            }
        }
    };

//This function posts a new job to the server. The address provided is geocoded at this time and the resulting coordinates are stored on the job object.
    $scope.saveNewJob = function() {
geocoder.geocode({
  'address': $scope.newJob.address.line1 + ' ' +
      $scope.newJob.address.city + ' ' + $scope.newJob.address.state + ' ' +
      $scope.newJob.address.zip
}, function(results, status){
  if (status == google.maps.GeocoderStatus.OK) {

      $scope.newJob.latLng = results[0].geometry.location;
      $http.post('/jobs', $scope.newJob).then(function(req, res) {
          $http.post('/mail/newjob', $scope.newJob).then(function(response) {

              $location.path('/jobsList');
        
          });

      });
    }
});


    };

//This function gets relevant pricing from the server.
    function getPrices() {
        $http.get('/prices').then(function(response) {
            $scope.prices = response.data;
            console.log($scope.prices);
        });
    }

}]);
