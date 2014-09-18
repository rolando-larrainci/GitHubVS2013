/// <reference path="../../../angularjsclient/scripts/angular.js" />
/// <reference path="../../../angularjsclient/scripts/angular-mocks.js" />
/// <reference path="../../../angularjsclient/scripts/angular-route.js" />
/// <reference path="../../../angularjsclient/app.js" />
/// <reference path="../../../angularjsclient/controllers/accounts/createaccountcontroller.js" />
/// <reference path="../../../angularjsclient/services/accountsservice.js" />

describe('verify test runner', function () {

    describe('CorsIntegration', function () {
        var scope, ctrl;

        beforeEach(module('CorsIntegration'));

        it('0 = 0', function () {
            expect(0).toBe(0);
        });

    });
});

describe('Create Account Controller Spec', function () {

    beforeEach(module('CorsIntegration', ['ngRoute', 'CorsIntegration.Controllers']));
    beforeEach(module('CorsIntegration.Controllers', []));

    describe('CreateAccountCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expect(
                    'POST',
                    'http://localhost:57496/api/Account/Register',
                    { email: '', password: '', confirmPassword: ''})
                .respond(200);

            scope = $rootScope.$new();
            ctrl = $controller('CreateAccountController', { $scope: scope });
        }));

        it('should register the new user', function () {
            expect(ctrl.isRegistered).toBe(false);

            $httpBackend.flush();

            expect(ctrl.isRegistered).toBe(true);
        });


        //it('should set the default value of orderProp model', function () {
        //    expect(scope.orderProp).toBe('age');
        //});
    });
});

/*
describe('PhoneCat controllers', function () {

    describe('PhoneListCtrl', function () {
        var scope, ctrl, $httpBackend;

        // Load our app module definition before each test.
        beforeEach(module('phonecatApp'));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service in order to avoid a name conflict.
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').
                respond([{ name: 'Nexus S' }, { name: 'Motorola DROID' }]);

            scope = $rootScope.$new();
            ctrl = $controller('PhoneListCtrl', { $scope: scope });
        }));

        it('should create "phones" model with 2 phones fetched from xhr', function () {
            expect(scope.phones).toBeUndefined();
            $httpBackend.flush();

            expect(scope.phones).toEqual([{ name: 'Nexus S' },
                                         { name: 'Motorola DROID' }]);
        });

        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('age');
        });
    });
});
*/