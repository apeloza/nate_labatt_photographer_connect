app.controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Login Controller running');
  $scope.user = {
    username: '',
    password: ''
  };
$scope.login = function() {
  if($scope.user.username === '' || $scope.user.password === '') {
    $scope.message = 'A username and password are required. Contact the administrator for an account.';
  } else {
    console.log('sending to server . . .', $scope.user);
    $http.post('/login', $scope.user).then(function(response) {
      if(response.data.username) {
        console.log('success:', response.data);
        $location.path('/map');
      } else {
        console.log('failure: ', response);
        $scope.message = "Incorrect credentials.";
      }
    });
  }
};
}]);
