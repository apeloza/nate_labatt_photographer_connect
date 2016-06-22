app.controller('MapController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/");
      }
  });
  console.log('Map Controller running');
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.986, lng: -93.258},
    zoom: 10
  });
}]);
