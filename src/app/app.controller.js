'use strict';

angular.module('newzak')

.controller('AppCtrl', function ($rootScope, $scope, conf) {

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.pageTitle = (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) ? toState.data.pageTitle + ' | ' + conf.pageTitle : conf.pageTitle;
    });
});
