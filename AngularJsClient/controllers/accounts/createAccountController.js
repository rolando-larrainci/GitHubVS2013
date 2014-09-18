(function () {
    'use strict';

    // Create the module and define its dependencies.
    var app = angular.module(appControllersId);

    app.controller(createAccountsControllerId, ['$scope', 'accountsService', function ($scope, accountsService) {
        var self = $scope;

        self.registerUserData = {
            email : '',
            password : '',
            confirmPassword: ''
        };

        self.registerUser = function () {
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