(function () {
    'use strict';
    angular.module('CorsIntegration.Controllers.Accounts').controller("LoginController", loginController);

    /* @ngInject */
    function loginController($scope, accountsService) {
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
    }
})();