angular.module( 'core')
	.controller('helloWorldCtrl', ['$scope', function($scope) {
		'use strict';
		$scope.time = new Date();
	}]);