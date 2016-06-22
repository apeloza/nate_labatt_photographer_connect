app.controller('CreateJobController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Create Job Controller running');

  $scope.client = {};
  $scope.client.name;
  $scope.client.email;
  $scope.client.phone;
  $scope.client.address;

  $scope.newJob = {};
  $scope.squareFeet;
  $scope.dueDate;
  $scope.preferredDate;
  $scope.timeFrame;
  $scope.squareFeet;
  $scope.aerial;
  $scope.afterDark;
  $scope.video;
  $scope.driveBy;
  $scope.totalPrice;

  $scope.drive = ['Standard', 'Lakeshore and acreage'];
  $scope.vid = ['Interior Video', 'Lifestyle Video'];
  $scope.ad = ['Front Only (4 - 6 images)', 'Front and Back (6 - 10 images)'];
  $scope.aerialOptions = ['Aerial City | Suburb', 'Aerial Lakeshore | Acreage', 'Aerial Video'];
  $scope.time = ['Morning', 'Afternoon', 'Evening'];
  $scope.sf = ['1,000 sq ft', '1,001-2,000 sq ft', '2,001-3,000 sq ft', '3,001-4,000 sq ft',
                '4,001-5,000 sq ft', '5,001-6,000 sq ft', '6,001-7,000 sq ft', '7,001-8,000 sq ft',
                '8,001-9,000 sq ft', '9,001-10,000 sq ft', '10,000+ sq ft'];




}]);
