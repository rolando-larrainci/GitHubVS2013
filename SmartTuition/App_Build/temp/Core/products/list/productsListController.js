(function () {
    'use strict';
    var controllerId = 'ProductsListController';
    angular.module('CorsIntegration.Controllers.Products').controller(controllerId, productsListController);

    /* @ngInject */
    function productsListController(productsService) {
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
    productsListController.$inject = ['productsService'];
})();