var WIDTH = 9;
var MINES = 10;

var Game = {
  initialize: function() {
    this.minefield = Minefield.create();
  },
  create: function() {
    var game = Object.create(Game);
    game.initialize();
    return game;
  },
  isGameOver: function() {
    var unrevealed = false;
    for (var i = 0; i < WIDTH; i++) {
      for(var j = 0; j < WIDTH; j++) {
        var spot = this.minefield.getSpot(i, j);
        if(spot.isRevealed) {
          console.log(spot);
        }
        if(spot.isRevealed && spot.mine) {
          this.winner = false;
          return true;
        }

        if(!spot.isRevealed && !spot.mine) {
          unrevealed = true;
        }
      }
    }
    if (unrevealed) {
      return false;
    }
    this.winner = true;
    return true;
  },
  revealSpot: function(spot) {
    spot.reveal(this.minefield);
    return this.isGameOver();
  }
};

var Minefield = {
  rows: [],
  initialize: function() {
    for (var i = 0; i < WIDTH; i++) {
      var row = {};
      row.spots = [];

      for (var j = 0; j < WIDTH; j++) {
        var spot = Spot.create(i,j);
        row.spots.push(spot);
      }

      this.rows.push(row);
    }

    this.placeRandomMines();
    this.calculateAllNumbers();

  },
  create: function() {
    var mineField = Object.create(Minefield);
    mineField.initialize();
    return mineField;
  },
  placeRandomMines: function() {
    var minesPlaced = 0;
    while (minesPlaced < MINES) {
      if (this.placeRandomMine()) {
        minesPlaced++;
      }
    }
  },
  placeRandomMine: function() {
    var row = Math.floor(Math.random() * WIDTH);
    var column = Math.floor(Math.random() * WIDTH);
    var spot = this.getSpot(row, column);
    if (!spot.mine) {
      spot.mine = true;
      return true;
    }
    return false;
  },
  getSpot: function(row, column) {
    var thisRow = this.rows[row];
    return thisRow.spots[column];
  },
  calculateAllNumbers: function() {
    for (var i = 0; i < WIDTH; i++) {
      for (var j = 0; j < WIDTH; j++) {
        var spot = this.getSpot(i, j);
        spot.setNumMinesNear(this);
      }
    }
  }
};

var Spot = {
  neighbors: [],
  initialize: function(x, y) {
    this.xCoord = x;
    this.yCoord = y;
    this.isRevealed = false;
    this.mine = false;
    this.minesNearby = 0;
    this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/covered.png";
  },
  create: function(x, y) {
    var spot = Object.create(Spot);
    spot.initialize(x, y);
    return spot;
  },
  setNumMinesNear: function(minefield) {
    if (this.mine) {
      return;
    }
    this.neighbors = [];
    for (var x = Math.max(0, this.xCoord - 1); x <= Math.min(WIDTH - 1, this.xCoord + 1); x++) {
      for (var y = Math.max(0, this.yCoord - 1); y <= Math.min(WIDTH - 1, this.yCoord + 1); y++) {
        var checkSpot = minefield.getSpot(x, y);
        if (checkSpot !== this) {          
          this.neighbors.push({x: x, y: y});
          if (checkSpot.mine === true) {
            this.minesNearby++;
          }
        }
      }
    }
  },
  reveal: function(minefield) {
    this.isRevealed = true;
    if (this.mine === true) {
      this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/mine.png";
    } else if (this.minesNearby > 0) {
      switch(this.minesNearby) {
        case 1:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-1.png";
          break;
        case 2:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-2.png";
          break;
        case 3:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-3.png";
          break;
        case 4:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-4.png";
          break;
        case 5:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-5.png";
          break;
        case 6:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-6.png";
          break;
        case 7:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-7.png";
          break;
        case 8:
          this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/number-8.png";
          break;
      }
    } else {
      this.image = "http://luis-perez.s3-us-west-2.amazonaws.com/angularjs-minesweeper-game/empty.png";
      this.revealNeighbors(minefield);
    }
  },
  revealNeighbors: function(minefield) {
    for (var i = 0; i < this.neighbors.length; i++) {
      var x = this.neighbors[i].x;
      var y = this.neighbors[i].y;
      var neighbor = minefield.getSpot(x, y);
      if (!neighbor.isRevealed) {
        neighbor.reveal(minefield);
      }
    }
  }
};