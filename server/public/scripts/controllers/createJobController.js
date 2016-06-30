app.controller('CreateJobController', ['$scope', '$http', '$location', 'DataFactory', function ($scope, $http, $location, DataFactory) {

  $scope.user = {};
  $scope.prices = {};

  DataFactory.authenticate().then(function(){
    $scope.user.username = DataFactory.storeUsername();
    $scope.user.userLevel = DataFactory.storeUserLevel();
    if($scope.user.userLevel == 'user'){
      $location.path('/user');
    }
    if($scope.user.username){
      console.log('User Data: ', $scope.user.username);
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
      jobStatus  : "open",
      chat: {
        messages: [],
        date: '',
        time: ''
      }
    };

    $scope.newJob.totalPrice = 0;
    $scope.lakeshoreAndAcreage = {
      value1: false
    };
    $scope.tenThousandSqFt = {
      value1: false
    };


  $scope.ad = [{option: 'Front Only (4 - 6 images) - $200', price: 200},
               {option: 'Front and Back (6 - 10 images) - $300', price: 300}];

  $scope.time = ['Morning', 'Afternoon', 'Evening'];

  $scope.states = ['MN', 'WI'];


console.log($scope.newJob.squareFeet);
// Add up total price
$scope.total = function () {
    if ($scope.newJob.squareFeet != undefined) {
      $scope.newJob.totalPrice = $scope.newJob.squareFeet.price;
    }
    if ($scope.ad.afterDark != undefined) {
      $scope.newJob.totalPrice += $scope.ad.afterDark.price;
    }

    if ($scope.lakeshoreAndAcreage.value1 == true) {
      $scope.newJob.totalPrice += 100;
    }

    if ($scope.tenThousandSqFt.value1 == true) {
      console.log($scope.tenThousandSqFt.value1);
      $scope.newJob.totalPrice = 'Call for price';
    }
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
  $scope.newJob.squareFeet = $scope.newJob.squareFeet.price;
  $scope.newJob.afterDark = $scope.ad.afterDark.option;
  $http.post('/jobs', $scope.newJob).then(function (req, res) {
    $location.path('/jobsList');
  });
};

function getPrices() {
    $http.get('/prices').then(function(response) {
        $scope.prices = response.data[0];

        console.log($scope.prices);
        console.log($scope.sqft);
    });
}
}]);
