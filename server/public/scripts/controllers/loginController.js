app.controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('Login Controller running');
  $scope.user = {
    username: '',
    password: ''
  };
  $scope.message = '';
  $scope.userLevel = '';
  $scope.login = function() {
        if($scope.user.username === '' || $scope.user.password === '') {
          $scope.message = "Enter your username and password!";
        } else {
          console.log('sending to server...', $scope.user);
          $http.post('/', $scope.user).then(function(response) {
            if(response.data.username) {
              console.log('success: ', response.data);
              $scope.userLevel = response.data.level;
              console.log($scope.userLevel);
              // location works with SPA (ng-route)
              $location.path('/user');
            } else {
              console.log('failure: ', response);
              $scope.message = "Wrong!!";
            }
          });
        }
      };

      $scope.registerUser = function() {
        if($scope.user.username === '' || $scope.user.password === '') {
          $scope.message = "Choose a username and password!";
        } else {
          console.log('sending to server...', $scope.user);
          $http.post('/register', $scope.user).then(function(response) {
            console.log('success');
            $location.path('/home');
          },
          function(response) {
            console.log('error');
            $scope.message = "Please try again.";
          });
        }
      };
      $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/");
    });
  };
  }]);
