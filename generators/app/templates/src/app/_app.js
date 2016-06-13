'use strict';

angular.module('<%= name %>', [
    <% if (useAngularResource) { %> 'ngResource', <% } %>
    <% if (useAngularCookies) { %> 'ngCookies', <% } %>
    <% if (useAngularSanitize) { %> 'ngSanitize', <% }%>
    <% if (useRouter) {%> 'ui.router', <% } else { %> 'ngRoute', <% } %>
    <% if (useBootstrap) {%> 'ui.bootstrap', <% } %>
    // list your modules here
    'core'
])
    <% if (useRouter) { %>
    .config(['$locationProvider', '$urlRouterProvider', function ($locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/hello-world');
        $locationProvider.html5Mode(true);
        // $httpProvider.interceptors.push('authInterceptor');
    }]);
    <% } else { %>
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider.otherwise('/hello-world');
        $locationProvider.html5Mode(true);
    }]);
    <% } %>

