

var gameBoardArray =
    [[0, 0, 0, 1, 2, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]];

var vectors = [
    { y: 0, x: -1, axis: "HorizontalAxis" }, //going left and not y 
    { y: 0, x: 1, axis: "HorizontalAxis" }, //going right and not y 
    { y: 1, x: 0, axis: "verticalAxis" }, //going down and not x 
    { y: -1, x: -1, axis: "verticalAxis" }, // going up and and left 
    { y: 1, x: 1, axis: "diagonalRight" }, //going down and going right 
    { y: -1, x: 1, axis: "diagonalRight" }, // up and right 
    { y: 1, x: -1, axis: "diagonalLeft" }, //down and left 
    { y: -1, x: 1, axis: "diagonalLeft" }, //down and left 
];


function checkForWin(y, x, symbol) {
    debugger;
    var counter = 1;
    for (var majorDirection in vectors) {
        var set = vectors[majorDirection];
        var startY = y + set['y'];
        var startX = x + set['x'];

        while (gameBoardArray[startY][startX] === symbol) {
            console.log(gameBoardArray[startY][startX]);
            //check to see if player1/ player2 or 0 
            //player1 was defined then an if statement to proceed 
            //only increment counter if it matches current player piece 
            // we need to check if on same axis, if not on same axis and the symbol isnt the same
            //we switch to a new axis 
            counter++;
            startY += set['y'];
            startX += set['x'];
            if (counter === 4) {
                console.log("YOU WIN!");
                return true;
            }
        }
        if (gameBoardArray[startY][startX] != symbol) {
            counter = 1;
            continue;
        }
    }
}

checkForWin(0, 3, 1);

// if(checkForWin(0,3,1) === true) {
//     //display modal
// } else {
//     // click function enabled continue playing game 
// }

