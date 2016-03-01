/**
 * Created by Jinghan on 1/3/16.
 */
(function(angular) {
    'use strict';
    angular.module('mainApp', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/home', {
                        templateUrl: '/Waves-and-Currents/views/customer/welcome.html',
                        controller: 'CustomerHomeViewController',
                        controllerAs: 'welcome'
                    })
                    .when('/menu', {
                        templateUrl: '/Waves-and-Currents/views/customer/menu.html',
                        controller: 'CustomerMenuViewController',
                        controllerAs: 'menu'
                    });

                $locationProvider.html5Mode(true);
            }])
        .run(function($rootScope, $location) {
            $location.path( "/home" );
        })
        .controller('MainViewController', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }])
        .controller('CustomerHomeViewController', ['$routeParams', function($routeParams) {
            this.name = "CustomerHomeViewController";
            this.params = $routeParams;
        }])
        .controller('CustomerMenuViewController', ['$routeParams', function($routeParams) {
            this.name = "CustomerMenuViewController";
            this.params = $routeParams;

            console.log(beers);
            this.beerList = beers.map(function(a){return new Drink(a)});
            this.wineList = [];
            this.spiritList = [];

            this.currentBeverageList = this.beerList;
        }]);
})(window.angular);
