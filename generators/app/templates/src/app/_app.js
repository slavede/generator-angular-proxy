'use strict';

angular.module('<%= name %>', [

    'ui.router',
    'ui.bootstrap',

    // list your modules here
    'core'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
  		function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    // $urlRouterProvider
    //   .otherwise('/default');

    $locationProvider.html5Mode(true);
    // $httpProvider.interceptors.push('authInterceptor');
  }])

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

  .run(['$rootScope', '$location', function ($rootScope, $location) {
    // Redirect to login if route requires auth and you're not logged in
    // $rootScope.$on('$stateChangeStart', function (event, next) {
    //   Auth.isLoggedInAsync(function(loggedIn) {
    //     if (next.authenticate && !loggedIn) {
    //       event.preventDefault();
    //       $location.path('/login');
    //     }
    //   });
    // });
  }]);
