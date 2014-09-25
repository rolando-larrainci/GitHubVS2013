// Module name is handy for logging
var appId = 'CorsIntegration';


(function () {
    'use strict';

    angular.module('CorsIntegration.Services.Accounts', []).config(servicesConfig);
    angular.module('CorsIntegration.Controllers.Products', ['CorsIntegration.Services.Accounts']);
    angular.module('CorsIntegration.Controllers.Accounts', ['CorsIntegration.Services.Accounts']);
    var app=angular.module('CorsIntegration', [
            'ngRoute',
            'CorsIntegration.Controllers.Products',
            'CorsIntegration.Controllers.Accounts',
            'CorsIntegration.Services.Accounts'
        ])
        .config(appConfig);

    /* @ngInject */
    function appConfig($routeProvider) {
        $routeProvider
            .when('/createLogin', {
                templateUrl: 'core/accounts/register/createAccount.html',
                controller: 'CreateAccountController'
            })
            .when('/login', {
                templateUrl: 'core/accounts/login/login.html',
                controller: 'LoginController'
            })
            .when('/products', {
                templateUrl: 'core/products/list/productsList.html',
                controller: 'ProductsListController'
            })
            .when('/productDetails', {
                templateUrl: 'core/products/detail/productDetails.html',
                controller: 'ProductDetailsController'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }
    appConfig.$inject = ['$routeProvider'];;


    /* @ngInject */
    function servicesConfig($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {

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
    }
    servicesConfig.$inject = ['$httpProvider'];;


    app.run(['$q', '$rootScope', function ($q, $rootScope) {}]);

})();
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
            confirmPassword: ''
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
    productDetailsController.$inject = ['productsService'];
})();
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
(function () {
    'use strict';
    var serviceId = 'LoginService';
    angular.module('CorsIntegration.Services.Accounts').factory(serviceId, loginService);

    /* @ngInject */
    function loginService($http, $q) {
        // Define the functions and properties to reveal.
        var service = {
            loginUser: loginUser,
            getValues: getValues,
        };

        var serverBaseUrl = "http://localhost:57496";
        var accessToken = "";
     
        function loginUser(userData) {
            var tokenUrl = serverBaseUrl + "/Token";
            if (!userData.grant_type) {
                userData.grant_type = "password";
            }
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: tokenUrl,
                data: userData,
            }).success(function (data, status, headers, cfg) {
                // save the access_token as this is required for each API call. 
                accessToken = data.access_token;
                // check the log screen to know currently back from the server when a user log in successfully.
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getValues() {
            var url = serverBaseUrl + "/api/values/";
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                headers: getHeaders(),
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }

        function getHeaders() {
            if (accessToken) {
                return { "Authorization": "Bearer " + accessToken };
            }
            return { "Authorization": "Bearer " + accessToken };

        }

        return service;

    }
    loginService.$inject = ['$http', '$q'];

})();
(function () {
    'use strict';
    var serviceId = 'createAccountService';
    angular.module('CorsIntegration.Services.Accounts').factory(serviceId,accountsService);

    /* @ngInject */
    function accountsService($http, $q) {
        var service = {
            registerUser: registerUser,
            getValues: getValues,
        };
        var serverBaseUrl = "http://localhost:57496";

        var accessToken = "";

        function registerUser(userData) {
            var accountUrl = serverBaseUrl + "/api/Account/Register";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: accountUrl,
                data: userData,
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }
        

        function getValues() {
            var url = serverBaseUrl + "/api/values/";
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                headers: getHeaders(),
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(status);
            });
            return deferred.promise;
        }
        // we have to include the Bearer token with each call to the Web API controllers. 
        function getHeaders() {
            if (accessToken) {
                return { "Authorization": "Bearer " + accessToken };
            }
            return { "Authorization": "Bearer " + accessToken };
        }

        return service;

    }
    accountsService.$inject = ['$http', '$q'];
})();