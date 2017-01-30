(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    //HomeController.$inject = [''];

    /* @ngInject */
    function HomeController(authService) {
        var vm = this;
    }
})();
