(function () {
    'use strict';
    var controllerId = "LoginController";
    angular.module('CorsIntegration.Controllers.Accounts').controller(controllerId, loginController);

    /* @ngInject */
    function loginController($scope, LoginService) {
        var self = $scope;
        self.loginData = {
            userName: '',
            password: ''
        };

        self.loginUser = function () {
            LoginService.loginUser(self.loginData).then(function (data) {
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
    loginController.$inject = ['$scope', 'LoginService'];
})();