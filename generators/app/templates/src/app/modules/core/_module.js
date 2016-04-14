'use strict';

<% if (useRouter) { %>
angular.module( 'core', [
        <% if (useAngularResource) { %>
        'ngResource',
        <% } %>
        <% if (useAngularCookies) { %>
        'ngCookies',
        <% } %>
        <% if (useAngularSanitize) { %>
        'ngSanitize',
        <% }%>

        'ui.router',
    ] )
    .config( ['$stateProvider', function ( $stateProvider ) {
        // state has to have prefix of the module name (because of possible override with other states)
        $stateProvider
            .state( 'core-helloworld', {
                url: '/hello-world',
                templateUrl: 'app/modules/core/templates/hello_world.html',
                controller: 'helloWorldCtrl'
            } )
            .state('core-helloworld.nested1', {
                url : '/nested1',
                templateUrl : 'app/modules/core/templates/hello_world/nested1.html',
                controller : 'helloWorldNested1Ctrl'
            })
            .state('core-helloworld.nested2', {
                url : '/nested2',
                templateUrl : 'app/modules/core/templates/hello_world/nested2.html',
                controller : 'helloWorldNested2Ctrl'
            });
    }] );

<% } else { %>
angular.module( 'core', [
    <% if (useAngularResource) { %>
    'ngResource',
    <% } %>
    <% if (useAngularCookies) { %>
    'ngCookies',
    <% } %>
    <% if (useAngularSanitize) { %>
    'ngSanitize',
    <% }%>
    'ngRoute'
    ] )
    .config( ['$routeProvider', function ( $routeProvider ) {
        // state has to have prefix of the module name (because of possible override with other states)
        $routeProvider
            .when( '/hello-world', {
                templateUrl: 'app/modules/core/templates/hello_world.html',
                controller: 'helloWorldCtrl'
            } )
            .when('/hello-world/nested1', {
                templateUrl : 'app/modules/core/templates/hello_world/nested1.html',
                controller : 'helloWorldNested1Ctrl'
            })
            .when('/hello-world/nested2', {
                templateUrl : 'app/modules/core/templates/hello_world/nested2.html',
                controller : 'helloWorldNested2Ctrl'
            });
    }] );
<% } %>