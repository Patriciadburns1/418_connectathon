$(document).ready(startConnectFour);

var gameBoardArray = [
  [1, 1, 1, 1, 2, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

var vectors = [
  { y1: 0, x1: -1, y2: 0, x2: 1 }, //left and right
  { y1: 1, x1: 0, y2: -1, x2: 0 }, //up and down
  { y1: 1, x1: 1, y2: -1, x2: -1 }, //down right and up left
  { y1: 1, x1: -1, y2: -1, x2: 1 } //down left and up right
];

var player = 1;

function togglePlayer(player) {
    player = 1 - player;
    return player;
}

var symbols = [
    "images/earth_icon.jpg",
    "images/mars_icon.jpg",
]

checkForWin(0, 3, 1);

function startConnectFour() {
  console.log("start Connect Four");
  createCells(7, 7);
  addGameHandlers();
}

function createCells(row, col) {
  var gameBoard = $(".game-board");
  for (var i = 0; i < row; i++) {
    for (var k = 0; k < col; k++) {
      var cellContainer = $("<div>", {
        class: "cell-container",
        attr: {
          row: i,
          col: k
        }
      });

      var hole = $("<div>", {
        class: "hole"
      });

        // var img = $('<img src="images/earth_icon.png" alt="">');
        // img.appendTo(hole);

      hole.appendTo(cellContainer);

      gameBoard.append(cellContainer);
    }
  }
}

function addGameHandlers() {
  $(".game-board").on("click", ".cell-container", handleColumnClick);
}

var coordinateColumn = null;
var coordinateRow = null;
var currentSymbol = null;


function getCellIndex() {
  // coordinateRow = $(this).find(".cell-container").attr("row");
  coordinateColumn = $(this)
    .find(".cell-container")
    .attr("column");
  return coordinateColumn;
}

function getCurrentSymbol() {
  currentSymbol = $(this)
    .find(".cell-container")
    .attr("src");
  return currentSymbol;
}

function handleColumnClick() {
    coordinateColumn = getColumnIndex();
    currentSymbol = getCurrentSymbol();
    coordinateRow = getRowIndex(coordinateColumn);
    updateArrayAtPosition(coordinateRow, coordinateColumn, currentSymbol);
}

function getColumnIndex(){
    return $(this).find(".cell-container").attr("column");
}

function getCurrentSymbol() {
    return $(this).find(".cell-container").attr("src");
}

function getRowIndex(coordinateColumn){
    var arraylength = gameBoardArray.length;
    for (var rowChoice = arraylength-1; rowChoice >= 0; rowChoice--) {
        if (gameBoardArray[rowChoice][coordinateColumn] === 0) {
            return rowChoice;
        }
    }
    return -1;
}

function updateArrayAtPosition(coordinateRow, coordinateColumn, currentSymbol) {
    gameBoardArray[coordinateRow].splice(coordinateColumn, 1, currentSymbol) 
    return gameBoardArray;
}

function checkForWin(y, x, symbol) {
  for (var majorDirection in vectors) {
    var counter = 1;
    var set = vectors[majorDirection];
    var startY1 = y + set["y1"];
    var startX1 = x + set["x1"];
    var startY2 = y + set["y2"];
    var startX2 = x + set["x2"];

    //check to see if player1/ player2 or 0
    //player1 was defined then an if statement to proceed
    //only increment counter if it matches current player piece
    // we need to check if on same axis, if not on same axis and the symbol isnt the same
    //we switch to a new axis
    while (
      gameBoardArray[startY1] &&
      gameBoardArray[startY1][startX1] === symbol
    ) {
      counter++;
      startY1 += set["y1"];
      startX1 += set["x1"];
    }

    while (
      gameBoardArray[startY2] &&
      gameBoardArray[startY2][startX2] === symbol
    ) {
      counter++;
      startY2 += set["y2"];
      startX2 += set["x2"];
    }

    if (counter >= 4) {
      console.log("YOU WIN!");
      return true;
    }
  }
  console.log("no match!");
  return false;
}

// if(checkForWin(0,3,1) === true) {
//     //display modal
// } else {
//     // click function enabled continue playing game
// }
