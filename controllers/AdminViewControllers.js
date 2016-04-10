/**
 *
 * Created by enigma on 2016-03-04.
 *
 * This file is a collection of view controllers for admin pages.
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
                        controllerAs: 'inventory'
                    })
                    .when('/profile', {
                        templateUrl: baseUrl + 'views/admin/profile.html',
                        controller: 'AdminProfileViewController',
                        controllerAs: 'profile'
                    });

                $locationProvider.html5Mode(true);
            }])
        .run(function($rootScope, $location) {
            $location.path( "/home" );
        })
        //AdminMainViewController is the one controls the demux page.
        .controller('AdminMainViewController', ['$route', '$routeParams', '$location',
            function($route, $routeParams, $location) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }])
        //AdminHomeViewController is the one controls the home page.
        .controller('AdminHomeViewController', ['$routeParams', function($routeParams) {
            this.name = "AdminHomeViewController";
            this.params = $routeParams;
        }])
        //AdminHomeViewController is the one controls the inventory page.
        .controller('AdminInventoryViewController', ['$routeParams', '$scope', '$timeout', function($routeParams, $scope, $timeout) {
            this.name = "AdminInventoryViewController";
            this.params = $routeParams;

            this.beerList = beers.map(function(a){return new Drink(a)});
            this.wineList = [];
            this.spiritList = [];

            //currentBeverageList is a pointer which points to the current list that should be shown.
            //It may be beerList, wineList or spiritList.
            this.currentBeverageList = this.beerList;
            this.baseUrl = baseUrl;

            //This is the one to filter out all beverages out of stock.
            //We only show drinks with count greater than 0
            $scope.countFilter = function(drink) {
                return drink.count > 0;
            }
        }])
        //AdminHomeViewController is the one controls the profile page.
        .controller('AdminProfileViewController', ['$routeParams', '$scope', '$timeout', function($routeParams, $scope, $timeout) {
            this.name = "AdminProfileViewController";
            this.params = $routeParams;

            this.users = users;

            //This is the modal controller
            //The data will be passed by events and shown in the modal
            $('#userModal').on('show.bs.modal', function (event) {
                $timeout(function(){
                    var row = $(event.relatedTarget)
                    var user = row.data('user')

                    $('#userModalTitle').text(user.firstName + " " + user.lastName);
                    $('#userModalUserName').text(user.userName);
                });
            })
        }])

})(window.angular);
