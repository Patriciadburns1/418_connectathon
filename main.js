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

      //   var img = $('<img src="images/earth_icon.png" alt="">');
      //   img.appendTo(hole);

      hole.appendTo(cellContainer);

      gameBoard.append(cellContainer);
    }
  }
}

function addGameHandlers() {
    $(".game-board").on("click", ".cell-container", handleColumnClick);
}

var coordinateColumn = null;
var currentSymbol = null;

function handleColumnClick() {
    getCellIndex();
    getCurrentSymbol();
    updateArrayAtPosition();
}

function getCellIndex(){
    // coordinateRow = $(this).find(".cell-container").attr("row");
    coordinateColumn = $(this).find(".cell-container").attr("column");
    return coordinateColumn;
}

function getCurrentSymbol() {
    currentSymbol = $(this).find(".cell-container").attr("src");
    return currentSymbol;
}

function updateArrayAtPosition(coordinateColumn, currentSymbol){
    if (gameBoardArray[2][coordinateColumn] === 0) {
       gameBoardArray[2].splice(coordinateColumn, 1, currentSymbol)
       console.log("Filled bottom row in column");
      } else if (gameBoardArray[1][coordinateColumn] === 0) {
        multiArray[1].splice(coordinateColumn, 1, currentSymbol) 
        console.log("Filled middle row in column");
      } else if (gameBoardArray[0][coordinateColumn] === 0) {
        gameBoardArray[0].splice(coordinateColumn, 1, currentSymbol)
        console.log("Filled top row in column");
      } else {
        console.log("Column is filled");
      }
    return gameBoardArray;
}
