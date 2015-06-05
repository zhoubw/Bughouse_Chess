var oldx = [0,0];
var oldy = [0,0];
var xplace = ['A','B','C','D','E','F','G','H'];
var yplace = ['8','7','6','5','4','3','2','1'];
var board1 = $('#board1')[0];
var board2 = $('#board2')[0];
var ctx1 = $('#board1')[0].getContext("2d");
var ctx2 = $('#board2')[0].getContext("2d");
var oldSquare = '00';
var lastPiece;
var turn = WHITE;
var turn2 = WHITE;
var move = false;
var drop = false;
var dropColor;
var drop2 = false;
var dropColor2;
var dropPiece;
var dropColor;
var dropPiece2;
var dropColor2;
var finished = false;
var selected = false;
var selected2 = false;
var oldCoord = [0,0];
var oldCoord2 = [0,0];
var colored = [ 'a1','a3','a5','a7',
                'b2','b4','b6','b8',
                'c1','c3','c5','c7',
                'd2','d4','d6','d8',
                'e1','e3','e5','e7',
                'f2','f4','f6','f8',
                'g1','g3','g5','g7',
                'h2','h4','h6','h8',
                'A1','A3','A5','A7',
                'B2','B4','B6','B8',
                'C1','C3','C5','C7',
                'D2','D4','D6','D8',
                'E1','E3','E5','E7',
                'F2','F4','F6','F8',
                'G1','G3','G5','G7',
                'H2','H4','H6','H8']
var wp = new Image(48,48);
wp.src = "static/chesspieces/alpha/wP.png";
var wn = new Image(48,48);
wn.src = "static/chesspieces/alpha/wN.png";
var wr = new Image(48,48);
wr.src = "static/chesspieces/alpha/wR.png";
var wb = new Image(48,48);
wb.src = "static/chesspieces/alpha/wB.png";
var wq = new Image(48,48);
wq.src = "static/chesspieces/alpha/wQ.png";
var wk = new Image(48,48);
wk.src = "static/chesspieces/alpha/wK.png";

var bp = new Image(48,48);
bp.src = "static/chesspieces/alpha/bP.png";
var bn = new Image(48,48);
bn.src = "static/chesspieces/alpha/bN.png";
var br = new Image(48,48);
br.src = "static/chesspieces/alpha/bR.png";
var bb = new Image(48,48);
bb.src = "static/chesspieces/alpha/bB.png";
var bq = new Image(48,48);
bq.src = "static/chesspieces/alpha/bQ.png";
var bk = new Image(48,48);
bk.src = "static/chesspieces/alpha/bK.png";

var makeLines = function(ctx){ //makeLines and makeSquares is initial load of board
    for (var i=0;i<=400;i+=50){
	ctx.beginPath();
	ctx.lineWidth="1";
	ctx.strokeStyle="#000000";
        ctx.moveTo(0,i);
        ctx.lineTo(400,i);
        ctx.stroke();
        ctx.moveTo(i,0);
        ctx.lineTo(i,400);
	ctx.closePath();
        ctx.stroke();
    }
};

var makeSquares = function(ctx){
    ctx.fillStyle="#FF9999"
    for (var i = 1;i < 400;i+=50){
        if (i%100==1){
            for (var j=51;j < 400;j+=100){
                ctx.fillRect(i,j,48,48);
            }
        }else{
            for (var j=1;j < 400;j+=100){
                ctx.fillRect(i,j,48,48);
            }
        }
    }
};

