app.controller('UpdatePrices', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
    console.log("Controller running");
    $scope.user = {};
    $scope.prices = {};
    $scope.addons = {};

//The DataFactory ensures the user is logged in, and then the username and user level (e.g. admin, user) is stored.
    DataFactory.authenticate().then(function() {
        $scope.user.username = DataFactory.storeUsername();
        $scope.user.userLevel = DataFactory.storeUserLevel();
        //If the user is not an admin, return them to the map page.
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

//This function fetches all relevant pricing from the server, and then applies them to scoped variables.
    function getPrices() {
        $http.get('/prices').then(function(response) {
            $scope.prices = response.data;
            // $scope.addons = response.data[0].addons;
            $scope.addons = response.data.addons;
            console.log($scope.addons);
            $scope.sqft = response.data.sqft;
            $scope.afterDark = response.data.afterDark;
        });
    }

    //This function packages all current pricing into an object, and then sends it to the server.
    $scope.updatePrices = function(id, price) {
        $scope.prices = {
            sqft: $scope.sqft,
            afterDark: $scope.afterDark,
            addons: $scope.addons
        };
        $http.put('/prices', $scope.prices).then(function(response) {

        });
    };

    //This function creates a new Addon by pushing it onto an array of addons and then sending that array to the server.
    $scope.createAddon = function() {
      console.log($scope.newAddon.name);
      if($scope.newAddon.name === undefined){
        return;
      } else {
        $scope.addons.push($scope.newAddon);
        $http.put('/prices/addons', $scope.addons).then(function(response) {
          $scope.newAddon.name = '';
          $scope.newAddon.value = '';
          $scope.addonForm.$setUntouched();
          $scope.addonForm.$setPristine();
            getPrices();
        });
      }
    };

    //This function deletes an addon by splicing it from the array of addons and then sending the spliced array to the server.
    $scope.deleteAddon = function(name) {
      var index;
        for (var i = 0; i < $scope.addons.length; i++) {
            if ($scope.addons[i].name == name) {
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
