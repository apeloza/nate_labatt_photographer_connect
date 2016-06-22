app.controller('UserController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Create User Controller running');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/");
      }
  });
$scope.user = {
  username: '',
  password: '',
  email: '',
  phone: '',
  level: 'user'
};
$scope.registerUser = function() {
  if($scope.user.username === '' || $scope.user.password === '' || $scope.user.email === ''){
    $scope.message = "Please fill out all required fields.";
  } else {
    console.log('sending to server . . .', $scope.user);
    $http.post('/register', $scope.user).then(function(response) {
      console.log('Success!');
      $location.path('/');
    },
  function(response) {
    console.log('Error');
    $scope.message = 'Please try again.';
  });
  }
};
$scope.toCreateUser = function(){
  $location.path('/createUser');
};
}]);
