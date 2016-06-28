myApp.controller('MailController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    // This happens after view/controller loads -- not ideal
    $scope.email = {};
    $scope.allMessageInfo = [];
    $scope.allMessages = [];
    $scope.mesage = '';

    console.log('checking user');
    $http.get('/user').then(function(response) {
        if (response.data.username) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
        } else {
            $location.path("/home");
        }
    });

    $scope.getEmail = function() {

        $http.get('/mail/messages').then(function(response) {
            if (response.data) {
                console.log(response.data);
                $scope.allMessageInfo = response.data.items;

                $scope.allMessageInfo.forEach(function(item, index) {

                    $http.post('/mail/messages/item', item).then(function(response1) {

                        $scope.message = response1.data;
                        $scope.message.timestamp = item.timestamp;
                        $scope.message.event = item.event;
                        $scope.allMessages.push($scope.message);

                        if ($scope.allMessageInfo.length == index + 1) {
                            console.log('Message Data: ', $scope.allMessages);
                        }

                    });

                });

            } else {
                console.log('error');
            }
        });
    };
    $scope.logout = function() {
        $http.get('/user/logout').then(function(response) {
            console.log('logged out');
            $location.path("/home");
        });
    }

    $scope.submitEmail = function() {
        console.log($scope.email);
        $http.post('/mail', $scope.email).then(function(response) {
            console.log(response);
        });
    };
}]);
