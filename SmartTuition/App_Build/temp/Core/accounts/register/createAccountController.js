//esta linea la agrego rolando

(function () {
    'use strict';
    var controllerId = 'CreateAccountController';
    angular.module('CorsIntegration.Controllers.Accounts').controller(controllerId, createAccountController);

    /* @ngInject */
    function createAccountController($scope, createAccountService) {
        var self = $scope;

        self.registerUserData = {
            email : '',
            password : '',
            confirmPassword2: ''
        };

        self.registerUser = function () {
            console.log('Llamo bien');
            createAccountService.registerUser(self.registerUserData)
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
    createAccountController.$inject = ['$scope', 'createAccountService'];
})();