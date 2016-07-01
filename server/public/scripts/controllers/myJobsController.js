app.controller('MyJobsController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {

    $scope.loggedUser = {};
    $scope.userJobs = {};
    $scope.timeFrame = {};
    $scope.messageObject = {};
    $scope.messages = [];
    $scope.messageContainer = {};
<<<<<<< HEAD

    //email vars
    $scope.email = {};
    $scope.allMessageInfo = [];
    $scope.allMessages = [];
    $scope.message = '';

    $scope.activeJob = {};

=======
    $scope.photoURL = {};
>>>>>>> master
    DataFactory.authenticate().then(function() {
        $scope.loggedUser.username = DataFactory.storeUsername();
        $scope.loggedUser.userLevel = DataFactory.storeUserLevel();
        if ($scope.loggedUser.userLevel == 'admin') {
            $location.path('/user');
        }
        if ($scope.loggedUser.username) {
            console.log('User Data: ', $scope.loggedUser.username);
            getEmail();

        } else {
            $location.path('/');
        }
    });

    DataFactory.getAllJobs().then(function() {
        $scope.userJobs = DataFactory.findUserJobs();
        console.log('user jobs:', $scope.userJobs);


    });

    $scope.preferredTime = ['6:00 AM',
        '6:30 AM',
        '7:00 AM',
        '7:30 AM',
        '8:00 AM',
        '8:30 AM',
        '9:00 AM',
        '9:30 AM',
        '10:00 AM',
        '10:30 AM',
        '11:00 AM',
        '11:30 AM',
        '12:00 PM',
        '12:30 PM',
        '1:00 PM',
        '1:30 PM',
        '2:00 PM',
        '2:30 PM',
        '3:00 PM',
        '3:30 PM',
        '4:00 PM',
        '4:30 PM',
        '5:00 PM',
        '5:30 PM',
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
        '7:30 PM',
        '8:00 PM',
        '8:30 PM',
        '9:00 PM'
    ];

    function combineDateAndTime(date, time) {
        timeString = time;
        console.log(timeString);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var dateString = '' + year + '-' + month + '-' + day;
        var combined = new Date(dateString + ' ' + timeString);
        return combined;
    }
    $scope.submitDate = function(id) {

        var dateHolder = {
            date: $scope.timeFrame.date,
            time: $scope.timeFrame.time
        };
        $http.put('/chats/date/' + id, dateHolder).then(function(req, res) {
            DataFactory.getAllJobs().then(function() {
                $scope.userJobs = DataFactory.findUserJobs();

            });
<<<<<<< HEAD
=======
        });
    };
    $scope.submitPhotoURL = function(id) {
        $http.put('/chats/photos/' + id, $scope.photoURL).then(function(response) {
            DataFactory.getAllJobs().then(function() {
                $scope.userJobs = DataFactory.findUserJobs();
            });
>>>>>>> master
        });
    };

    $scope.setActive = function(obj) {
        $scope.activeJob = obj;
        $scope.messages = $scope.activeJob.chat.messages;
    };

    $scope.submitMessage = function(id) {

        if ($scope.activeJob._id == id) {
            console.log(id);
            console.log('message container', $scope.messageContainer);



            $http.get('/chats/' + id).then(function(response2) {
                console.log('chats data', response2);

                $scope.messages = response2.data.chat.messages;

                $scope.email.sendTo = response2.data.emails.toString();
                $scope.email.subject = "Set a time for a photo session [" + response2.data._id + "]";
                $scope.email.message = $scope.messageContainer.message;
                console.log($scope.email);
                $scope.messages.push($scope.messageContainer.message);
                $scope.messageObject = {
                    message: $scope.email.message,
                    timestamp: Date.now(),
                    username: $scope.loggedUser.username,
                    msgType: 'sent'
                };

                $http.put('/chats/' + id, $scope.messageObject).then(function(req, res) {
                    console.log('Success');
                    sendEmail();
                    $scope.email = {};
                    //     DataFactory.getAllJobs().then(function() {
                    //         $scope.userJobs = DataFactory.findUserJobs();
                    //
                    //     });
                    $scope.messageContainer = {};
                });
            });


        }
    };


    //gets email from mailgun
    function getEmail() {
        $http.get('/mail/messages').then(function(response) {
            if (response.data) {
                console.log('mail data', response.data);
                $scope.allMessageInfo = response.data.items;
                $scope.allMessages = [];
                $scope.allMessageInfo.forEach(function(item, index) {

                    $http.post('/mail/messages/item', item).then(function(response1) {

                        $scope.message = response1.data;
                        //console.log($scope.message);
                        var matches = $scope.message.Subject.match(/\[(.*?)\]/);

                        if (matches) {
                            var id = matches[1];
                            console.log("submatch", id);
                            if (item.event == 'stored') {

                                console.log('message matched to subject', $scope.message);
                                $scope.messageObject = {
                                    message: $scope.message['stripped-text'],
                                    timestamp: item.timestamp*1000,
                                    username: $scope.message.sender,
                                    msgType: 'received'
                                };
                                $http.put('/chats/' + id, $scope.messageObject).then(function(req, res) {
                                    $scope.messageContainer = {};
                                });

                            }
                        }

                    });

                });

            } else {
                console.log('error');
            }
        });
    }
    //sends an email to recipients
    function sendEmail() {
        console.log($scope.email);
        $http.post('/mail', $scope.email).then(function(response) {
            console.log(response);
        });
    }


}]);
