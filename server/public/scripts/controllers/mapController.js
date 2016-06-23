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
        data: {
          address: '32 Spruce Place Minneapolis MN',
          price: '350$'
        }
    }, {
        position: '1000 Devonshire Lane Bloomington MN',
        data: {
          address: '1000 Devonshire Lane Bloomington MN',
          price: '300$'
        }
    }];
    $scope.selectedPin = {
        address: '',
        price: '',
        due: ''
    };
    console.log('Map Controller running');
    $scope.showData = function(mapmarker) {
      console.log("Fired");
console.log(mapmarker);
        $scope.selectedPin.address = mapmarker.position;
        console.log($scope.selectedPin.address);

    };

}]);
