$(document).ready(startConnectFour);

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
