'use strict';

describe( 'helloworld-nested1 unit test', function () {

	var $scope, controller;

    // load the controller's module
    beforeEach( module( 'core' ) );

    beforeEach(inject(function($controller, $rootScope) {
    	$scope = $rootScope.$new();

    	controller = $controller('helloWorldNested1Ctrl', {
            $scope: $scope
        });

        $scope.$apply();
    }));

    it ('should have initialized scope', function() {
    	expect($scope.name).toBe('Nested View 1');
    });
});