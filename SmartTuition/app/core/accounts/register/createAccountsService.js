(function () {
    'use strict';
    var serviceId = 'createAccountService';
    angular.module('CorsIntegration.Services.Accounts').factory(serviceId,accountsService);

    /* @ngInject */
    function accountsService($http, $q) {
        var service = {
            registerUser: registerUser,
            getValues: getValues,
        };
        var serverBaseUrl = "http://localhost:57496";

        var accessToken = "";

        function registerUser(userData) {
            var accountUrl = serverBaseUrl + ""http://localhost:57496";/api/Account/Register";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: accountUrl,
                data: userData,
            }).success(function (data, status, headers, cfg) {
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
        // we have to include the Bearer token with each call to the Web API controllers. 
        function getHeaders() {
            if (accessToken) {
                return { "Authorization": "Bearer " + accessToken };
            }
            return { "Authorization": "Bearer " + accessToken };
        }

        return service;

    }
})();