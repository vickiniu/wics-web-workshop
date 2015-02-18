/* 
 * The Board class runs a tic-tac-toe board for two
 * human players.
 * name: string representing the id of the tic-tac-toe board
 * 	in our html.
 */
function Board(name) {
	this.$table = $("#" + name);
	this.name = name;
	this.roundCount = 0;
	this.start();
}

/* Function: start
 * Initializes the boardModel + click handling
 */
Board.prototype.start = function() {
	var obj = this;
	/* set up callbacks! */
	$('#' + this.name + ' tr td').click(function() {
		obj.handleClick(this);
	});
};

/* things that should happen each time a cell is clicked.
 * 	obj : Object representing the cell that was clicked.
 */
Board.prototype.handleClick = function(obj) {
	$obj = $(obj); 	/* this converts obj to a jquery object */
	if($obj.html() == "") {
		/* sets the cell to the current player (X or O) */
		$obj.html(this.turn());

		/* update round count and status */
		this.roundCount++;
		this.updateStatus("It's now " + this.turn() + "'s turn!");

		/* check for win condition */
		this.check();
	}
};

/* Who's turn is it?
 * If roundCount is even, returns "X". Otherwise returns "O"
 */
Board.prototype.turn = function() {
	return this.roundCount % 2 === 0 ? "X" : "O"
};

/* Updates the html of the elements under the "status" class
 * to msg
 */
Board.prototype.updateStatus = function(msg) {
	$(".status").html(msg);
};

/* Loads board state from html, then checks for endgame condition.
 * If someone has won, then clear the board and return.
 */
Board.prototype.check = function() {
	if(this.roundCount < 3) return;
	if(this.roundCount == 9) {
		this.signalDraw();
		return;
	}

	/* Load board state into "cells" */
	var cells = [[,,],[,,],[,,]]; /* 3x3 grid */
	$.each($('#' + this.name + ' tr td'), function(index, node) {
		cells[Math.floor(index/3)][index%3] = $(node).html();
	});

	/* win checks... dumb indexing stuff */
	for( var i = 0; i < 3; i++ ) {
		// checking columns
		if (cells[i][0] === cells[i][1] && 
		cells[i][1] === cells[i][2] && cells[i][0] !== '')
			this.signalWinner(cells[i][0]);
		//checking rows
		if (cells[0][i] === cells[1][i] && 
		cells[1][i] === cells[2][i] && cells[0][i] !== '')
			this.signalWinner(cells[0][i]);
	}
	// UL to BR diag
	if (cells[0][0] === cells[1][1] && 
	cells[1][1] === cells[2][2] && cells[1][1] !== '')
		this.signalWinner(cells[0][0]);
	// UR to BL diag
	if (cells[0][2] === cells[1][1] && 
	cells[1][1] === cells[2][0] && cells[1][1] !== '')
		this.signalWinner(cells[1][1]);
};

/* Informs user of winner and clears the board.
 * 	winner : string - either 'X' or 'O'
 */
Board.prototype.signalWinner = function(winner) {
	this.updateStatus("Player " + winner + " has won!");
	this.clearBoard();
};

/* Informs user of draw and clears the board.
 */
Board.prototype.signalDraw = function() {
	this.updateStatus("You two tied!");
	this.clearBoard();
};

/* Sets the html of all "td" cells to the empty string ""
 */
Board.prototype.clearBoard = function() {
	$("#" + this.name + " tr td").html("");
	this.roundCount = 0;
};
