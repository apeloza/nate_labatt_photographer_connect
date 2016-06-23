app.controller('MapController', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
    $http.get('/user').then(function(response) {
        if (response.data.username) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
        } else {
            $location.path("/");
        }
    });

    $scope.mapMarkers = [{
        position: '32 Spruce Place Minneapolis MN',
        price: '350$',
        due: 'July 5th, 2016'

    }, {
        position: '1000 Devonshire Lane Bloomington MN',
        price: '300$',
        due: 'July 10th, 2016'
    }];
    $scope.selectedPin = {
        address: '',
        price: '',
        due: ''
    };
    console.log('Map Controller running');
    $scope.showData = function(event, mapmarker) {
      $scope.pinSelected = true;
        console.log(mapmarker);
        $scope.selectedPin.address = mapmarker.position;
        $scope.selectedPin.price = mapmarker.price;
        $scope.selectedPin.due = mapmarker.due;
    };
$scope.closeModal = function(){
  $scope.pinSelected = false;
};
}]);
