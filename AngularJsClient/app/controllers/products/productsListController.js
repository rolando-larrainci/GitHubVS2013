(function () {
    'use strict';

    // Create the module and define its dependencies.
    var app = angular.module(appControllersId);

    app.controller(productsListControllerId, ['productsService', function (productsService) {
        var self = this;

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