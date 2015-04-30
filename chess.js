console.log("test mode");

var PAWN = 'p';
var KING = 'k';
var QUEEN = 'q';
var ROOK = 'r';
var BISHOP = 'b';
var KNIGHT = 'n';

//these boards are sideways; access is [column][row]
var Board1 = [[0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0]];

var Board2 = [[0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0]];

/*=========== Constructors ============*/
function Player (position) {
    // init player
};

function Piece (type, board, column, row) {
    //0-7, -1 if spare
    this.column = -1; //temp
    this.row = -1; //temp
    this.board = 1; //1 or 2, temp 1
    this.availableMoves = [];
    
    /*===== Functions =====*/
    this.getPosition = function(){
	/* Returns the position in algebraic notation. Board 1 is lowercase.
	 */
	col = 'x' //0 is in hand
	r = 0
	if (this.column != -1) {
	    if (board == 1) {
		col = String.fromCharCode((this.column) + 97); //board 1
	    }
	    else {
		col = String.fromCharCode((this.column) + 65); //board 2
	    }
	}
	if (this.row != -1) {
	    r = this.row + 1 //compensation of index and algebraic notation
	}
	return col + r.toString();
	
    };
    this.move = function() {

    };
    switch(type) {
    case PAWN:
	this.getMoves = function(){
	    
	};
	break;
    case KING:
	break;
    case QUEEN:
	break;
    case ROOK:
	break;
    case BISHOP:
	break;
    case KNIGHT:
	break;
    default:
	break;
    }
    /*
    return {
	row: this.row,
	column: this.column,
	getPosition: this.getPosition,
	move: this.move,
	getMoves: this.getMoves
	}
    */
};

function Init() {
    // Fill the boards

    //board 1
    //board 1 white minor
    Board1[0][0] = new Piece(ROOK,1,0,0)
    Board1[1][0] = new Piece(KNIGHT,1,1,0);
    Board1[2][0] = new Piece(BISHOP,1,2,0);
    Board1[3][0] = new Piece(QUEEN,1,3,0);
    Board1[4][0] = new Piece(KING,1,4,0);
    Board1[5][0] = new Piece(BISHOP,1,5,0);
    Board1[6][0] = new Piece(KNIGHT,1,6,0);
    Board1[7][0] = new Piece(ROOK,1,7,0);
    //board 1 white pawns
    for (var i=0;i<8;i++) {
	Board1[i][1] = new Piece(PAWN,1,i,1);
    }
};

/*============ Board Interaction ==============*/

function isSquareEmpty(board, column, row) {
    if (board == 1) {
	return Board1[column][row] == 0;
    }
    return Board2[column][row] == 0;
}
