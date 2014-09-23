/// <reference path="../../app.js" />


(function () {
    'use strict';

    // Create the module and define its dependencies.
    var app = angular.module('CorsIntegration.Controllers');

    app.controller('CreateAccountController', ['$scope', 'accountsService', function ($scope, accountsService) {
        var self = $scope;

        self.registerUserData = {
            email : '',
            password : '',
            confirmPassword: ''
        };

        self.registerUser = function () {
            console.log('Llamo bien');
            accountsService.registerUser(self.registerUserData)
            .then(
            function (data) {
                self.isRegistered = true;
                console.log('User registered');
            },
            function (error, status) {
                self.isRegistered = false;
                console.log(error);
                console.log(status);
            });
        };
    }]);
})();