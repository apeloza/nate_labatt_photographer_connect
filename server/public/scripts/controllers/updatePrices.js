app.controller('UpdatePrices', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
    console.log("Controller running");
    $scope.user = {};
    $scope.prices = {};
    $scope.addons = {};

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

    $scope.newAddon = {};

    function getPrices() {
        $http.get('/prices').then(function(response) {
            $scope.prices = response.data;
            $scope.addons = response.data[0].addons;
            $scope.sqft = response.data[0].sqft;
            $scope.afterDark = response.data[0].afterDark;
            console.log($scope.prices);
            console.log($scope.addons);
            console.log($scope.sqft);
        });
    }
    $scope.updatePrices = function(id, price) {
        $scope.prices = {
            sqft: $scope.sqft,
            afterDark: $scope.afterDark,
            addons: $scope.addons
        };
        $http.put('/prices', $scope.prices).then(function(response) {

        });
    };
    $scope.createAddon = function() {
        $scope.addons.push($scope.newAddon);

        console.log($scope.addons);
        $http.put('/prices/addons', $scope.addons).then(function(response) {
          $scope.newAddon.name = '';
          $scope.newAddon.value = '';
          $scope.newAddon.id = '';
            getPrices();
        });
    };
    $scope.deleteAddon = function(id) {
      var index;
        for (var i = 0; i < $scope.addons.length; i++) {
            if ($scope.addons[i].id == id) {
                 index = i;
            }
        }
        $scope.addons.splice(index, 1);
        console.log($scope.addons);
        $http.put('/prices/addons', $scope.addons).then(function(response) {
            getPrices();
        });
    };

}]);
