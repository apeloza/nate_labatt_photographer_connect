app.controller('UserController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Create User Controller running');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
        console.log(response.data);
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/");
      }
  });

  $http.get('/user/allusers').then(function(response) {
    if(response.data) {
      $scope.allUsers = response.data;
      console.log($scope.allUsers);
    } else {
      alert('No Users');
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

}]);
