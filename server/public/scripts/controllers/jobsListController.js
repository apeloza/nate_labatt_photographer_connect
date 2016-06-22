app.controller('JobsListController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Jobs list Controller running');
  console.log($location.path());
}]);
