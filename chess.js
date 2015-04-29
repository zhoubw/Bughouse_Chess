console.log("test mode");

var PAWN = 'p';
var KING = 'k';
var QUEEN = 'q';
var ROOK = 'r';
var BISHOP = 'b';
var KNIGHT = 'n';

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

function Piece (type) {
    switch(type) {
    case PAWN:
	this.row = -1;
	this.column = -1; //temp
	this.getPosition = function(){
	    return -1;
	};
	this.move = function(){};
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
};

function Init() {
    // Fill the boards
};


