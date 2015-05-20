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
wp.src = "chesspieces/alpha/wP.png";
var wn = new Image(48,48);
wn.src = "chesspieces/alpha/wN.png";
var wr = new Image(48,48);
wr.src = "chesspieces/alpha/wR.png";
var wb = new Image(48,48);
wb.src = "chesspieces/alpha/wB.png";
var wq = new Image(48,48);
wq.src = "chesspieces/alpha/wQ.png";
var wk = new Image(48,48);
wk.src = "chesspieces/alpha/wK.png";

var bp = new Image(48,48);
bp.src = "chesspieces/alpha/bP.png";
var bn = new Image(48,48);
bn.src = "chesspieces/alpha/bN.png";
var br = new Image(48,48);
br.src = "chesspieces/alpha/bR.png";
var bb = new Image(48,48);
bb.src = "chesspieces/alpha/bB.png";
var bq = new Image(48,48);
bq.src = "chesspieces/alpha/bQ.png";
var bk = new Image(48,48);
bk.src = "chesspieces/alpha/bK.png";

var makeLines = function(ctx){ //makeLines and makeSquares is initial load of board
    for (var i=0;i<=400;i+=50){
        ctx.moveTo(0,i);
        ctx.lineTo(400,i);
        ctx.stroke();
        ctx.moveTo(i,0);
        ctx.lineTo(i,400);
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
	ctx1.fillStyle="#00FF00";
	ctx1.fillRect(arr[0],arr[1],48,48);
    }else{
	ctx2.fillStyle="#00FF00";
	ctx2.fillRect(arr[0],arr[1],48,48);
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
    if (piece.availableMoves == []){
	piece.getMoves();
	if (piece.availableMoves == []){
	    console.log("going to return");
	    return;
	}
    }
    for (var i = 0;i<piece.availableMoves.length;i++){
    	if (piece.board==1){
    	    hSquare(xplace[piece.availableMoves[i][0]].toLowerCase() + yplace[piece.availableMoves[i][1]]);
    	}else{
    	    hSquare(xplace[7-(x/50)]+yplace[7-(y/50)]);
    	}
    }
}


function click1(e,d){
    var x = d['x'] - (d['x']%50);
    var y = d['y'] - (d['y']%50);
    var coord = [7-(x/50),y/50];
    console.log(coord);
    
    if (!selected){
	if (isSquareEmpty(1,coord[0],coord[1])){
	    return;
	}
	if (BoardA[coord[0]][coord[1]].color==turn){
	    //hMoves(BoardA[coord[0]][coord[1]]);
	    oldCoord=coord;
    	    oldSquare = xplace[7-coord[0]].toLowerCase() + yplace[coord[1]];	
	    selected = true;
	}else{
	    selected = false;
	}
    }else{
	if (BoardA[oldCoord[0]][oldCoord[1]].move(coord[0],coord[1])){
	    console.log("MOVED");
	    //reset old square color
	    resetSquare(oldSquare);
	    resetSquare(xplace[7-coord[0]].toLowerCase() + yplace[coord[1]]);
	    //draw piece
	    drawPiece(BoardA[coord[0]][coord[1]]);
	    //change turn
	    if (turn == WHITE){
		turn = BLACK;
	    }else{
		turn = WHITE;
	    }
	}else{
	    console.log("NOT MOVING");
	    selected = false;
	}
	//if works -> move piece, reset square, draw piece
	//if works -> turn = the other one
	//if doesnt work -> change selected
	selected = false;
    }

    console.log("Selected:"+selected);
    console.log(turn);
    //ctx1.strokeStyle = "#0000FF";    
    //ctx1.strokeRect(x+2,y+2,46,46);

    
    /*
    if (move){
	if (BoardA[oldCoord[0]][oldCoord[1]].move(x/50,y/50)){
	    
	    resetSquare(oldSquare);
	    drawPiece(BoardA[oldCoord[0]][oldCoord[1]]);
	    drawPiece(BoardA[x/50][y/50]);
	    printBoard(1);
	}
	move = false;
    }
    
    oldSquare = xplace[x/50].toLowerCase() + yplace[y/50];
    oldCoord = [x/50,y/50];
    hMoves(BoardA[x/50][y/50]);
    console.log(move);

    if (BoardA[x/50][y/50] != 0){
	move = true;
	console.log(BoardA[x/50][y/50].availableMoves);
    }else{
        move = false;
    }
    console.log(BoardA);
    */
}



function click2(e,d){
    var x = d['x'] - (d['x']%50);
    var y = d['y'] - (d['y']%50);
    var coord2 = [x/50,7-(y/50)];
    
    if (!selected2){
	console.log("not selected 2");
	if (isSquareEmpty(2,coord2[0],coord2[1])){
	    return;
	}
	if (BoardA[coord[0]][coord[1]].color==turn){
	    //hMoves(BoardA[coord[0]][coord[1]]);
	    oldCoord2 = coord2;
	    oldSquare2 = xplace[7-coord2[0]] + yplace[coord2[1]];
	    selected2 = true;
	}else{
	    selected2 = false;
	}
    }else{
	console.log("selected 2");
	if (BoardB[oldCoord2[0]][oldCoord2[1]].move(coord2[0],coord2[1])){
	    console.log("MOVED 2");
	    resetSquare(oldSquare2);
	    resetSquare(xplace[7-coord2[0]] + yplace[coord2[1]]);
	    drawPiece(BoardB[coord2[0]][coord2[1]]);
	    if (turn2 == WHITE){
		turn2 = BLACK;
	    }else{
		turn2 = WHITE;
	    }
	}else{
	    console.log("NOT MOVING");
	}
	selected2 = false;
    }
    
    /*
      if (oldx[1]%100==50){
      if (oldy[1]%100==50){
            ctx2.fillStyle = "#FF9999";
            ctx2.fillRect(oldx+1,oldy+1,48,48);
        }else{
            ctx2.fillStyle = "#FFFFFF";
            ctx2.fillRect(oldx+1,oldy+1,48,48);
        }
    }else{
        if (oldy%100==0){
            ctx2.fillStyle = "#FF9999";
            ctx2.fillRect(oldx+1,oldy+1,48,48);
        }else{
            ctx2.fillStyle = "#FFFFFF";
            ctx2.fillRect(oldx+1,oldy+1,48,48);
        }
    }
     //for resetting square color
    var x = d['x'] - (d['x']%50);
    var y = d['y'] - (d['y']%50);
    ctx2.strokeStyle = "#0000FF";    
    ctx2.strokeRect(x+2,y+2,46,46);
    ctx2.fillStyle = "#00FF00";
    //oldx[1] = x;
    //oldy[1] = y;
    $('#place').html(oldSquare + " - " + xplace[7-(x/50)] + yplace[7-(y/50)]);

    if (move){
        if (legal(BoardB[xplace.indexOf(oldSquare.substr(0,1).toUpperCase())][yplace.indexOf(oldSquare.substr(1,1))] , xplace[7-(x/50)] + yplace[7-(y/50)])) {
            resetSquare(oldSquare);
            BoardB[x/50][y/50] = BoardA[xplace.indexOf(oldSquare.substr(0,1).toUpperCase())][yplace.indexOf(oldSquare.substr(1,1))];
            BoardB[xplace.indexOf(oldSquare.substr(0,1))][yplace.indexOf(oldSquare.substr(1,1))] = 0;
            ctx2.fillRect(x+1,y+1,48,48);
        }
        move = false;
    };

    oldSquare = xplace[7-(x/50)] + yplace[7-(y/50)];
    console.log(xplace[7-(x/50)]+yplace[7-(y/50)]);
    ctx2.strokeStype = "#000000";

    if (BoardB[x/50][y/50] != 0){
        move = true;
    }else{
        move = false;
    }
    */
};

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

board1.addEventListener('mousedown', function(evt){
    var mousePos = getMousePos(board1,evt);
    click1(evt,mousePos);
    console.log(mousePos);
    
}, false);

board2.addEventListener('mousedown', function(evt){
    var mousePos = getMousePos(board2,evt);
    click2(evt,mousePos);
    console.log(mousePos);
}, false);

window.onload = function(){
    ctx1.strokeStyle="#000000";
    ctx2.strokeStyle="#000000";
    makeLines(ctx1);
    makeLines(ctx2);
    makeSquares(ctx1);
    makeSquares(ctx2);
    Init();
    loadPieces();
};
