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
 * Initializes click handling
 */
Board.prototype.start = function() {
	var obj = this;
};

/* things that should happen each time a cell is clicked.
 * 	obj : Object representing the cell that was clicked.
 */
Board.prototype.handleClick = function(obj) {
	$obj = $(obj); 	/* this converts obj to a jquery object */
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
};


/* Loads board state from html, then checks for endgame condition.
 * If someone has won, then clear the board and return.
 */
Board.prototype.checkForEnd = function() {
	var cells = [[,,],[,,],[,,]]; /* 3x3 grid */
	
	/* TODO: Load board state into "cells" */

	this.checkForWin(cells);
};

/* cells: 3x3 grid of "X", "", or "O"
 * If someone won, then clear the board and return.
 */
Board.prototype.checkForWin = function(cells) {
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
};

/* Informs user of draw and clears the board.
 */
Board.prototype.signalDraw = function() {
};

/* Sets the html of all "td" cells to the empty string ""
 * and resets roundCount to 0
 */
Board.prototype.clearBoard = function() {
};
