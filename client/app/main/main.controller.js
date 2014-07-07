'use strict';

angular.module('yoMinesweeperApp')
  .controller('MainCtrl', function ($scope, $http, $modal, $log) {
    $scope.game = Game.create();
    $scope.gameOver = "app/main/gameOver.html";

    $scope.reveal = function(spot) {
      if ($scope.game.revealSpot(spot)) {
      	var gameOverModal = $modal.open({
	        templateUrl: $scope.gameOver,
	        controller: GameOverCtrl,
	        resolve: {
	          won: function () {
	            return $scope.game.won;
	          }
	        }
     		});

	     	gameOverModal.result.then(function() {
	        $scope.game.reset();
	     	}, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	     	});
  		}
    }
  });


var GameOverCtrl = function ($scope, $modalInstance, won) {
	$scope.user = {name: 'guest', last: 'visitor'};
  $scope.message = "You lose. \nPlease try again.";
  if (won) {
    $scope.message = "You win! \nGreat game.";
  }

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};