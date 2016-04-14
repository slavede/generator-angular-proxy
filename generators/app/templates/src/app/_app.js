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
    }])
    <% } else { %>
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider.otherwise('/hello-world');
        $locationProvider.html5Mode(true);
        // $httpProvider.interceptors.push('authInterceptor');
    }])
    <% } %>
    // this is just one of the suggestions how to do authorization
    // .factory('authInterceptor', ['$rootScope', '$q', '$cookieStore', '$location', function ($rootScope, $q, $cookieStore, $location) {
    //   return {
    //     // Add authorization token to headers
    //     request: function (config) {
    //       config.headers = config.headers || {};
    //       if ($cookieStore.get('token')) {
    //         config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
    //       }
    //       return config;
    //     },

    //     // Intercept 401s and redirect you to login
    //     responseError: function(response) {
    //       if(response.status === 401) {
    //         $location.path('/login');
    //         // remove any stale tokens
    //         $cookieStore.remove('token');
    //         return $q.reject(response);
    //       }
    //       else {
    //         return $q.reject(response);
    //       }
    //     }
    //   };
    // }])

    // this is just one of the suggestions how to do authorization
    .run(['$rootScope', '$location', function ($rootScope, $location) {
    // Redirect to login if route requires auth and you're not logged in
        // $rootScope.$on('$stateChangeStart', function (event, next) {
        //     Auth.isLoggedInAsync(function(loggedIn) {
        //         if (next.authenticate && !loggedIn) {
        //             event.preventDefault();
        //             $location.path('/login');
        //         }
        //     });
        // });
    }]);
