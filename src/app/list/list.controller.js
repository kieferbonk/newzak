'use strict';

angular.module('newzak.list')

.controller('ListCtrl', function ($scope, feedService) {
	$scope.list = feedService.getMasterList();
});
