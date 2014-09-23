(function () {
    'use strict';

    // Create the module and define its dependencies.
    var app = angular.module('CorsIntegration.Controllers');

    app.controller("LoginController", ['$scope', 'accountsService', function ($scope, accountsService) {
        var self = $scope;

        self.loginData = {
            userName: '',
            password: ''
        };

        self.loginUser = function () {
            accountsService.loginUser(self.loginData).then(function (data) {
                self.isLoggedIn = true;
                self.userName = data.userName;
                self.bearerToken = data.access_token;
                console.log('loged in');
            }, function (error, status) {
                self.isLoggedIn = false;
                console.log(status);
            });
        };
    }]);
})();