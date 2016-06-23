app.controller('MapController', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
    $http.get('/user').then(function(response) {
        if (response.data.username) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
        } else {
            $location.path("/");
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
    /*$scope.mapMarkers = [{
        position: '32 Spruce Place Minneapolis MN',
        price: '350$',
        due: 'July 5th, 2016',
        time: 'Morning'

    }, {
        position: '1000 Devonshire Lane Bloomington MN',
        price: '300$',
        due: 'July 10th, 2016',
        time: 'Evening'
    }];*/

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
}]);
