$(document).ready(startConnectFour);

var gameBoardArray =
    [[0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]];

var vectors = [
  { y1: 0, x1: -1, y2: 0, x2: 1 }, //left and right
  { y1: 1, x1: 0, y2: -1, x2: 0 }, //up and down
  { y1: 1, x1: 1, y2: -1, x2: -1 }, //down right and up left
  { y1: 1, x1: -1, y2: -1, x2: 1 } //down left and up right
];

var player = 0;
var symbols = [];

function togglePlayer() {
    player = 1 - player;
}

checkForWin(0, 3, 1);

function startConnectFour() {
  console.log("start Connect Four");
 // createCells(7, 7);
  addGameHandlers();
  clickStartButton();
  addPlanetHandler();  
}

function assignPlayer(){
    var symbol=$(this).attr("src"); 
    if( player===0){
        symbols[0]=symbol;
    }   
    else{
        symbols[1]=symbol; 
    }
   togglePlayer(); 
}

function addPlanetHandler(){
    $(".imagesDiv").on("click","img", assignPlayer )
}

function clickStartButton(){
    $("#startButton").on("click",closeModalatStart )
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
    coordinateColumn = getColumnIndex($(this));
    currentSymbol = getCurrentSymbol($(this));
    coordinateRow = getRowIndex(coordinateColumn);
    togglePlayerSymbols();
    updateArrayAtPosition(coordinateRow, coordinateColumn, currentSymbol);
}

function getColumnIndex(cellContainer){
    return cellContainer.attr("col");
}

function getCurrentSymbol(cellContainer) {
    return $(cellContainer).find("img").attr("src");
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

function togglePlayerSymbols() {
    if (player === 0) {
        currentSymbol = symbols[0];
    } else {
        currentSymbol = symbols[1];
    }
    togglePlayer();
}

function updateArrayAtPosition(coordinateRow, coordinateColumn) {
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
//this upon reset 
function displayModal() {
    document.querySelector("#modalShadow").style.display = "block"; 
}

function closeModalatStart() {
    document.querySelector("#modalShadow").style.display = "none";
    createCells(7, 7);
}