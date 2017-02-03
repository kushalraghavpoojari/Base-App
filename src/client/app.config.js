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
                controllerAs: 'homeVm',
                templateUrl: '/src/client/app/home/home.html'
            })
            .state('about', {
                url: '/',
                controller: 'PortfolioController',
                controllerAs: 'aboutVm',
                templateUrl: '/src/client/app/about/about.html'
            })
            .state('login', {
                url: '/',
                controller: 'LoginController',
                controllerAs: 'loginVm',
                templateUrl: '/src/client/app/login/login.html'
            });
    }
})();
