$(document).ready(function() {
  createCells(7, 7);
});

function createCells(row, col) {
  var gameBoard = $(".game-board");

  for (var i = 0; i < row; i++) {
    for (var k = 0; k < col; k++) {
      var cellContainer = $("<div>", {
        class: "cell-container",
        attr: {
          row: row,
          col: col
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
