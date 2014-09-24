(function () {
    'use strict';

    angular.module('CorsIntegration.Controllers.Accounts').controller('CreateAccountController', createAccountController);

    /* @ngInject */
    function createAccountController($scope, accountsService) {
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
    }
})();