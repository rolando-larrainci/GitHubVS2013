/// <reference path="../../libs/angular.js" />
/// <reference path="../../libs/angular-mocks.js" />
/// <reference path="../../libs/angular-route.js" />
/// <reference path="createAccountController.js" />
/// <reference path="../../app.js" />
/// <reference path="../services/accountsService.js" />


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
    beforeEach(module('CorsIntegration.Controllers'));
    beforeEach(module('CorsIntegration.Services'));
    beforeEach(module('CorsIntegration'));

    describe('CreateAccountCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            //%40-->@ encode
            $httpBackend.expectPOST(
                    'http://localhost:57496/api/Account/Register',
                    'email=user%40user.com&password=A123456z!&confirmPassword=A123456z!')
                .respond(200);

            scope = $rootScope.$new();
            ctrl = $controller('CreateAccountController', { $scope: scope });
        }));

        it('should register the new user', function () {
            expect(scope.isRegistered).toBe(undefined);
            scope.registerUserData = {
                email: 'user@user.com',
                password: 'A123456z!',
                confirmPassword: 'A123456z!'
            };
            scope.registerUser();
            $httpBackend.flush();
            expect(scope.isRegistered).toBe(true);
        });


        //it('should set the default value of orderProp model', function () {
        //    expect(scope.orderProp).toBe('age');
        //});
    });
});