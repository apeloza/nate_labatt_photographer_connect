app.controller('UpdatePrices', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
    console.log("Controller running");
    $scope.user = {};
    $scope.prices = {};
    $scope.newPrice = {};
    DataFactory.authenticate().then(function() {
        $scope.user.username = DataFactory.storeUsername();
        $scope.user.userLevel = DataFactory.storeUserLevel();
        if ($scope.user.userLevel == 'user') {
            $location.path('/user');
        }
        if ($scope.user.username) {
            console.log('User Data: ', $scope.user.username);
            getPrices();
        } else {
            $location.path('/');
        }
    });


    function getPrices() {
        $http.get('/prices').then(function(response) {
            $scope.prices = response.data;
            console.log($scope.prices);
        });
    }
    $scope.updatePrices = function(id, price) {
        $http.put('/prices/' + id, price).then(function(response) {

        });
    };
    $scope.createPrice = function() {
        $http.post('/prices', $scope.newPrice).then(function(response) {
            getPrices();
        });
    };
    $scope.deletePrice = function(id) {
        $http.delete('/prices/' + id).then(function(response) {
            getPrices();
        });
    };

}]);
