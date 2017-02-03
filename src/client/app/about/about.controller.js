(function() {
    'use strict';

    angular
        .module('app')
        .controller('PortfolioController', PortfolioController);

    //PortfolioController.$inject = [''];

    /* @ngInject */
    function PortfolioController(authService) {
        var vm = this;
        vm.auth = authService.auth;
    }
})();
