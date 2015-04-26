'use strict';

angular.module('newzak')

.controller('AppCtrl', function ($rootScope, $scope) {

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.pageTitle = (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) ? toState.data.pageTitle + ' | newzak' : 'newzak';
    });
});
