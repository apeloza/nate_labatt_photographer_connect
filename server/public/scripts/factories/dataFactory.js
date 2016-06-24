app.factory('DataFactory', ['$http', function($http) {
    console.log('Data Factory running.');

    var user;
    //PRIVATE
    function authenticate() {
        var promise = $http.get('/user').then(function(response) {
            user = response.data;
        });
        return promise;
    }

    function storeUsername() {
        return user.username;
    }

    function storeUserLevel() {
        return user.level;
    }
    //PUBLIC
    var publicFunctions = {
        authenticate: authenticate,
        storeUsername: storeUsername,
        storeUserLevel: storeUserLevel
    };
    return publicFunctions;
}]);
