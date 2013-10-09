// an abstraction for drawing squares in a grid
var Grid = function (grid_container, num_x, num_y) {
	var NUM_X;
	var NUM_Y;
	if (num_y === undefined || num_y === undefined){
		NUM_X = 20;
		NUM_Y = 20;
	} else{
		NUM_X = num_x;
		NUM_Y = num_y;
	}
	var GRID_CONTAINER = grid_container;

	// creates a row in the grid with the y value
	// the row will be populated with NUM_SQUARES squares
	var create_row = function(y){
		var rowId = 'canvas-row-' + y;
		var row = $('<div>', {
			id: rowId,
			class: 'canvas-row'
			});

		for (var i=0; i<NUM_X; i++){
			var square = create_square(i, y);
			row.append(square);
		}

		return row;
	}

	// creates a square in the grid, the attrs x and y are set to allow for
	// toggling squares on the grid to be easier
	var create_square = function(x, y){
		var elemId = 'canvas-square-' + x + '-' + y;
		var elem = $('<div>', {
			class: 'canvas-square alive', 
			id: elemId,
			x: x,
			y: y
			})
			.attr("onClick", "square_clicked(this.id)");
		return elem;
	}

	// return the abstract object from the constructor
	return {
		// clears the entire board
		clear: function() {
			$('#grid').remove();
		},

		// goes through the squares on the page and appropriately
		// labels them alive or dead
		// param squares must be a 2D array with length and width equal to NUM_SQUARES
		draw_squares: function(squares) {
			this.clear();
			this.setup_grid();
			grid_for_each(NUM_X, NUM_Y, function(i,j){
				var square_id = '#canvas-square-' + i + '-' + j;
				if (!!squares[i][j] === true) {
					$(square_id).removeClass('dead').addClass('alice');
				} else{
					$(square_id).removeClass('alive').addClass('dead');
				}
			});
		},

		// after a square is clicked, if it is alive it becomes dead and vice versa
		square_clicked: function(square){
			if ($(square).hasClass('alive')){
				$(square).removeClass('alive').addClass('dead');
			} else {
				$(square).removeClass('dead').addClass('alive');
			}
		},

		// sets up the deafualt grid and adds it to the container
		setup_grid: function(){
			var grid = $('<div>').attr({
				id: 'grid',
				class: 'grid'
			});

			for (var i=0; i < NUM_Y; i++){
				var row = create_row(i); 
				grid.append(row);
			}
			$('#grid-container').append(grid);
		}, 

		get_x: function(){
			return NUM_X;
		}, 

		get_y: function(){
			return NUM_Y;
		}
	};
};


var grid_for_each = function(x, y, func){
	for (var i=0; i<x; i++){
		for (var j=0; j<y; j++){
			func(i,j);
		}
	};
};
