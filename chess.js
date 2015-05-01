console.log("test mode");

var PAWN = 'p';
var KING = 'k';
var QUEEN = 'q';
var ROOK = 'r';
var BISHOP = 'b';
var KNIGHT = 'n';

var WHITE = true;
var BLACK = false;

var MOVE = 0;
var CAPTURE = 1;
var EN_PASSANT = 2;
var JUMP = 3;

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
    this.side = [];
};

function Piece (color, type, board, column, row) {
    //0-7, -1 if spare
    this.type = type;
    this.column = -1; //temp
    this.row = -1; //temp
    this.board = 1; //1 or 2, temp 1
    this.availableMoves = []; //all the moves loaded at the start of turn
    this.color = color; //true or false, true is white
    
    /*===== Functions =====*/
    this.getPosition = function(){
	/* Returns the position in algebraic notation. Board 1 is lowercase.
	 */
	col = 'x' //0 is in hand
	r = 0
	if (this.column != -1) {
	    if (this.board == 1) {
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
	this.moved = 0; //first move
	this.jumped = false;
	this.getMoves = function(){
	    //possible moves will be an array of [column, row, move 0/capture 1/en passant 2/jump 3]
	    this.availableMoves.length = 0; //clear array of moves

	    //first move
	    if (this.moved == 0) {
		if (isSquareEmpty(this.board, this.column, this.row + 2)) {
		    this.availableMoves.push([this.column, this.row + 2, JUMP]);
		}
	    }
	    if (isSquareEmpty(this.board, this.column, this.row + 1)) {
		this.availableMoves.push([this.column, this.row + 1, MOVE]);
	    }

	    //capturing a piece for a pawn is different
	    //left
	    if (this.column > 0) {
		if (!isSquareEmpty(this.board, this.column - 1, this.row + 1)) {
		    var target = getPiece(this.board, this.column - 1, this.row + 1);
		    if (target.color != this.color) {
			this.availableMoves.push([this.column - 1, this.row + 1, CAPTURE]);
		    }
		}
		//en passant left
		if (!isSquareEmpty(this.board, this.column - 1, this.row)) {
		    var target = getPiece(this.board, this.column - 1, this.row);
		    if (target.type == PAWN && target.color != this.color) {
			if (target.moved == 1 && jumped) {
			    this.availableMoves.push([this.column - 1, this.row + 1, EN_PASSANT]);
			}
		    }
		}
	    }
	    //right
	    if (this.column < 7) {
		if (!isSquareEmpty(this.board, this.column + 1, this.row + 1)) {
		    var target = getPiece(this.board, this.column + 1, this.row + 1);
		    if (target.color != this.color) {
			this.availableMoves.push([this.column + 1, this.row + 1, CAPTURE]);
		    }
		}
		//en passant right
		if (!isSquareEmpty(this.board, this.column + 1, this.row)) {
		    var target = getPiece(this.board, this.column + 1, this.row);
		    if (target.type == PAWN && target.color != this.color) {
			if (target.moved == 1 && jumped) {
			    this.availableMoves.push([this.column + 1, this.row + 1, EN_PASSANT]);
			}
		    }
		}
	    }

	    this.moved += 1;
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

/*============ Initialize the boards ============*/
function Init() {
    // Fill the boards

    //board 1
    //board 1 white minor
    Board1[0][0] = new Piece(WHITE,ROOK,1,0,0)
    Board1[1][0] = new Piece(WHITE,KNIGHT,1,1,0);
    Board1[2][0] = new Piece(WHITE,BISHOP,1,2,0);
    Board1[3][0] = new Piece(WHITE,QUEEN,1,3,0);
    Board1[4][0] = new Piece(WHITE,KING,1,4,0);
    Board1[5][0] = new Piece(WHITE,BISHOP,1,5,0);
    Board1[6][0] = new Piece(WHITE,KNIGHT,1,6,0);
    Board1[7][0] = new Piece(WHITE,ROOK,1,7,0);
    //board 1 white pawns
    for (var i=0;i<8;i++) {
	Board1[i][1] = new Piece(WHITE,PAWN,1,i,1);
    }
    //board 1 black minor
    Board1[0][7] = new Piece(BLACK,ROOK,1,0,7)
    Board1[1][7] = new Piece(BLACK,KNIGHT,1,1,7);
    Board1[2][7] = new Piece(BLACK,BISHOP,1,2,7);
    Board1[3][7] = new Piece(BLACK,QUEEN,1,3,7);
    Board1[4][7] = new Piece(BLACK,KING,1,4,7);
    Board1[5][7] = new Piece(BLACK,BISHOP,1,5,7);
    Board1[6][7] = new Piece(BLACK,KNIGHT,1,6,7);
    Board1[7][7] = new Piece(BLACK,ROOK,1,7,7);
    //board 1 black pawns
    for (var i=0;i<8;i++) {
	Board1[i][6] = new Piece(BLACK,PAWN,1,i,6);
    }

    //board 2
    //board 2 white minor
    Board2[0][0] = new Piece(WHITE,ROOK,2,0,0)
    Board2[1][0] = new Piece(WHITE,KNIGHT,2,1,0);
    Board2[2][0] = new Piece(WHITE,BISHOP,2,2,0);
    Board2[3][0] = new Piece(WHITE,QUEEN,2,3,0);
    Board2[4][0] = new Piece(WHITE,KING,2,4,0);
    Board2[5][0] = new Piece(WHITE,BISHOP,2,5,0);
    Board2[6][0] = new Piece(WHITE,KNIGHT,2,6,0);
    Board2[7][0] = new Piece(WHITE,ROOK,2,7,0);
    //board 2 white pawns
    for (var i=0;i<8;i++) {
	Board2[i][1] = new Piece(WHITE,PAWN,2,i,1);
    }
    //board 2 black minor
    Board2[0][7] = new Piece(BLACK,ROOK,2,0,7)
    Board2[1][7] = new Piece(BLACK,KNIGHT,2,1,7);
    Board2[2][7] = new Piece(BLACK,BISHOP,2,2,7);
    Board2[3][7] = new Piece(BLACK,QUEEN,2,3,7);
    Board2[4][7] = new Piece(BLACK,KING,2,4,7);
    Board2[5][7] = new Piece(BLACK,BISHOP,2,5,7);
    Board2[6][7] = new Piece(BLACK,KNIGHT,2,6,7);
    Board2[7][7] = new Piece(BLACK,ROOK,2,7,7);
    //board 1 black pawns
    for (var i=0;i<8;i++) {
	Board2[i][6] = new Piece(BLACK,PAWN,2,i,6);
    }


};

/*============ Board Interaction ==============*/

function isSquareEmpty(board, column, row) {
    if (column < 0 || column > 7 || row < 0 || row > 7) {
	return false; //square doesn't exist
    }
    if (board == 1) {
	return Board1[column][row] == 0;
    }
    return Board2[column][row] == 0;
}

function getPiece(board, column, row) {
    if (board == 1) {
	return Board1[column][row];
    }
    return Board2[column][row];
}
