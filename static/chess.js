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
//we're using numbers for boards because of some old implementation
//this is board 1
var BoardA = [[0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0]];

//board 2
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
    this.king = -1;
    
    this.spare = {
	PAWN: 0,
	QUEEN: 0,
	KNIGHT: 0,
	BISHOP: 0,
	ROOK: 0
    };
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
    //DROPPED NOT FINISHED
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
    //returns true if move is successful
    this.move = function(column, row) {
	//this.getMoves();
	//move and capture should be separated
	//drop should be called in here
	var b = BoardA;
	if (this.board == 2) {
	    b = BoardB;
	}
	//just resetting pawn jumps
	for (var x = 0; x < 8; x ++) {
	    for (var y = 0; y < 8; y++) {
		var target = b[x][y];
		if (target.color == this.color) {
		    if (target.type == PAWN) {
			target.jumped = false;
		    }
		}
	    }
	}
	
	//whatever is on the target square
	var target = b[column][row];
	if (target == 0)  {
	    target = -1;
	}
	
	for (var i=0; i<this.availableMoves.length; i++) {
	    var square = this.availableMoves[i];
	    if (square[0] == column && square[1] == row) {
		if (square[2] == CAPTURE) {
		    //b[square[0]][square[1]].column = -1;
		    //b[square[0]][square[1]].row = -1;
		    //this.player.partner.spare.push(b[square[0]][square[1]]);
		    this.player.partner.spare[target.type] += 1;
		    b[square[0]][square[1]] = 0;
		}
		if (square[2] == EN_PASSANT) {
		    //b[square[0]][square[1]-this.direction].column = -1;
		    //b[square[0]][square[1]-this.direction].row = -1;
		    //this.player.partner.spare.push(b[square[0]][square[1]-this.direction]);
		    this.player.partner.spare[target.type] += 1;
		    b[square[0]][square[1]-this.direction] = 0;
		}
		var oldColumn = this.column;
		var oldRow = this.row;
		this.column = square[0];
		this.row = square[1];
		b[square[0]][square[1]] = b[oldColumn][oldRow];
		b[oldColumn][oldRow] = 0;
		if (square[2] == JUMP) {
		    this.jumped = true;
		}
		if (this.type == PAWN) {
		    
		    this.moved += 1;
		}
		return target;
	    }
	}
	return false;
    };

    //used in getMoves, search in one direction
    this.extend = function(c, r, cInc, rInc) {	
	if (squareExists(c, r)) {
	    if (isSquareEmpty(this.board, c, r)) {
		this.availableMoves.push([c, r, MOVE]);
		return this.extend(c+cInc, r+rInc, cInc, rInc);
	    }
	    else {
		var target = getPiece(this.board, c, r);
		if (target.color != this.color) {
		    this.availableMoves.push([c, r, CAPTURE]);
		    return 1;
		}			
	    }
	}
	return 0;
    };

    
    this.pinned = function() {
	//check each square around the king
	//diagonals: check if Bishop/Queen, pinned piece and king are concurrent
	//files/columns: check if Rook/Queen, pinned piece and king are concurrent
	//use the slope between king and pinned piece to decide which way to recurse
	var y_div = this.row - this.player.king.row;
	var x_div = this.column - this.player.king.column;
	if (y_div > 1 || x_div > 1) {
	    return false; //this piece cannot be pinned; only pieces on N/E/S/W can be pinned
	}
	
	var search_x = this.column + x_div;
	var search_y = this.row + y_div;
	while (squareExists(search_x, search_y)) {
	    if (isSquareEmpty(this.board,search_x,search_y)) {
		search_x = search_x + x_div;
		search_y = search_y + y_div;
	    }
	    else {
		break;
	    }
	}

	//search for bishop or queen, concurrent on diagonal
	if (x_div == y_div) {
	    var p = getPiece(this.board,search_x,search_y).type;
	    if (p == BISHOP || p == QUEEN) {
		return true;
	    }
	}
	//search for rook or queen, concurrent on file
	else {
 	    var p = getPiece(this.board,search_x,search_y).type;
	    if (p == ROOK || p == QUEEN) {
		return true;
	    }
	}
	return false;
    };
    
    //unfinished
    this.defended = function() {
	var temp = this;
	var b = BoardA;
	if (this.board == 2) {
	    b = BoardB;
	}
	for (var x = 0; x < 8; x ++) {
	    for (var y = 0; y < 8; y ++) {
		var target = b[x][y];
		if (target != 0) {
		    if (target.color == this.color) {
			if (target.type == KING) {
			    var distance_squared = Math.pow((target.column - this.column), 2) + Math.pow((target.row - this.row), 2);
			    if (distance_squared <= 2) {
				return true;
			    }
			}
			else {
			    b[this.column][this.row] = 0;
			    target.getMoves();
			    for (var i = 0; i < target.availableMoves.length; i++) {
				var move = target.availableMoves[i];
				if (move[0] == temp.column && move[1] == temp.row) {
				    b[temp.column][temp.row] = temp;
				    return true;
				}
			    }			    
			}
		    }
		}
	    }
	}
	b[temp.column][temp.row] = temp;
	return false;
    };
    switch(type) {
    case PAWN:
	//PROMOTION NOT FINISHED!!
	//en passant needs to be fixed
	this.moved = 0;
	this.jumped = false;
	this.direction = 1;
	if (this.color == BLACK) {
	    this.direction = -1;
	}
	
	this.getMoves = function(){
	    //possible moves will be an array of [column, row, move 0/capture 1/en passant 2/jump 3]
	    //make all of your OWN pawns jumped = false
	    
	    this.availableMoves.length = 0; //clear array of moves
	    //first move
	    if (this.moved == 0) {
		if (isSquareEmpty(this.board, this.column, this.row + (2*this.direction))) {
		    this.availableMoves.push([this.column, this.row + (2*this.direction), JUMP]);
		}
	    }
	    if (isSquareEmpty(this.board, this.column, this.row + (1*this.direction))) {
		this.availableMoves.push([this.column, this.row + (1*this.direction), MOVE]);
	    }

	    //capturing a piece for a pawn is different
	    //left
	    if (this.column > 0) {
		if (!isSquareEmpty(this.board, this.column - 1, this.row + (1*this.direction))) {
		    var target = getPiece(this.board, this.column - 1, this.row + (1*this.direction));
		    if (target.color != this.color) {
			this.availableMoves.push([this.column - 1, this.row + (1*this.direction), CAPTURE]);
		    }
		}
		//en passant left
		if (!isSquareEmpty(this.board, this.column - 1, this.row)) {
		    var target = getPiece(this.board, this.column - 1, this.row);
		    if (target.type == PAWN && target.color != this.color) {
			if (target.moved == 1 && target.jumped) {
			    this.availableMoves.push([this.column - 1, this.row + (1*this.direction), EN_PASSANT]);
			}
		    }
		}
	    }
	    //right
	    if (this.column < 7) {
		if (!isSquareEmpty(this.board, this.column + 1, this.row + (1*this.direction))) {
		    var target = getPiece(this.board, this.column + 1, this.row + (1*this.direction));
		    if (target.color != this.color) {
			this.availableMoves.push([this.column + 1, this.row + (1*this.direction), CAPTURE]);
		    }
		}
		//en passant right
		if (!isSquareEmpty(this.board, this.column + 1, this.row)) {
		    var target = getPiece(this.board, this.column + 1, this.row);
		    if (target.type == PAWN && target.color != this.color) {
			if (target.moved == 1 && target.jumped) {
			    this.availableMoves.push([this.column + 1, this.row + (1*this.direction), EN_PASSANT]);
			}
		    }
		}
	    }
	};
	break;
    case KING:
	//YOU CAN STILL HANG THE KING - UNFINISHED
	//If the king is in check, other pieces' moves will not be locked
	this.player.king = this;

	//almost identical to checkKnightSquare
	this.checkKingSquare = function(c,r) {
	    if (squareExists(c,r)) {

		if (isSquareEmpty(this.board, c, r)) {
		    if (this.isSquareSafe(c,r)) {
			this.availableMoves.push([c,r,MOVE]);
		    }
		}
		else {
		    var target = getPiece(this.board, c, r);
		    if (target.color != this.color) {
			if (!target.defended()) {
			    this.availableMoves.push([c, r, CAPTURE]);
			}
		    }
		}
		
	    }
	};
	//checks if a square is attacked, and what is attacking it.
	//the slow but safe way to do it:
	// - check ALL the pieces on this board
	// - if they have a move to that square, it's not safe
	//returns references to all pieces attacking the square
	this.squareThreats = function(c,r) {
	    var threats = [];
	    var b = BoardA;
	    if (this.board == 2) {
		b = BoardB;
	    }
	    for (var x = 0; x < 8; x++) {
		for (var y = 0; y < 8; y++) {
		    
		    var target = b[x][y];
		    if (target != 0) {
			if (target.color != this.color) {
			    //check all the moves of this piece to see if it attacks the square
			    if (target.type == KING) {
				var distance_squared = Math.pow((target.column - c), 2) + Math.pow((target.row - r), 2);
				if (distance_squared <= 2) {
				    threats.push(target);
				}
			    }
			    else {
				target.getMoves();
				for (var i = 0; i<target.availableMoves.length; i++) {
				    if (target.availableMoves[i][0] == c) {
					if (target.availableMoves[i][1] == r) {
					    threats.push(target);
					}
				    }
 				}
			    }
			    
			    
			}
		    }
		}
	    }
	    return threats;
	};
	//returns if the square is safe
	this.isSquareSafe = function(c,r) {
	    return this.squareThreats(c,r).length == 0;
	};
	
	//returns if the king is in check. not always called b/c memory reasons
	this.inCheck = function() {
	    return !this.isSquareSafe(this.column, this.row);
	};

	//returns if the king is checkmated
	this.checkmate = function() {
	    //if the enemy king is in check, you are not in checkmate
	    if (this.player.opponent.king.inCheck()) {
		console.log("The opponent's king is in check");
		return false;
	    }

	    //only checkmate if knight check, contact check, or double check
	    
	    var threats = this.squareThreats(this.column, this.row);
	    if (threats.length == 0) {
		console.log("Nothing is threatening the king");
		return false;
	    }
	    else if (threats.length == 1) {
		//must be contact or knight check
		if (threats[0].type != KNIGHT) { //not knight check
		    var distance_squared = Math.pow((threats[0].column - this.column), 2) + Math.pow((threats[0].row - this.row), 2);
		    if (distance_squared > 2) { //not contact check
			console.log("Not knight check or contact check");
			return false;
		    }
		}
		//if the attacking piece can be captured by a non-pinned piece, checkmate is false
		var defenders = this.squareThreats(threats[0].column, threats[0].row);
		for (var i = 0; i < defenders.length; i ++) {
		    if (!defenders[i].pinned) {
			console.log("The attacking piece can be taken");
			return false;
		    }
		}
	    }
	    //check for safe squares the king can move to
	    this.availableMoves.length =  0; //clear array of moves
	    this.checkKingSquare(this.column, this.row+1);
	    this.checkKingSquare(this.column+1, this.row+1);
	    this.checkKingSquare(this.column+1, this.row);
	    this.checkKingSquare(this.column+1, this.row-1);
	    this.checkKingSquare(this.column, this.row-1);
	    this.checkKingSquare(this.column-1, this.row-1);
	    this.checkKingSquare(this.column-1, this.row);
	    this.checkKingSquare(this.column-1, this.row+1);
	    if (this.availableMoves > 0) {
		console.log("There are safe moves for the king");
		return false;
	    }
	    console.log("checkmate");
	    return true;
	};
	
	this.getMoves = function() {
	    //checkmate will probably be called here with the checkKingSquare
	    
	    this.availableMoves.length = 0; //clear array of moves
	    //if (!this.checkmate()) {
		this.checkKingSquare(this.column, this.row+1);
		this.checkKingSquare(this.column+1, this.row+1);
		this.checkKingSquare(this.column+1, this.row);
		this.checkKingSquare(this.column+1, this.row-1);
		this.checkKingSquare(this.column, this.row-1);
		this.checkKingSquare(this.column-1, this.row-1);
		this.checkKingSquare(this.column-1, this.row);
		this.checkKingSquare(this.column-1, this.row+1);
	//}
	    /*
	    if (this.checkmate()) { //checkKingSquare will be called in here
		this.availableMoves.length = 0;
		return false; //return the game flag
	    }
	    */
	};
	break;
    case QUEEN:
	this.getMoves = function() {
	    this.availableMoves.length = 0; //clear array of moves
	    
	    this.extend(this.column+1,this.row,1,0); //E
	    this.extend(this.column+1,this.row-1,1,-1); //SE
	    this.extend(this.column,this.row-1,0,-1); //S
	    this.extend(this.column-1,this.row-1,-1,-1); //SW
	    this.extend(this.column-1,this.row,-1,0); //W
	    this.extend(this.column-1,this.row+1,-1,+1); //NW
	    this.extend(this.column,this.row+1,0,1); //N
	    this.extend(this.column+1,this.row+1,1,1); //NE
	    
	};
	break;
    case ROOK:
	this.getMoves = function() {
	    this.availableMoves.length = 0; //clear array of moves
	    
	    this.extend(this.column+1,this.row,1,0); //E
	    this.extend(this.column,this.row-1,0,-1); //S
	    this.extend(this.column-1,this.row,-1,0); //W
	    this.extend(this.column,this.row+1,0,1); //N
	    
	};
	break;
    case BISHOP:
	this.getMoves = function() {
	    this.availableMoves.length = 0; //clear array of moves
	    
	    this.extend(this.column+1,this.row-1,1,-1); //SE
	    this.extend(this.column-1,this.row-1,-1,-1); //SW
	    this.extend(this.column-1,this.row+1,-1,+1); //NW
	    this.extend(this.column+1,this.row+1,1,1); //NE

	};
	break;
    case KNIGHT:
	this.checkKnightSquare = function(c,r) {
	    if (squareExists(c,r)) {
		if (isSquareEmpty(this.board, c, r)) {
		    this.availableMoves.push([c,r,MOVE]);
		    return 1;
		}
		else {
		    var target = getPiece(this.board, c, r);
		    if (target.color != this.color) {
			this.availableMoves.push([c, r, CAPTURE]);
			return 1;
		    }
		}
	    }
	    return 0;
	};
	this.getMoves = function() {
	    this.availableMoves.length = 0; //clear array of moves

	    this.checkKnightSquare(this.column+1,this.row+2);
	    this.checkKnightSquare(this.column+2,this.row+1);
	    this.checkKnightSquare(this.column+1,this.row-2);
	    this.checkKnightSquare(this.column+2,this.row-1);
	    this.checkKnightSquare(this.column-1,this.row+2);
	    this.checkKnightSquare(this.column-2,this.row+1);
	    this.checkKnightSquare(this.column-1,this.row-2);
	    this.checkKnightSquare(this.column-2,this.row-1);
	};
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

function squareExists(column, row) {
    if (column < 0 || column > 7 || row < 0 || row > 7) {
	return false;
    }
    return true;
}

function isSquareEmpty(board, column, row) {
    if (column < 0 || column > 7 || row < 0 || row > 7) {
	return false; //square doesn't exist
    }
    if (board == 1) {
	return BoardA[column][row] == 0;
    }
    return BoardB[column][row] == 0;
}

function getPiece(board, column, row) {
    if (board == 1) {
	return BoardA[column][row];
    }
    return BoardB[column][row];
}

function printBoard(board) {
    var retStr = "";
    if (board == 1) {
	for (var y = 0; y < 8; y++) {
	    for (var x = 0; x < 8; x++) {
		var square = BoardA[x][y];
		if (square == 0) {
		    retStr = retStr + "-";
		}
		else {
		    retStr = retStr + square.type;
		}
	    }
	    retStr = retStr + "\n";
	}
    }
    else {
	for (var y = 0; y < 8; y++) {
	    for (var x = 0; x < 8; x++) {
		var square = BoardB[x][y];
		if (square == 0) {
		    retStr = retStr + "-";
		}
		else {
		    retStr = retStr + square.type;
		}
	    }
	    retStr = retStr + "\n";
	}
	
    }
    console.log(retStr);
}
