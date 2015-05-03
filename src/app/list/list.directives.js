'use strict';

angular.module('newzak.list')

.directive('buttonToggleCard', function () {
	return {
		restrict: 'E',
		replace: true,
		link: function (scope, el, attrs) {
			scope.contentVisible = false;
			scope.icon = '+';

			el.bind('click', function (e) {
				scope.icon = scope.contentVisible ? '-' : '+';
				scope.$apply();
			});
		},
		template: '<div class="button__toggle-card" ng-click="contentVisible = !contentVisible">{{icon}}</div>'
	}
})
;
