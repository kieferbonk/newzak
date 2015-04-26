'use strict';

angular.module('newzak.list')

.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		views: {
			'main': {
				controller: 'ListCtrl',
				templateUrl: 'list/list.tpl.html'
			}
		}
	});
});
