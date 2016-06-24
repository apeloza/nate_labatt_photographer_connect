app.controller('MapController', ['$scope', '$http', '$location', '$timeout', 'DataFactory', function($scope, $http, $location, $timeout, DataFactory) {
$scope.user = {};
$scope.isUser = false;
    DataFactory.authenticate().then(function(){
      $scope.user.username = DataFactory.storeUsername();
      $scope.user.userLevel = DataFactory.storeUserLevel();
      if ($scope.user.userLevel == 'user'){
        $scope.isUser = true;
        console.log($scope.isUser);
      }
      if($scope.user.username){
        console.log('User Data: ', $scope.user.username);
      } else {
        $location.path('/');
      }
    });
$scope.mapMarkers = [];
$http.get('/jobs/alljobs').then(function(response){
  console.log(response);
for (var i = 0; i < response.data.length; i++){
  var mapmarker = {
    position: response.data[i].address,
    price: response.data[i].totalPrice,
    due: response.data[i].dueDate,
    time: response.data[i].timeFrame,
    date: response.data[i].preferredDate.substring(0,10)
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
        date: ''
    };
    console.log('Map Controller running');
    $scope.showData = function(event, mapmarker) {
      $scope.pinSelected = true;
        console.log(mapmarker);
        $scope.selectedPin.address = mapmarker.position;
        $scope.selectedPin.price = mapmarker.price;
        $scope.selectedPin.due = mapmarker.due;
        $scope.selectedPin.time = mapmarker.time;
        $scope.selectedPin.date = mapmarker.date;
    };
$scope.closeModal = function(){
  $scope.pinSelected = false;
};
$scope.takeJob = function(){
  console.log("Taken!");
  $http.put('/jobs/takejob').then(function(response){
    console.log('Updated!');
  });
};

}]);
