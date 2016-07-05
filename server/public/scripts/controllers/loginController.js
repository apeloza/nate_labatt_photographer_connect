app.controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.user = {
    username: '',
    password: ''
  };
  $scope.message = '';
  $scope.userLevel = '';

  //The login function. This sends your username and password to the server, and compares them to the database of users.
  $scope.login = function() {
        if($scope.user.username === '' || $scope.user.password === '') {
          $scope.message = "Please enter your username and password.";
        } else {
          console.log('sending to server...', $scope.user);
          $http.post('/', $scope.user).then(function(response) {
            if(response.data.username) {
              console.log('success: ', response.data);
              // location works with SPA (ng-route)
              $location.path('/user');
            } else {
              console.log('failure: ', response);
              $scope.message = "Incorrect credentials.";
            }
          });
        }
      };

  }]);
