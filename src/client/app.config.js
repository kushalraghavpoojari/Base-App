(function() {

    'use strict';

    angular.module('app').config(configuration);

    configuration.inject = ['$stateProvider', '$httpProvider', '$locationProvider'];

    function configuration($stateProvider, $httpProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: '/src/client/app/home/home.html'
            });
    }
})();
