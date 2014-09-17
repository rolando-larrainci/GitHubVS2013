(function () {
    'use strict';

    // Create the module and define its dependencies.
    var app = angular.module(appControllersId);

    app.controller(mainControllerId, ['$scope', function ($scope) {
        $scope.error = false;
    }])

})();