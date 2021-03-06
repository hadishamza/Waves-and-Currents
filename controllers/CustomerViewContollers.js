/**
 * Created by Jinghan on 1/3/16.
 *
 * This file is a collection of view controllers for user pages.
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
        //load the first page as home
        .run(function($rootScope, $location) {
            $location.path( "/home" );
        })
        //MainViewController controls the demux page
        .controller('MainViewController', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }])
        //MainViewController controls the home page
        .controller('CustomerHomeViewController', ['$routeParams', function($routeParams) {
            this.name = "CustomerHomeViewController";
            this.params = $routeParams;
        }])
        //MainViewController controls the menu page
        .controller('CustomerMenuViewController', ['$routeParams', '$scope', '$timeout', function($routeParams, $scope, $timeout) {
            this.name = "CustomerMenuViewController";
            this.params = $routeParams;

            this.beerList = beers.map(function(a){return new Drink(a)});
            this.wineList = [];
            this.spiritList = [];

            this.currentBeverageList = this.beerList;
            this.baseUrl = baseUrl;

            //beverageDetailModal is the one prompted out after user clicks one of the beverages shown
            $('#beverageDetailModal').on('show.bs.modal', function (event) {
                $timeout(function(){
                    var tile = $(event.relatedTarget)
                    var beer = tile.data('beer') // Extract info from data-* attributes

                    currentUser = new Customer("First", "Last", "001", "enkov", "enkov")
                    currentUser.getDrinkData(beer, function(success, payload){
                        $("#beverageAlcoholLevel").text(payload["alkoholhalt"]);
                        $("#beverageYear").text(payload["argang"]);
                        $("#beveragePackaging").text(payload["forpackning"]);
                        $("#beverageDistributor").text(payload["leverantor"]);
                        $("#beverageProducer").text(payload["producent"]);
                        $("#beverageSampling").text(payload["saljstart"]);
                        $("#beverageSelection").text(payload["sortiment"]);
                        $("#beverageOriginCountry").text(payload["ursprunglandnamn"]);
                        $("#beverageGroup").text(payload["varugrupp"]);
                        $("#beverageVolume").text(payload["volymiml"]);
                    })

                    var modal = $(this);
                    $('#beverageDetailLabelName').text(beer.name);
                    $('#beverageAvailableAmount').text(beer.count + " left in stock.");
                    $('#beverageDetailLabelPrice').text("KR " + beer.price);
                });
            })

            //Only drinks with count greater than 0 is shown
            $scope.countFilter = function(drink) {
                return drink.count > 0;
            }

            //stateStack is used for storing states during undo and redo
            $scope.stateStack = [];

            //Observe the stateStack and update the view when necessary
            setInterval(function() {
                $scope.stateStack = stateStack[stateStack.length - 1];
                $scope.$apply();
            }, 10);

            $scope.removeDrinkFromTray = function(id) {
                removeDrinkFromTray(id);
            };
        }]);
})(window.angular);
