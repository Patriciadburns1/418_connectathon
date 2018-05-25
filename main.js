$(document).ready(startConnectFour);

var gameBoardArray = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
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

var crossVector = [
  { y1: 0, x1: -1, y2: 0, x2: 1 }, //left and right
  { y1: 1, x1: 0, y2: -1, x2: 0 } //up and down
];

var LVector = [{ y1: 0, x1: 1, y2: -1, x2: 0 }];

var player = 0;
var symbols = [];

var powerUps = {
  moon: 0,
  sun: 0
};

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

function assignPlayer() {
  if (symbols.length >= 2) {
    return;
  }

  if ($(event.target).hasClass('ifImageChosen')) {
    return;
  }
  var symbol = $(this).attr("src");
  if (player === 0) {
    symbols[0] = symbol;
    
  } 
  else {
    symbols[1] = symbol;
  }

  $(this).addClass("ifImageChosen");

  
  togglePlayer();
  changeTextonModal();
}


function changeTextonModal() {
  if (symbols.length === 1) {
    $(".selectPlayer").text("Select the Planetary Body for Player 2");
  }
  if (symbols.length === 2) {
    appendStartButton();
    clickStartButton();
  }
}

function appendStartButton() {
  console.log("this is working");
  var startButton = $("<button>", {
    type: "button",
    text: "START NOW!",
    id: "startButton",
    class: "playButtons"
  });
  $(startButton).appendTo(".modalItems");
}

function clickStartButton() {
  $("#startButton").on("click", closeModalatStart);
}

function addPlanetHandler() {
  $(".imagesDiv").on("click", "img", assignPlayer);
}

function createResetButton() {
  var stats = $(".statsDisplay");

  var resetButton = $("<button>", {
    class: "reset",
    text: "Reset"
  });
  stats.append(resetButton);
  $(".reset").click(resetGame);
}

function createPlayerStats() {
  var gameBoard = $(".statsDisplay");
  for (var i = 0; i < symbols.length; i++) {
    var playertitle = $("<h3>", {
      text: "Player " + (i + 1)
    });
    var playerstats = $("<div>", {
      class: "powerUps"
    });
    var playerhole = $("<div>", {
      class: "statsHole",
      id: "playerHole" + (i + 1)
    });

    $("<img>", {
      attr: {
        src: symbols[i]
      }
    }).appendTo(playerhole);

    gameBoard.append(playertitle);
    gameBoard.append(playerstats);
    playerhole.appendTo(playerstats);
  }
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

      hole.appendTo(cellContainer);

      gameBoard.append(cellContainer);
    }
  }
}

function addGameHandlers() {
  $(".game-board").on("click", ".cell-container", handleColumnClick);
  $(".game-board").on("mouseenter", ".cell-container", handleCellMouseEnter);
  $(".game-board").on("mouseleave", ".cell-container", handleCellMouseLeave);
}

function handleCellMouseEnter() {
  var col = $(this).attr("col");
  $(".cell-container[col=" + col + "]").addClass("drop-highlight");
}

function handleCellMouseLeave() {
  var col = $(this).attr("col");
  $(".cell-container[col=" + col + "]").removeClass("drop-highlight");
}

var coordinateColumn = null;
var coordinateRow = null;
var currentSymbol = null;

function handleColumnClick() {
  var cellContainer = $(this);
  togglePlayerSymbols();
  coordinateColumn = getColumnIndex(cellContainer);
  coordinateRow = getRowIndex(coordinateColumn);
  updateArrayAtPosition(coordinateRow, coordinateColumn, currentSymbol);
  dropMedallion(coordinateRow, coordinateColumn, currentSymbol, function() {
    var won = checkForWin(coordinateRow, coordinateColumn, currentSymbol);
    if (won) {
      console.log("you win!");
      showWinModal();
      // $(".game-board").off("click");
      resetGame();
    }
    checkForPatterns(currentSymbol);
  });
  $("#winModalShadow").click(toggleWinModalVisibility);
}

function dropMedallion(
  coordinateRow,
  coordinateColumn,
  currentSymbol,
  medallionDropped
) {
  var img = $("<img>", {
    attr: {
      src: currentSymbol
    }
  });

  img.on("animationend", medallionDropped);

  var cellContainer = $(
    "div[row=" + coordinateRow + "][col=" + coordinateColumn + "]"
  );
  var hole = cellContainer.find(".hole");

  hole.append(img);
}

function getColumnIndex(cellContainer) {
  return parseInt(cellContainer.attr("col"));
}

function getCurrentSymbol(cellContainer) {
  return $(cellContainer)
    .find("img")
    .attr("src");
}

