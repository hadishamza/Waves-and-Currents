/**
 * Created by Jinghan on 4/3/16.
 */
var app = angular.module('mainApp', []);
app.controller('CustomerMenuViewController', function($scope, $timeout){
    $('#beverageDetailModal').on('show.bs.modal', function (e) {
        $timeout(function(){
            var tile = $(event.relatedTarget)
            var beer = tile.data('beer') // Extract info from data-* attributes
            var modal = $(this);
            modal.find('.modal-title').text(beer.name);
        });
    })
});