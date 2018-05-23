


var gameBoardArray = 
[[0, 0, 0, 1, 1, 2, 1],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0]];

var vectors = [
{ y: 0, x: -1}, //left
{y: 0, x: 1 }, //right 
{y: 1, x: 0 }, // Not handling up because of no piece above
{ y: -1, x: -1},{y: 1, x: 1 }, //up left and down right 2// 
{ y: -1, x: 1}, {y: 1, x: -1 }, //up right and down left 3// 
 ];


function checkingForAWin(){
    for (var majorDirection in vectors) {
        set = vectors[majorDirection];
        var counter = 1;
    
        var startY = 0 + set['y'];
        var startX = 3 + set['x'];
    
        while(gameBoardArray[startY][startX] !== undefined) {
            console.log(gameBoardArray[startY][startX]);
            //check to see if player1/ player2 or 0 
            //player1 was defined then an if statement to proceed 
            //only increment counter if it matches current player piece 
            counter++;
            startY += set['y'];
            startX += set['x'];
        }
    }
    
}