function getRowIndex(coordinateColumn) {
  var arraylength = gameBoardArray.length;
  for (var rowChoice = arraylength - 1; rowChoice >= 0; rowChoice--) {
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
  toggleBoardColor();
  glowSelectedPlayerProfile();
}

function glowSelectedPlayerProfile() {
  if (player === 0) {
    $("#playerHole1").addClass("glow");
    $("#playerHole2").removeClass("glow");
  } else {
    $("#playerHole2").addClass("glow");
    $("#playerHole1").removeClass("glow");
  }
}

function toggleBoardColor() {
  $(".cell-container").toggleClass("is-player-two");
}

function updateArrayAtPosition(coordinateRow, coordinateColumn) {
  gameBoardArray[coordinateRow].splice(coordinateColumn, 1, currentSymbol);
  return gameBoardArray;
}

function checkForPatterns(symbol) {
  for (var i = 0; i < gameBoardArray.length; i++) {
    for (var k = 0; k < gameBoardArray[0].length; k++) {
      if (checkForCrossPattern(i, k, symbol, crossVector)) {
        clearColumn(k);
      }
      if (checkForLPattern(i, k, symbol, LVector)) {
        clearRowmoveRowDown(i);
      }
    }
  }
}

function checkForLPattern(y, x, symbol, vectors) {
  for (var direction in vectors) {
    var startCounter = 1;
    var endCounter = 1;
    var set = vectors[direction];
    var startY1 = y + set["y1"];
    var startX1 = x + set["x1"];
    var startY2 = y + set["y2"];
    var startX2 = x + set["x2"];

    while (
      gameBoardArray[startY1] &&
      gameBoardArray[startY1][startX1] === symbol
    ) {
      startCounter++;
      startY1 += set["y1"];
      startX1 += set["x1"];
    }

    while (
      gameBoardArray[startY2] &&
      gameBoardArray[startY2][startX2] === symbol
    ) {
      endCounter++;
      startY2 += set["y2"];
      startX2 += set["x2"];
    }

    if (startCounter > 2 && endCounter > 2) {
      return true;
    }
  }
  return false;
}

function checkForCrossPattern(y, x, symbol, vectors) {
  var directions = [];

  for (var direction in vectors) {
    var startCounter = 1;
    var endCounter = 1;
    var set = vectors[direction];
    var startY1 = y + set["y1"];
    var startX1 = x + set["x1"];
    var startY2 = y + set["y2"];
    var startX2 = x + set["x2"];

    while (
      gameBoardArray[startY1] &&
      gameBoardArray[startY1][startX1] === symbol
    ) {
      startCounter++;
      startY1 += set["y1"];
      startX1 += set["x1"];
    }

    while (
      gameBoardArray[startY2] &&
      gameBoardArray[startY2][startX2] === symbol
    ) {
      endCounter++;
      startY2 += set["y2"];
      startX2 += set["x2"];
    }

    if (startCounter > 1 && endCounter > 1) {
      directions.push(true);
    } else {
      directions.push(false);
    }
  }
  //check if both directions have matching symbols
  if (directions[0] && directions[1]) {
    return true;
  }
  return false;
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
      return true;
    }
  }
  return false;
}

//this upon reset
function displayModal() {
  $("#modalShadow").show(); 
  // document.querySelector("#modalShadow").style.display = "block";
}

function closeModalatStart() {
  $("#modalShadow").hide(); 
  createCells(7, 7);
  createPlayerStats();
  glowSelectedPlayerProfile();
  createResetButton();
  // toggleWinModalVisibility();
}

function resetGame() {
  console.log("reset clicked");
  gameBoardArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  player = 0;
  $(".cell-container").remove();
  createCells(7, 7);
}

function showWinModal() {
  toggleWinModalVisibility();
  if (player === 0) {
    player = 2;
  } else {
    player = 1;
  }
  $("#winTitle").text("Player " + player + " wins!");
  powerUps.moon = 0;
  powerUps.sun = 0;
}

function toggleWinModalVisibility() {
  $("#winModalShadow").toggleClass("hidden");
}

function clearRowmoveRowDown(row) {
  var newRow = new Array(7).fill(0);
  gameBoardArray.splice(row, 1);
  gameBoardArray.unshift(newRow);
  $(".cell-container[row='" + row + "'] > .hole").empty();
  for (var y = row - 1; y >= 0; y--) {
    for (var x = 0; x < gameBoardArray.length; x++) {
      var image = $(
        ".cell-container[row='" + y + "'][col='" + x + "'] > .hole > img"
      );
      if (image.length !== 0) {
        $(
          ".cell-container[row='" + (y + 1) + "'][col='" + x + "'] > .hole"
        ).append(image);
      }
    }
  }
}

function clearColumn(column) {
  for (var row = gameBoardArray.length - 1; row >= 0; row--) {
    gameBoardArray[row].splice(column, 1, 0);
    $(".cell-container[col='" + column + "'] > .hole").empty();
  }
}
