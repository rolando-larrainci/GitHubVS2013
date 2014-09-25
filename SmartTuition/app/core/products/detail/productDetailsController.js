(function () {
    'use strict';
    var controllerId = 'ProductDetailsController';
    angular.module('CorsIntegration.Controllers.Products').controller(controllerId, productDetailsController);

    /* @ngInject */
    function productDetailsController(productsService) {
        var self = this;


        self.loginData = {
            userName: '',
            password: ''
        };

        self.loginUser = function () {
            productsService.loginUser(self.loginData).then(function (data) {
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