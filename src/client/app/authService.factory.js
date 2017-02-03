(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    // authService.$inject = [];

    /* @ngInject */
    function authService($http) {
        var service = {
            auth: false,
            someFunction: someFunction
        };

        return service;

        function someFunction(test) {
            //Do something
            if(test === 'true') {
              service.auth = true;
          } else {
              service.auth = false;
          }
        }
    }
})();
