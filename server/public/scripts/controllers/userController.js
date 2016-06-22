app.controller('UserController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Create User Controller running');
$scope.user = {
  username: '',
  password: '',
  email: '',
  phone: '',
  level: 'user'
};
$scope.registerUser = function() {
  if($scope.user.username == '' || $scope.user.password == '' || $scope.user.email == ''){
    $scope.message = "Please fill out all required fields.";
  } else {
    console.log('sending to server . . .', $scope.user);
    $http.post('/createuser', $scope.user).then(function(response) {
      console.log('Success!');
      $location.path('/');
    },
  function(response) {
    console.log('Error');
    $scope.message = 'Please try again.';
  });
  }
};
}]);
