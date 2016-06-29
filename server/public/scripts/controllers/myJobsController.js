app.controller('MyJobsController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
  
    $scope.loggedUser = {};
    $scope.userJobs = {};
    $scope.timeFrame = {};
    $scope.messageObject = {};
    $scope.messages = [];
    $scope.messageContainer = {};
    DataFactory.authenticate().then(function() {
        $scope.loggedUser.username = DataFactory.storeUsername();
        $scope.loggedUser.userLevel = DataFactory.storeUserLevel();
        if ($scope.loggedUser.userLevel == 'admin') {
            $location.path('/user');
        }
        if ($scope.loggedUser.username) {
            console.log('User Data: ', $scope.loggedUser.username);
        } else {
            $location.path('/');
        }
    });
    DataFactory.getAllJobs().then(function() {
        $scope.userJobs = DataFactory.findUserJobs();

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
        });
    };
    $scope.submitMessage = function(id) {
        console.log(id);
        console.log($scope.messageContainer.message);

        $http.get('/chats/' + id).then(function(response) {
            console.log(response);
            $scope.messages = response.data.messages;
            $scope.messages.push($scope.messageContainer.message);
            $scope.messageObject = {
                messages: $scope.messages
            };
            $http.put('/chats/' + id, $scope.messageObject).then(function(req, res) {
                console.log('Success');
            });
        });

    };
}]);
