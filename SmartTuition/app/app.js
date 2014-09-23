// Module name is handy for logging
var appId = 'CorsIntegration';
var serviceModule = 'CorsIntegration.Services';
var appControllersId = 'CorsIntegration.Controllers';
var loginControllerId = 'LoginController';
var createAccountsControllerId = 'CreateAccountController';
var productsListControllerId = 'ProductsListController';
var productDetailsControllerId = 'ProductDetailsController';

(function () {
    'use strict';

    // Create the module and define its dependencies.
    var services = angular.module('CorsIntegration.Services', []);
    angular.module('CorsIntegration.Controllers', ['CorsIntegration.Services']);
    var app = angular.module('CorsIntegration', ['ngRoute', 'CorsIntegration.Controllers', 'CorsIntegration.Services']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/createLogin', {
                templateUrl: '../accounts/register/createAccount.html',
                controller: 'CreateAccountController'
            })
            .when('/login', {
                templateUrl: '../accounts/login/login.html',
                controller: 'LoginController'
            })
            .when('/products', {
                templateUrl: '../products/list/productsList.html',
                controller: 'ProductsListController'
            })
            .when('/productDetails', {
                templateUrl: '../products/detail/productDetails.html',
                controller: 'ProductDetailsController'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });

    services.config(['$httpProvider', function ($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }]);

    // Execute bootstrapping code and any dependencies.
    app.run(['$q', '$rootScope', function ($q, $rootScope) {

        }]);

})();