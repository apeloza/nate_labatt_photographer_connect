app.controller('CreateJobController', ['$scope', '$http', '$location', 'DataFactory', function ($scope, $http, $location, DataFactory) {
  console.log('Create Job Controller running');
  $scope.user = {};

  DataFactory.authenticate().then(function(){
    $scope.user.username = DataFactory.storeUsername();
    $scope.user.userLevel = DataFactory.storeUserLevel();
    if($scope.user.userLevel == 'user'){
      $location.path('/user');
    }
    if($scope.user.username){
      console.log('User Data: ', $scope.username);
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

  $scope.sf = [{sqft: '1,000 sq ft - $175', price: 175},
               {sqft: '1,001-2,000 sq ft - $200', price: 200},
               {sqft: '2,001-3,000 sq ft - $235', price: 235},
               {sqft: '3,001-4,000 sq ft - $260', price: 260},
               {sqft: '4,001-5,000 sq ft - $300', price: 300},
               {sqft: '5,001-6,000 sq ft - $350', price: 350},
               {sqft: '6,001-7,000 sq ft - $400', price: 400},
               {sqft: '7,001-8,000 sq ft - $450', price: 450},
               {sqft: '8,001-9,000 sq ft - $500', price: 500},
               {sqft: '9,001-10,000 sq ft - $550', price: 550}];

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
}

}]);
