(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    //LoginController.$inject = [''];

    /* @ngInject */
    function LoginController(authService, $window, $state) {
        var vm = this;
        vm.openLogin = openLogin;
        vm.login = login;
        vm.signup = signup;

        function openLogin() {
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        }

        function login() {
            vm.signupName = '';
            vm.signupEmail = '';
            vm.signupPassword = '';
            var email = '';
            var password = '';
            email = $window.localStorage.getItem('email');
            password = $window.localStorage.getItem('password');
            if(email === vm.loginEmail && password === vm.loginPassword) {
                authService.someFunction('true');
                $state.go('about');
            }
        }

        function signup() {
            $window.localStorage.setItem('name', vm.signupName);
            $window.localStorage.setItem('email', vm.signupEmail);
            $window.localStorage.setItem('password', vm.signupPassword);
            openLogin();
        }
    }
})();
