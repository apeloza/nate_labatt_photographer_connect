app.factory('DataFactory', ['$http', function($http) {
    console.log('Data Factory running.');

    var user;
    var jobs;
    var userJobs = [];
    var openJobs = [];
    //PRIVATE
    function authenticate() {
        var promise = $http.get('/user').then(function(response) {
            user = response.data;
        });
        return promise;
    }

    function getAllJobs() {
        var promise = $http.get('/jobs/alljobs').then(function(response) {
            jobs = response.data;
        });
        return promise;
    }
function findOpenJobs() {
  for (var i = 0; i < jobs.length; i++){
    if(jobs[i].jobStatus == 'open'){
openJobs.push(jobs[i]);
    }
  }
  return openJobs;
}
    function findUserJobs() {
        for ( i = 0; i < jobs.length; i++) {
            if (jobs[i].jobAcceptedBy == user.username) {
                userJobs.push(jobs[i]);
            }
        }
        return userJobs;
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
        storeUserLevel: storeUserLevel,
        getAllJobs: getAllJobs,
        findUserJobs: findUserJobs,
        findOpenJobs: findOpenJobs
    };
    return publicFunctions;
}]);
