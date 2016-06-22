app.controller('MapController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Map Controller running');
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}]);
