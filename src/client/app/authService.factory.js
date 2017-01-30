(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    // authService.$inject = [];

    /* @ngInject */
    function authService($http) {
        var service = {
            someFunction: someFunction
        };

        return service;

        function someFunction() {
            //Do something
        }
    }
})();
