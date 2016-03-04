/**
 * Created by Jinghan on 1/3/16.
 */
var baseUrl;
(function(angular) {
    'use strict';
    angular.module('mainApp', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {

                baseUrl = $(location).attr("pathname").replace("views/customer/main.html", "");

                $routeProvider
                    .when('/home', {
                        templateUrl: baseUrl + 'views/customer/welcome.html',
                        controller: 'CustomerHomeViewController',
                        controllerAs: 'welcome'
                    })
                    .when('/menu', {
                        templateUrl: baseUrl + 'views/customer/menu.html',
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
        .controller('CustomerMenuViewController', ['$routeParams', '$scope', '$timeout', function($routeParams, $scope, $timeout) {
            this.name = "CustomerMenuViewController";
            this.params = $routeParams;

            this.beerList = beers.map(function(a){return new Drink(a)});
            this.wineList = [];
            this.spiritList = [];

            this.currentBeverageList = this.beerList;
            this.baseUrl = baseUrl;

            $('#beverageDetailModal').on('show.bs.modal', function (event) {
                $timeout(function(){
                    var tile = $(event.relatedTarget)
                    var beer = tile.data('beer') // Extract info from data-* attributes
                    var modal = $(this);
                    console.log(beer);
                    $('#beverageDetailLabelName').text(beer.name);
                    $('#beverageAvailableAmount').text(beer.count + " left in stock.");
                    $('#beverageDetailLabelPrice').text("KR " + beer.price);
                });
            })
        }]);
})(window.angular);
