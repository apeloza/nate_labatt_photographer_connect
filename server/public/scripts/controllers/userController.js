app.controller('UserController', ['$scope', '$http', '$location', '$mdDialog', 'DataFactory', function($scope, $http, $location, $mdDialog, DataFactory) {

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

                    $http.post('/mail/addphotographer/', $scope.user).then(function(response1) {
                        console.log("added user email to list");
                        $location.path('/userList');
                    });

                },
                function(response) {
                    console.log('Error');
                    $scope.message = 'Please try again.';
                });
        }
    };


    $scope.updateUser = function(user) {

        console.log('sending to server . . .');
        $http.put('/user/update/' + user._id, user).then(function(response) {
                console.log('Success!');
                getAllUsers();
            },
            function(response) {
                console.log('Error');
                $scope.message = 'Please try again.';
            });
    };


    $scope.approveUser = function(user) {
        console.log('sending to server . . .');
        $http.put('/user/approve/' + user._id).then(function(response) {
                $http.post('/mail/addphotographer/', user).then(function(response1) {
                    console.log('Success!');

                    getAllUsers();
                });
            },
            function(response) {
                console.log('Error');
                $scope.message = 'Please try again.';
            });
    };

    $scope.deleteUser = function(id, ev) {
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .ariaLabel('delete user')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');
        $mdDialog.show(confirm).then(function() {
            $scope.status = 'deleted.';
            console.log('user deleted');
            $http.delete('/user/' + id)
                .then(function(response) {
                    getAllUsers();
                });
        }, function() {
            $scope.status = 'not deleted.';
        });
    };

}]);
