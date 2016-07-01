
app.controller('CreateJobController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {

    $scope.user = {};

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
            getPrices();
        } else {
            $location.path('/');
        }
    });
    $scope.myDate = new Date();
    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());

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
    $scope.newJob.totalPrice = 0;
    $scope.newJob.lakeshoreAndAcreage = {
        value1: false
    };
    $scope.tenThousandSqFt = {
        value1: false
    };




    $scope.time = ['Morning', 'Afternoon', 'Evening'];

    $scope.states = ['MN', 'WI'];



    // Add up total price
    $scope.total = function() {

        if($scope.tenThousandSqFt.value1 === false){
        $scope.newJob.totalPrice = $scope.newJob.squareFeet.value + $scope.newJob.afterDark.value + $scope.addonPrice;
      } else {
        $scope.newJob.totalPrice = "Please call me!";
      }
    };

    $scope.emails = [''];
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

    $scope.addAddons = function(index, addon) {


        if ($scope.confirmed[index] === true) {
            console.log('true');
            $scope.newJob.addons.push(addon);
            $scope.addonPrice += addon.value;
            $scope.total();
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

    $scope.saveNewJob = function() {

        console.log("newJobData: ", $scope.newJob);

        $http.post('/jobs', $scope.newJob).then(function(req, res) {
            $location.path('/jobsList');
        });
    };

    function getPrices() {
        $http.get('/prices').then(function(response) {
            $scope.prices = response.data[0];

            console.log($scope.prices);
        });

    };

  $scope.emails = [''];
  $scope.addEmailField = function () {
    $scope.emails.push('');
  };

  // Push entered emails into emails array
  $scope.addEmail = function () {
    for (var i = 0; i < $scope.emails.length; i++){
      $scope.emails[i] = push($scope.emails[$index]);
    }
    console.log($scope.emails);
  };



  $scope.saveNewJob = function () {

    console.log("newJobData: ", $scope.newJob);
    $scope.newJob.squareFeet = $scope.newJob.squareFeet.sqft;
    $scope.newJob.lakeshoreAndAcreage = $scope.lakeshoreAndAcreage;
    console.log($scope.newJob.lakeshoreAndAcreage);
    $scope.newJob.afterDark = $scope.ad.afterDark.option;
    $http.post('/jobs', $scope.newJob).then(function (req, res) {
      $location.path('/jobsList');
    });
  };

  function getPrices() {
      $http.get('/prices').then(function(response) {
          $scope.prices = response.data;
          console.log($scope.prices);
      });
  }

}]);
