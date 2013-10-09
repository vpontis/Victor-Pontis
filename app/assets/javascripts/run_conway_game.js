// locked stores the state of the game
// if locked is true, the game is being played and squares cannot be modified
// if locked is false, the game is paused and squares can be modified
var locked = false;

// run id will be the process we will start and stop for stepping the game
var runId;

// this resets the game by randomizing all of the squares
var reset = function(){
	game.reset();
};

// this 
var play = function(){
	locked = true;
	runId = setInterval(function(){
		game.step()	
		}, 500);
};

var pause = function(){
	locked = false;
	clearInterval(runId);
};	

// this function is fired when a square in the grid is clicked
// if the game is not being played, the square will be set to alive from dead
// or vice versa and the color will change correspondingly
var square_clicked = function(id){
	if (!locked){
		var square = $('#' + id);
		// console.log(id);
		game.square_toggled(square);
	} 	
};

// steps the game if it is not being played
// this is helpful in debugging and allows the user to control the speed
var step = function(){
	if (!locked){
		game.step();
	}
};

// begin the game when the page is loaded
var grid = Grid($('#grid-container'), 100, 20)
var game = Conway_Game(grid);
game.setup_game();