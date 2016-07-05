app.controller('UserController', ['$scope', '$http', '$location', '$mdToast', 'DataFactory', function($scope, $http, $location, $mdToast, DataFactory) {

    $scope.loggedUser = {};
    $scope.allUsers = [];

    //the user that is being clicked on or edited
    $scope.activeUser = {};

    DataFactory.authenticate().then(function() {
        $scope.loggedUser.username = DataFactory.storeUsername();
        $scope.loggedUser.userLevel = DataFactory.storeUserLevel();
        if ($scope.loggedUser.userLevel == 'user') {
            $location.path('/user');
        }
        if ($scope.loggedUser.username) {
            console.log('User Data: ', $scope.loggedUser.username);
            getAllUsers();
        } else {
            $location.path('/');
        }
    });

    function getAllUsers() {
        $http.get('/user/allusers').then(function(response) {
            if (response.data) {
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
        level: ''
    };

    $scope.registerUser = function(level) {
        if ($scope.user.username === '' || $scope.user.password === '' || $scope.user.email === '') {
            $scope.message = "Please fill out all required fields.";
        } else {
            $scope.user.level = level;
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
        if ($scope.activeUser._id == id) {
            $scope.userUpdate = {
                username: $scope.activeUser.username,
                email: $scope.activeUser.email,
                phone: $scope.activeUser.phoneNumber
            }
            console.log('sending to server . . .', $scope.userUpdate);
            $http.put('/user/update/' + id, $scope.userUpdate).then(function(response) {
                    console.log('Success!');
                    $location.path('/userList');
                },
                function(response) {
                    console.log('Error');
                    $scope.message = 'Please try again.';
                });
        }
        $location.path('/userList');
    };

    $scope.approveUser = function(id) {
            console.log('sending to server . . .');
            $http.put('/user/approve/' + id).then(function(response) {
                    console.log('Success!');
                    getAllUsers();
                },
                function(response) {
                    console.log('Error');
                    $scope.message = 'Please try again.';
                });
        };

    $scope.deleteUser = function(id) {
      var toast = $mdToast.simple()
         .textContent('Do you really want to remove that user?')
         .action('UNDO')
         .position('top')
         .hideDelay(5000)
         .highlightAction(false);
      $mdToast.show(toast).then(function(response) {
         if ( response == 'ok' ) {
            console.log('dont delete');
         } else {
           console.log('user deleted');
           $http.delete('/user/' + id)
               .then(function(response) {
                   getAllUsers();
               });
         }
      });
    };

}]);
