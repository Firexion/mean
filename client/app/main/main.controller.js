'use strict';

angular.module('yoMinesweeperApp')
  .controller('MainCtrl', function ($scope, $http, $modal, $log) {
    $scope.game = Game.create();
    //$scope.minefield = $scope.game.minefield;
    $scope.reveal = function(spot) {
      if ($scope.game.revealSpot(spot)) {
      	var gameOverModal = $modal.open({
        templateUrl: 'gameOver.jade',
        controller: GameOverCtrl,
        resolve: {
          winner: function () {
          	console.log("Test");
            return $scope.game.winner;
          }
        }
     });

     gameOverModal.result.then(function() {
       //$scope.game.restart();
     }, function () {
         $log.info('Modal dismissed at: ' + new Date());
     });
      }
    }

  });


var GameOverCtrl = function ($scope, $modalInstance, winner) {
  if (winner) {
    $scope.winner = "You win! \nGreat game.";
  } else {
    $scope.winner = "You lose. \nPlease try again.";
  }


  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};