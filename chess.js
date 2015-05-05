console.log("test mode");

var PAWN = 'P';
var KING = 'K';
var QUEEN = 'Q';
var ROOK = 'R';
var BISHOP = 'B';
var KNIGHT = 'N';

var WHITE = true;
var BLACK = false;

var MOVE = 0;
var CAPTURE = 1;
var EN_PASSANT = 2;
var JUMP = 3;

var WHITE_A = 0;
var BLACK_A = 1;
var WHITE_B = 2;
var BLACK_B = 3;

//these boards are sideways; access is [column][row]
var BoardA = [[0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0]];

var BoardB = [[0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0]];

/*=========== Constructors ============*/
function Player (color, position, opponent, partner) {
    this.position = position;
    this.opponent = opponent;
    this.partner = partner;
    this.color = color;
    
    this.spare = [];
    this.time = 180.0;

    this.setOpponent = function(o) {
	this.opponent = o;
    };
    this.setPartner = function(p) {
	this.partner = p;
    }
};

//all the players
white_A = new Player(WHITE, WHITE_A, -1, -1);
black_A = new Player(BLACK, BLACK_A, white_A, -1);
white_B = new Player(WHITE, WHITE_B, -1, white_A);
black_B = new Player(BLACK, BLACK_B, white_B, black_A);

white_A.setOpponent(black_A);
white_A.setPartner(white_B);
black_A.setPartner(black_B);
white_B.setOpponent(black_B);

function Piece (player, color, type, board, column, row) {
    //0-7, -1 if spare
    this.player = player; //what player this piece belongs to
    this.type = type;
    this.column = column; //temp
    this.row = row; //temp
    this.board = board; //1 or 2, temp 1
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
    this.move = function(column, row) {
	for (var i=0; i<this.availableMoves.length; i++) {
	    var square = this.availableMoves[i];
	    if (square[0] == column && square[1] == row) {
		if (square[2] == CAPTURE) {
		    this.board[square[0]][square[1]].column = -1;
		    this.board[square[0]][square[1]].row = -1;
		    this.player.partner.spare.push(this.board[square[0]][square[1]]);
		    this.board[square[0]][square[1]] = 0;
		}
		if (square[2] == EN_PASSANT) {
		    this.board[square[0]][square[1]-1].column = -1;
		    this.board[square[0]][square[1]-1].row = -1;
		    this.player.partner.spare.push(this.board[square[0]][square[1]-1]);
		    this.board[square[0]][square[1]-1] = 0;
		}
		var oldColumn = this.column;
		var oldRow = this.row;
		this.column = square[0];
		this.row = square[1];
		this.board[square[0]][square[1]] = this.board[oldColumn][oldRow];
		this.board[oldColumn][oldRow] = 0;
		if (square[2] == JUMP) {
		    this.jumped = true;
		}
	    }
	}
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

	    this.moved += 1; //maybe relocate this somewhere
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

    //board A
    //board A white minor
    BoardA[0][0] = new Piece(white_A,white_A.color,ROOK,1,0,0)
    BoardA[1][0] = new Piece(white_A,white_A.color,KNIGHT,1,1,0);
    BoardA[2][0] = new Piece(white_A,white_A.color,BISHOP,1,2,0);
    BoardA[3][0] = new Piece(white_A,white_A.color,QUEEN,1,3,0);
    BoardA[4][0] = new Piece(white_A,white_A.color,KING,1,4,0);
    BoardA[5][0] = new Piece(white_A,white_A.color,BISHOP,1,5,0);
    BoardA[6][0] = new Piece(white_A,white_A.color,KNIGHT,1,6,0);
    BoardA[7][0] = new Piece(white_A,white_A.color,ROOK,1,7,0);
    //board A white pawns
    for (var i=0;i<8;i++) {
	BoardA[i][1] = new Piece(white_A,white_A.color,PAWN,1,i,1);
    }
    //board A black minor
    BoardA[0][7] = new Piece(black_A,black_A.color,ROOK,1,0,7)
    BoardA[1][7] = new Piece(black_A,black_A.color,KNIGHT,1,1,7);
    BoardA[2][7] = new Piece(black_A,black_A.color,BISHOP,1,2,7);
    BoardA[3][7] = new Piece(black_A,black_A.color,QUEEN,1,3,7);
    BoardA[4][7] = new Piece(black_A,black_A.color,KING,1,4,7);
    BoardA[5][7] = new Piece(black_A,black_A.color,BISHOP,1,5,7);
    BoardA[6][7] = new Piece(black_A,black_A.color,KNIGHT,1,6,7);
    BoardA[7][7] = new Piece(black_A,black_A.color,ROOK,1,7,7);
    //board A black pawns	      
    for (var i=0;i<8;i++) {
	BoardA[i][6] = new Piece(black_A,black_A.color,PAWN,1,i,6);
    }

    //board B
    //board B white minor
    BoardB[0][0] = new Piece(white_B,white_B.color,ROOK,2,0,0)
    BoardB[1][0] = new Piece(white_B,white_B.color,KNIGHT,2,1,0);
    BoardB[2][0] = new Piece(white_B,white_B.color,BISHOP,2,2,0);
    BoardB[3][0] = new Piece(white_B,white_B.color,QUEEN,2,3,0);
    BoardB[4][0] = new Piece(white_B,white_B.color,KING,2,4,0);
    BoardB[5][0] = new Piece(white_B,white_B.color,BISHOP,2,5,0);
    BoardB[6][0] = new Piece(white_B,white_B.color,KNIGHT,2,6,0);
    BoardB[7][0] = new Piece(white_B,white_B.color,ROOK,2,7,0);
    //board B white pawns
    for (var i=0;i<8;i++) {
	BoardB[i][1] = new Piece(white_B,white_B.color,PAWN,2,i,1);
    }
    //board B black minor
    BoardB[0][7] = new Piece(black_B,black_B.color,ROOK,2,0,7)
    BoardB[1][7] = new Piece(black_B,black_B.color,KNIGHT,2,1,7);
    BoardB[2][7] = new Piece(black_B,black_B.color,BISHOP,2,2,7);
    BoardB[3][7] = new Piece(black_B,black_B.color,QUEEN,2,3,7);
    BoardB[4][7] = new Piece(black_B,black_B.color,KING,2,4,7);
    BoardB[5][7] = new Piece(black_B,black_B.color,BISHOP,2,5,7);
    BoardB[6][7] = new Piece(black_B,black_B.color,KNIGHT,2,6,7);
    BoardB[7][7] = new Piece(black_B,black_B.color,ROOK,2,7,7);
    //board B black pawns
    for (var i=0;i<8;i++) {
	BoardB[i][6] = new Piece(black_B,black_B.color,PAWN,2,i,6);
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