var getCoords = function(coord){ //returns array of [xcoor,ycoor,board#]
    var lett = coord.substr(0,1);
    var num = coord.substr(1,1);
    var xc = 0;
    var xy = 0;
    var b = 0;
    if (lett>='a'&&lett<='h'){
	b = 1;
	switch (lett){
	case 'a':
	    xc=1;
	    break;
	case 'b':
	    xc=51;
	    break;
	case 'c':
	    xc=101;
	    break;
	case 'd':
	    xc=151;
	    break;
	case 'e':
	    xc=201;
	    break;
	case 'f':
	    xc=251;
	    break;
	case 'g':
	    xc=301;
	    break;
	case 'h':
	    xc=351;
	    break;
	}
	switch(num){
	case '1':
	    yc=351;
	    break;
	case '2':
	    yc=301;
	    break;
	case '3':
	    yc=251;
	    break;
	case '4':
	    yc=201;
	    break;
	case '5':
	    yc=151;
	    break;
	case '6':
	    yc=101;
	    break;
	case '7':
	    yc=51;
	    break;
	case '8':
	    yc=1;
	    break;
	}
    }else{
	b = 2;
	switch (lett){
	case 'A':
	    xc=351;
	    break;
	case 'B':
	    xc=301;
	    break;
	case 'C':
	    xc=251;
	    break;
	case 'D':
	    xc=201;
	    break;
	case 'E':
	    xc=151;
	    break;
	case 'F':
	    xc=101;
	    break;
	case 'G':
	    xc=51;
	    break;
	case 'H':
	    xc=1;
	    break;
	}
	switch(num){
	case '1':
	    yc=1;
	    break;
	case '2':
	    yc=51;
	    break;
	case '3':
	    yc=101;
	    break;
	case '4':
	    yc=151;
	    break;
	case '5':
	    yc=201;
	    break;
	case '6':
	    yc=251;
	    break;
	case '7':
	    yc=301;
	    break;
	case '8':
	    yc=351;
	    break;
	}
    }
    return [xc,yc,b];
}

var hSquare  = function(coord){ //use to highlight certain squares
    var arr = getCoords(coord);
    if (arr[2]==1){
		ctx1.beginPath();
		ctx1.strokeStyle="#00FF00";
		ctx1.lineWidth="3";
		ctx1.rect(arr[0],arr[1],48,48);
		ctx1.closePath();
		ctx1.stroke();
    }else{
		ctx2.beginPath();
		ctx2.strokeStyle="#00FF00";
		ctx2.rect(arr[0],arr[1],48,48);
		ctx1.closePath();
		ctx2.stroke();
    }
}

var resetSquare = function(coord){ //resets square to original color
    var arr = getCoords(coord);
    if (arr[2]==1){
        if (colored.indexOf(coord)==-1){
            ctx1.fillStyle="#FFFFFF";
            ctx1.fillRect(arr[0],arr[1],48,48);
        }else{
            ctx1.fillStyle="#FF9999";
            ctx1.fillRect(arr[0],arr[1],48,48);
        }
    }else{
        if (colored.indexOf(coord)==-1){
            ctx2.fillStyle="#FFFFFF";
            ctx2.fillRect(arr[0],arr[1],48,48);
        }else{
            ctx2.fillStyle="#FF9999";
            ctx2.fillRect(arr[0],arr[1],48,48);
        }
    }
}

