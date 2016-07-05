app.controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.user = {
    username: '',
    password: ''
  };
  $scope.newUser = {
    username: '',
    password: '',
    email: '',
    level: 'applicant'
  };
  $scope.message = '';

  $scope.login = function() {
        if($scope.user.username === '' || $scope.user.password === '') {
          $scope.message = "Please enter your username and password.";
        } else {
          console.log('sending to server...', $scope.user);
          $http.post('/', $scope.user).then(function(response) {
            console.log(response.data);
            if(response.data.level == 'applicant'){
              $scope.message = "You are not yet approved!";
            }
            else if(response.data.username) {
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

      $scope.registerUser = function() {
        if($scope.newUser.username === '' || $scope.newUser.password === '' || $scope.newUser.email === '') {
          $scope.message = "You are missing a required field.";
        } else {
          console.log('sending to server...', $scope.newUser);
          $http.post('/register', $scope.newUser).then(function(response) {
            console.log('success');
            $scope.message = "Success! You will be contacted once approved.";
          },
          function(response) {
            console.log('error');
            $scope.message = "Please try again.";
          });
        }
      };

  }]);
