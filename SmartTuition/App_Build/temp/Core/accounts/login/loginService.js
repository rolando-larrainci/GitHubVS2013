(function () {
    'use strict';
    var serviceId = 'LoginService';
    angular.module('CorsIntegration.Services.Accounts').factory(serviceId, loginService);

    /* @ngInject */
    function loginService($http, $q) {
        // Define the functions and properties to reveal.
        var service = {
            loginUser: loginUser,
            getValues: getValues,
        };

        var serverBaseUrl = "http://localhost:57496";
        var accessToken = "";
     
        function loginUser(userData) {
            var tokenUrl = serverBaseUrl + "/Token";
            if (!userData.grant_type) {
                userData.grant_type = "password";
            }
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: tokenUrl,
                data: userData,
            }).success(function (data, status, headers, cfg) {
                // save the access_token as this is required for each API call. 
                accessToken = data.access_token;
                // check the log screen to know currently back from the server when a user log in successfully.
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getValues() {
            var url = serverBaseUrl + "/api/values/";
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                headers: getHeaders(),
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getHeaders() {
            if (accessToken) {
                return { "Authorization": "Bearer " + accessToken };
            }
            return { "Authorization": "Bearer " + accessToken };

        }

        return service;

    }
    loginService.$inject = ['$http', '$q'];

})();