var drawPiece = function(piece){
    if (piece == 0){
	return;
    }
    if (piece.board==2){
	switch (piece.type){
	case PAWN:
	    if (piece.color){
		ctx2.drawImage(wp,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }else{
		ctx2.drawImage(bp,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }
	    break;
	case ROOK:
	    if (piece.color){
		ctx2.drawImage(wr,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }else{
		ctx2.drawImage(br,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }
	    break;
	case KNIGHT:
	    if (piece.color){
		ctx2.drawImage(wn,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }else{
		ctx2.drawImage(bn,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }
	    break;
	case BISHOP:
	    if (piece.color){
		ctx2.drawImage(wb,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }else{
		ctx2.drawImage(bb,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }
	    break;
	case QUEEN:
	    if (piece.color){
		ctx2.drawImage(wq,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }else{
		ctx2.drawImage(bq,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }
	    break;
	case KING:
	    if (piece.color){
		ctx2.drawImage(wk,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }else{
		ctx2.drawImage(bk,piece.column*50+1,(7-piece.row)*50+1,48,48);
	    }
	    break;
	}
    }else{
	switch (piece.type){
	case PAWN:
	    if (piece.color){
		ctx1.drawImage(wp,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }else{
		ctx1.drawImage(bp,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }
	    break;
	case ROOK:
	    if (piece.color){
		ctx1.drawImage(wr,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }else{
		ctx1.drawImage(br,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }
	    break;
	case KNIGHT:
	    if (piece.color){
		ctx1.drawImage(wn,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }else{
		ctx1.drawImage(bn,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }
	    break;
	case BISHOP:
	    if (piece.color){
		ctx1.drawImage(wb,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }else{
		ctx1.drawImage(bb,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }
	    break;
	case QUEEN:
	    if (piece.color){
		ctx1.drawImage(wq,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }else{
		ctx1.drawImage(bq,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }
	    break;
	case KING:
	    if (piece.color){
		ctx1.drawImage(wk,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }else{
		ctx1.drawImage(bk,(8-piece.column)*50-49,piece.row*50+1,48,48);
	    }
	    break;
	}
    }
}
	    

var loadPieces = function(){
    for (var i=0;i<8;i++){
	for (var j=0;j<8;j++){
	    if (BoardA[i][j] != 0){
		drawPiece(BoardA[i][j]);
	    }
	    if (BoardB[i][j] != 0){
		drawPiece(BoardB[i][j]);
	    }
	}
    }
}

var hMoves = function(piece){
    piece.getMoves();
    console.log(piece.availableMoves);
    //if empty don't do anything
    if (piece.availableMoves == []){
	return;
    }
    //for everything in available moves
    for (var i = 0;i<piece.availableMoves.length;i++){
	var coord = piece.availableMoves[i];
	hSquare(xplace[7-coord[0]].toLowerCase() + yplace[coord[1]]);
    }
    //use [0] as column [1] as row
    //highlight square
    //reset squares at end
}




var updateBoard = function(){
    ctx1.clearRect(0,0,400,400);
    makeLines(ctx1);
    makeSquares(ctx1);
    ctx2.clearRect(0,0,400,400);
    makeLines(ctx2);
    makeSquares(ctx2);
    loadPieces();
};


function click1(e,d,socket){
    var x = d['x'] - (d['x']%50);
    var y = d['y'] - (d['y']%50);
    var coord = [7-(x/50),y/50];

    if (finished){
    	alert("GAME IS FINISHED");
    	return;
    }

    //sends signal
    socket.emit('click1', {'data': coord});

    if (dropColor == turn){
	console.log("DROPPING PIECE WOO");
	if (turn == WHITE){
	    BoardA[coord[0]][coord[1]] = new Piece(white_A,white_A.color,dropPiece,1,coord[0],coord[1]);
	}else{
	    BoardA[coord[0]][coord[1]] = new Piece(black_A,black_A.color,dropPiece,1,coord[0],coord[1]);
	}
	updateBoard();
	drop = false;
	if (turn == WHITE){
	    if (black_A.king.checkmate()){
		alert("CHECKMATE");
		finished = true;
	    }
	    turn = BLACK;
	}else{
	    if(white_A.king.checkmate()){
		alert("CHECKMATE");
		finished = true;
	    }
	    turn = WHITE;
	}
	return;
    }
    
    if (!selected){
	if (isSquareEmpty(1,coord[0],coord[1])){
	    return;
	}
	if (BoardA[coord[0]][coord[1]].color==turn){
	    updateBoard();
	    hMoves(BoardA[coord[0]][coord[1]]);
	    oldCoord=coord;
	    oldSquare = xplace[7-coord[0]].toLowerCase() + yplace[coord[1]];	
	    selected = true;	    
	}else{
	    selected = false;
	}
    }else{
	//if works -> move piece, reset square, draw piece
	//if works -> turn = the other one
	//if doesnt work -> change selected
	var old_piece = BoardA[oldCoord[0]][oldCoord[1]]; 
	var returned = old_piece.move(coord[0],coord[1]);
	if (returned == false){//illegal move
	    if (BoardA[coord[0]][coord[1]] != 0 && BoardA[coord[0]][coord[1]].color == turn){//if same color as the turn rehighlight
		updateBoard();
		hMoves(BoardA[coord[0]][coord[1]]);
		oldCoord=coord;	
		oldSquare = xplace[7-coord[0]].toLowerCase() + yplace[coord[1]];	
		selected = true;
	    }else{
		selected = false;
	    }
	    return;//to break out of function when not moving
	}
	updateBoard();
	
	if (returned==-1){ //if it just moved to an empty square change turn
	    if (turn == WHITE){
		if (black_A.king.checkmate()){
		socket.emit('click1',{'data':"CHECKMATED ON BOARD 1"});
		    alert("CHECKMATE");
		    finished = true;
		    return;
		}
		turn = BLACK;
	    }else{
		if(white_A.king.checkmate()){
		socket.emit('click1',{'data':"CHECKMATED ON BOARD 1"});
		    alert("CHECKMATE");
		    finished = true;
		    return;
		}
		turn = WHITE;
	    }
	    selected = false;
	    return;
	}
	//check if the captured is a king
	if (returned.type == KING){
	    socket.emit('click1',{'data':"KING TAKEN ON BOARD 1"});
	    alert("KING TAKEN");
	    finished = true;
	    return;
	}
	//if it gets up to here it's a capture
	socket.emit("CAPTURED ON BOARD 1:");
	socket.emit(returned.color + returned.type);
	selected = false;
	if (turn==WHITE){
	    if (black_A.king.checkmate()){
		socket.emit('click1',{'data':"CHECKMATED ON BOARD 1"});
		alert("CHECKMATE");
		finished = true;
		return;
	    }
	    turn = BLACK;
	}else{
	    if (white_B.king.checkmate()){
		socket.emit('click1',{'data':"CHECKMATED ON BOARD 1"});
		alert("CHECKMATE");
		finished = true;
		return;
	    }
	    turn = WHITE;
	}
    }
}



function click2(e,d){
    var x = d['x'] - (d['x']%50);
    var y = d['y'] - (d['y']%50);
    var coord = [x/50,7-(y/50)];

    if (finished){
	alert("GAME IS FINISHED");
	return;
    }

    socket.emit('click2', {data:coord});
    
    if (dropColor2 == turn2){
    	console.log("DROPPING ON SECOND BOARD");
	if (turn2 == WHITE){
	    BoardB[coord[0]][coord[1]] = new Piece(white_B,white_B.color,dropPiece2,2,coord[0],coord[1]);
	    if (black_B.king.checkmate()){
		alert("CHECKMATE");
		finished = true;
		return;
	    }
	    turn = BLACK;
	}else{
	    BoardB[coord[0]][coord[1]] = new Piece(black_B,black_B.color,dropPiece2,2,coord[0],coord[1]);
	    if (white_B.king.checkmate()){
		alert("CHECKMATE");
		finished = true;
		return;
	    }
	    turn = WHITE;
	}
	updateBoard();
	drop2 = false;
	return;
    }

    if (!selected2){
	if (isSquareEmpty(2,coord[0],coord[1])){
	    return;
	}
	if (BoardB[coord[0]][coord[1]].color==turn2){
	    updateBoard();
	    hMoves(BoardB[coord[0]][coord[1]]);
	    oldCoord2 = coord;
	    oldSquare2 = xplace[7-coord[0]] + yplace[coord[1]];
	    selected = true;
	}else{
	    selected2 = false;
	}
    }else{
	var old_piece = BoardB[oldCoord2[0]][oldCoord2[1]];
	var returned = old_piece.move(coord[0],coord[1]);
	if (returned == false){
	    if (BoardB[coord[0]][coord[1]] != 0 && BoardB[coord[0]][coord[1]].color == turn){
		updateBoard();
		hMoves(BoardB[coord[0]][coord[1]]);
		oldCoord2 = coord;
		oldSquare2 = xplace[7-coord[0]] + yplace[coord[1]];
		selected = true;
	    }else{
		selected = false;
	    }
	    return;
	}
	
	updateBoard();

	if (returned == -1){
	    if (turn == WHITE){
		if (black_B.king.checkmate()){
		    socket.emit("CHECKMATED ON BOARD 2");
		    alert("CHECKMATE");
		    finished = true;
		    return;
		}
		turn = BLACK;
	    }else{
		if (white_B.king.checkmate()){
		    socket.emit("CHECKMATED ON BOARD 2");
		    alert("CHECKMATE");
		    finished = true;
		    return;
		}
		turn = WHITE;
	    }
	    selected = false;
	    return;
	}

	if (returned.type == KING){
	    socket.emit("KING TAKEN ON BOARD 2");
	    alert("KING TAKEN");
	    finished = true;
	    return;
	}
	
	//for captures
	socket.emit("CAPTURED ON BOARD 2:");
	socket.emit(returned.color + returned.type);
	selected = false;
	if (turn == WHITE){
	    if (black_B.king.checkmate()){
		socket.emit("CHECKMATED ON BOARD 2");
		alert("CHECKMATE");
		finished = true;
		return;
	    }
	    turn = BLACK;
	}else{
	    if (white_B.king.checkmate()){
		socket.emit("CHECKMATED ON BOARD 2");
		alert("CHECKMATE");
		finished = true;
		return;
	    }
	    turn = WHITE;
	}
    }
};

var handClick = function(id){
    if (id == "#hand1" || id == "#hand3"){
	$(id)[0].getContext('2d').drawImage(wp,5,25,50,50);
	$(id)[0].getContext('2d').drawImage(wn,5,100,50,50);
	$(id)[0].getContext('2d').drawImage(wb,5,175,50,50);
	$(id)[0].getContext('2d').drawImage(wr,5,250,50,50);
	$(id)[0].getContext('2d').drawImage(wq,5,325,50,50);
	if (id == "#hand1"){
	    $(id).on('click',function(e){
		var y = e.pageY - 50;
		drop = true;
		if (y >= 25 && y <= 75){
		    dropPiece = PAWN;
		    console.log("PAWN");
		    dropColor = WHITE;
		}
		if (y >= 100 && y <= 150){
		    dropPiece = KNIGHT;
		    console.log("KNIGHT");
		    dropColor = WHITE;
		}
		if (y >= 175 && y <= 225){
		    dropPiece = BISHOP;
		    console.log("BISHOP");
		    dropColor = WHITE;
		}
		if (y >= 250 && y <= 300){
		    dropPiece = ROOK;
		    console.log("ROOK");
		    dropColor = WHITE;
		}
		if (y >= 325 && y <= 375){
		    dropPiece = QUEEN;
		    console.log("QUEEN");
		    dropColor = WHITE;
		}
		console.log("DROP IS TRUE - 1");
	    });
	}else{
	    $(id).on('click',function(e){
		var y = e.pageY - 50;
		drop2 = true;
		if (y >= 25 && y <= 75){
		    dropPiece2 = PAWN;
		    console.log("PAWN");
		    dropColor2 = WHITE;
		}
		if (y >= 100 && y <= 150){
		    dropPiece2 = KNIGHT;
		    console.log("KNIGHT");
		    dropColor2 = WHITE;
		}
		if (y >= 175 && y <= 225){
		    dropPiece2 = BISHOP;
		    console.log("BISHOP");
		    dropColor2 = WHITE;
		}
		if (y >= 250 && y <= 300){
		    dropPiece2 = ROOK;
		    console.log("ROOK");
		    dropColor2 = WHITE;
		}
		if (y >= 325 && y <= 375){
		    dropPiece2 = QUEEN;
		    console.log("QUEEN");
		    dropColor2 = WHITE;
		}
		console.log("DROP IS TRUE - 2");
	    });
	}
    }else{
	$(id)[0].getContext('2d').drawImage(bp,5,25,50,50);
	$(id)[0].getContext('2d').drawImage(bn,5,100,50,50);
	$(id)[0].getContext('2d').drawImage(bb,5,175,50,50);
	$(id)[0].getContext('2d').drawImage(br,5,250,50,50);
	$(id)[0].getContext('2d').drawImage(bq,5,325,50,50);
	if (id == "#hand2"){
	    $(id).on('click',function(e){
		var y = e.pageY - 50;
		drop = true;
		if (y >= 25 && y <= 75){
		    dropPiece = PAWN;
		    console.log("PAWN");
		    dropColor = BLACK;
		}
		if (y >= 100 && y <= 150){
		    dropPiece = KNIGHT;
		    console.log("KNIGHT");
		    dropColor = BLACK;
		}
		if (y >= 175 && y <= 225){
		    dropPiece = BISHOP;
		    console.log("BISHOP");
		    dropColor = BLACK;
		}
		if (y >= 250 && y <= 300){
		    dropPiece = ROOK;
		    console.log("ROOK");
		    dropColor = BLACK;
		}
		if (y >= 325 && y <= 375){
		    dropPiece = QUEEN;
		    console.log("QUEEN");
		    dropColor = BLACK;
		}
		console.log("DROP IS TRUE - 3");
	    });
	}else{
	    $(id).on('click',function(e){
		var y = e.pageY - 50;
		drop2 = true;
		if (y >= 25 && y <= 75){
		    dropPiece2 = PAWN;
		    console.log("PAWN");
		    dropColor2 = BLACK;
		}
		if (y >= 100 && y <= 150){
		    dropPiece2 = KNIGHT;
		    console.log("KNIGHT");
		    dropColor2 = BLACK;
		}
		if (y >= 175 && y <= 225){
		    dropPiece2 = BISHOP;
		    console.log("BISHOP");
		    dropColor2 = BLACK;
		}
		if (y >= 250 && y <= 300){
		    dropPiece2 = ROOK;
		    console.log("ROOK");
		    dropColor2 = BLACK;
		}
		if (y >= 325 && y <= 375){
		    dropPiece2 = QUEEN;
		    console.log("QUEEN");
		    dropColor2 = BLACK;
		}
		console.log("DROP IS TRUE - 4");
	    });
	}
    }
}

var getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

$("#load").on('click',function(e){
    console.log('load');
    loadPieces();
});

window.onload = function(){
    
    //var socket = io.connect("http://localhost");
    //namespace = "/test";

    namespace = "";
    var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);

    socket.on('connect', function() {
        //socket.emit('my event', {data: 'I\'m connected!'});
	console.log("connected");
    });
    socket.on('my response', function(msg) {
        $('#log').append('<p>Received: ' + msg.data + '</p>');
    });
    $('form#emit').submit(function(event) {
        socket.emit('my event', {data: $('#emit_data').val()});
        return false;
    });
    $('form#broadcast').submit(function(event) {
        socket.emit('my broadcast event', {data: $('#broadcast_data').val()});
        return false;
    });

    board1.addEventListener('mousedown', function(evt){
	var mousePos = getMousePos(board1,evt);
	click1(evt,mousePos,socket);
	console.log(mousePos);
    
    }, false);
    
    board2.addEventListener('mousedown', function(evt){
	var mousePos = getMousePos(board2,evt);
	click2(evt,mousePos,socket);
	console.log(mousePos);
    }, false);
    
    
    ctx1.strokeStyle="#000000";
    ctx2.strokeStyle="#000000";
    makeLines(ctx1);
    makeLines(ctx2);
    makeSquares(ctx1);
    makeSquares(ctx2);
    Init();
    loadPieces();

    handClick("#hand1");
    handClick("#hand2");
    handClick("#hand3");
    handClick("#hand4");
};
