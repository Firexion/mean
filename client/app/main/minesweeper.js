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
    for (var i = 0; i < MINES; i++) {
      for(var j = 0; j < MINES; j++) {
        var spot = this.minefield.getSpot(i, j);

        if(spot.isRevealed && spot.mine === true) {
          this.winner = false;
          return true;
        }

        if(spot.isRevealed && spot.mine !== true) {
          return false;
        }
      }
    }
    this.winner = true;
    return true;
  },
  revealSpot: function(spot) {
    spot.reveal();
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
      this.placeRandomMine();
    }
  },
  placeRandomMine: function() {
    var row = Math.floor(Math.random() * WIDTH);
    var column = Math.floor(Math.random() * WIDTH);
    var spot = this.getSpot(row, column);
    spot.mine = true;
  },
  getSpot: function(row, column) {
    var rows = this.rows[row];
    console.log("row: " + row + "/ column: " + column);
    console.log(rows.spots[column]);
    return rows.spots[column];
  },
  calculateAllNumbers: function() {
    for (var i = 0; i < MINES; i++) {
      for (var j = 0; j < MINES; j++) {
        var spot = this.getSpot(i, j);
        spot.setNumMinesNear(this);
      }
    }
  }
};

var Spot = {
  initialize: function(x, y) {
    this.xCoord = x;
    this.yCoord = y;
    this.isRevealed = false;
    this.mine = false;
  },
  create: function(x, y) {
    var spot = Object.create(Spot);
    spot.initialize(x, y);
    return spot;
  },
  setNumMinesNear: function(minefield) {
    if (this.mine === true) {
      return;
    }

    var numMines = 0;
    for (var x = Math.max(0, this.xCoord - 1); x <= Math.min(WIDTH - 1, this.xCoord + 1); x++) {
      for (var y = Math.max(0, this.yCoord - 1); y <= Math.min(WIDTH - 1, this.yCoord + 1); y++) {
        if (minefield.rows[x].spots[y].mine === true) {
          numMines++;
        }
      }
    }
    return numMines;
  },
  reveal: function() {
    this.isRevealed = true;

  }
};