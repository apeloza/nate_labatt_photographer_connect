app.controller('CreateJobController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Create Job Controller running');

  $scope.name = '';
  $scope.email = '';
  $scope.phone = '';
  $scope.address = '';
  $scope.squareFeet = '';
  $scope.dueDate = 0;
  $scope.preferredDate = 0;
  $scope.timeFrame = '';
  $scope.afterDark = '';
  $scope.totalPrice = 0;
  $scope.tenThousandSqFt = false;
  $scope.lakeAndAcreage = false;
  $scope.notes = '';
  $scope.entryMethod = '';
  $scope.zip = '';

  $scope.totalPrice = $scope.squareFeet + $scope.afterDark;

  $scope.ad = [{option: 'Front Only (4 - 6 images) - $200', price: 200},
               {option: 'Front and Back (6 - 10 images) - $300', price: 300}];

  $scope.time = ['Morning', 'Afternoon', 'Evening'];

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

  $scope.emails = ["", "", "", ""];

// Add up total price
$scope.total = function () {

  $scope.totalPrice = $scope.squareFeet.price
  if ($scope.afterDark.price != undefined) {
    $scope.totalPrice += $scope.afterDark.price;
  }

  if ($scope.lakeAndAcreage == true) {
    $scope.totalPrice += 100;
  }

  if ($scope.tenThousandSqFt == true) {
    $scope.totalPrice = 'Call for price';
  }

// Push entered emails into emails array
$scope.addEmail = function () {
  for (var i = 0; i < $scope.emails.length; i++){
    $scope.emails[i] = emails[$index];
  }
}

};

$scope.saveNewJob = function () {
  var newJob = {
    name      : $scope.name,
    emails    : $scope.emails,
    phone     : $scope.phone,
    address   : $scope.address,
    zipCode   : $scope.zip,
    dueDate   : $scope.dueDate,
    timeFrame : $scope.timeFrame,
    squareFeet: $scope.squareFeet.sqft,
    afterDark : $scope.afterDark.option,
    totalPrice: $scope.totalPrice,
    preferredDate: $scope.preferredDate,
    notes      : $scope.notes,
    entryMethod: $scope.entryMethod
  };
  console.log("newJobData: ", newJob);

  $http.post('/jobs', newJob).then(function (req, res) {

    $location.path('/jobsList');
  });
}

}]);
