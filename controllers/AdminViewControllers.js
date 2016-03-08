/**
 *
 * Created by enigma on 2016-03-04.
 *
 */

var baseUrl;
(function(angular) {
    'use strict';
    angular.module('mainAppAdmin', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {

                baseUrl = $(location).attr("pathname").replace("views/admin/main.html", "");
                console.log(baseUrl)
                $routeProvider
                    .when('/home', {
                        templateUrl: baseUrl + 'views/admin/welcome.html',
                        controller: 'AdminHomeViewController',
                        controllerAs: 'welcome'
                    })
                    .when('/inventory', {
                        templateUrl: baseUrl + 'views/admin/inventory.html',
                        controller: 'AdminInventoryViewController',
                        controllerAs: 'menu'
                    });

                $locationProvider.html5Mode(true);
            }])
        .run(function($rootScope, $location) {
            $location.path( "/home" );
        })
        .controller('AdminMainViewController', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }])
        .controller('AdminHomeViewController', ['$routeParams', function($routeParams) {
            this.name = "CustomerHomeViewController";
            this.params = $routeParams;
        }])
        .controller('AdminInventoryViewController', ['$routeParams', '$scope', '$timeout', function($routeParams, $scope, $timeout) {
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

                    currentUser = new Customer("First", "Last", "001", "enkov", "enkov")
                    currentUser.getDrinkData(beer, function(success, payload){
                        $("#beverageAlcoholLevel").val(payload["alkoholhalt"]);
                        $("#beverageYear").val(payload["argang"]);
                        $("#beveragePackaging").val(payload["forpackning"]);
                        $("#beverageDistributor").val(payload["leverantor"]);
                        $("#beverageProducer").val(payload["producent"]);
                        $("#beverageSampling").val(payload["saljstart"]);
                        $("#beverageSelection").val(payload["sortiment"]);
                        $("#beverageOriginCountry").val(payload["ursprunglandnamn"]);
                        $("#beverageGroup").val(payload["varugrupp"]);
                        $("#beverageVolume").val(payload["volymiml"]);
                    })

                    var modal = $(this);
                    $('#beverageDetailLabelName').val(beer.name);
                    $('#beverageAvailableAmount').val(beer.count);
                    $('#beverageDetailLabelPrice').val(beer.price);
                });
            })

            $scope.countFilter = function(drink) {
                return drink.count > 0;
            }
        }]);
})(window.angular);
