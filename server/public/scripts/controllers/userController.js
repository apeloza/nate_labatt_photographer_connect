app.controller('UserController', ['$scope', '$http', '$location', 'DataFactory', function ($scope, $http, $location, DataFactory) {

  console.log('Create User Controller running');
  $scope.loggedUser = {};

  DataFactory.authenticate().then(function(){
    $scope.loggedUser.username = DataFactory.storeUsername();
    $scope.loggedUser.userLevel = DataFactory.storeUserLevel();
    if($scope.loggedUser.userLevel == 'user'){
      $location.path('/user');
    }
    if($scope.loggedUser.username){
      console.log('User Data: ', $scope.loggedUser.username);
      getAllUsers();
    } else {
      $location.path('/');
    }
  });

function getAllUsers () {
  $http.get('/user/allusers').then(function(response) {
    if(response.data) {
      $scope.allUsers = response.data;
    } else {
      alert('No Users');
    }
  });
}

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
      $location.path('/userList');
    },
  function(response) {
    console.log('Error');
    $scope.message = 'Please try again.';
  });
  }
};

$scope.updateUser = function(id) {
  $scope.userUpdate = {
    
  }
    console.log('sending to server . . .', $scope.userUpdate);
    $http.post('/user/update/' + id, $scope.userUpdate).then(function(response) {
      console.log('Success!');
      $location.path('/userList');
    },
  function(response) {
    console.log('Error');
    $scope.message = 'Please try again.';
  });
}

$scope.deleteUser = function(id) {

  if (confirm("Remove user?")) {
      $http.delete('/user/' + id)
          .then(function(response) {
              getAllUsers();
          });
  }
};

}]);
