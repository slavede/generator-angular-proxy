angular.module( 'core')
	.controller('helloWorldNested1Ctrl', ['$scope', function($scope) {
		'use strict';
		$scope.name = 'Nested View 1';
	}]);