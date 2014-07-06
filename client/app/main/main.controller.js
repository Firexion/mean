'use strict';

angular.module('yoMinesweeperApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.game = Game.create();
    //$scope.minefield = $scope.game.minefield;


  });