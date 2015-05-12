var oldx = [0,0];
var oldy = [0,0];
var xplace = ['A','B','C','D','E','F','G','H'];
var yplace = ['8','7','6','5','4','3','2','1'];
var board1 = $('#board1')[0];
var board2 = $('#board2')[0];
var ctx1 = $('#board1')[0].getContext("2d");
var ctx2 = $('#board2')[0].getContext("2d");
var oldSquare = '00';
var loaded = [false,false,false,false,false,false,false,false,false,false,false,false];
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



var makeLines = function(ctx){
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


var clicker = function(e,ctx,d){
    if (oldx%100==50){
        if (oldy%100==0){
            ctx.fillStyle = "#0101FF";
            ctx.fillRect(oldx+1,oldy+1,48,48);
        }else{
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(oldx+1,oldy+1,48,48);
        }
    }else{
        if (oldy%100==50){
            ctx.fillStyle = "#0101FF";
            ctx.fillRect(oldx+1,oldy+1,48,48);
        }else{
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(oldx+1,oldy+1,48,48);
        }
    }
    var x = d['x'] - (d['x']%50);
    var y = d['y'] - (d['y']%50);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(x+1,y+1,48,48);
    oldx = x;
    oldy = y;
    console.log(xplace[x/50]+yplace[y/50]);
}


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

var hSquare  = function(coord){
    var arr = getCoords(coord);
    if (arr[2]==1){
	ctx1.fillStyle="#00FF00";
	ctx1.fillRect(arr[0],arr[1],48,48);
    }else{
	ctx2.fillStyle="#00FF00";
	ctx2.fillRect(arr[0],arr[1],48,48);
    }
}

var resetSquare = function(coord){
    var arr = getCoords(coord);
    var ctx = ctx2;
    if (arr[2]==1){
	ctx = ctx1;
	var imgd = ctx.getImageData(arr[0],arr[1],1,1).data;
	if (imgd[1]=='FF' && imgd[2]=='FF'){
	    ctx1.fillStyle = "#FFFFFF";
	    ctx1.fillRect(arr[0], arr[1], 48, 48);
	}else{
	    ctx1.fillStyle = "#FF9999";
	    ctx1.fillRect(arr[0], arr[1], 48, 48);
	}
    }
}    


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var addPiece = function(piece,x,y){
    ctx = ctx1;
    if (piece.board == 2){
	ctx = ctx2;
    }
    switch (piece.type){
    case PAWN:
	if (piece.color){
	    ctx.drawImage(wp,x,y,48,48);
	}else{
	    ctx.drawImage(bp,x,y,48,48);
	}
	break;
    case ROOK:
	if (piece.color){
	    ctx.drawImage(wr,x,y,48,48);
	}else{
	    ctx.drawIamge(br,x,y,48,48);
	}
	break;
    }    
}

var loadPieces = function(){
    console.log('start');
    /*
    for (var i = 0;i<8;i++){
	for (var j=0;j<8;j++){
	    if (BoardA[i][j] != 0){
		addPiece(BoardA[i][j],i*50+1,400-(j+50+1));
		addPiece(BoardB[i][j],400-(i*50+1),j+50+1);
	    }
	}
    }
    */
    ctx1.drawImage(wr,1,351,48,48);
    ctx2.drawImage(wr,351,1,48,48);
    ctx1.drawImage(wr,351,351,48,48);
    ctx2.drawImage(wr,1,1,48,48);
    ctx1.drawImage(br,1,1,48,48);
    ctx2.drawImage(br,1,351,48,48);
    ctx1.drawImage(br,351,1,48,48);
    ctx2.drawImage(br,351,351,48,48);
    
    ctx1.drawImage(wn,51,351,48,48);
    ctx2.drawImage(wn,301,1,48,48);
    ctx1.drawImage(wn,301,351,48,48);
    ctx2.drawImage(wn,51,1,48,48);
    ctx1.drawImage(bn,51,1,48,48);
    ctx2.drawImage(bn,301,351,48,48);
    ctx1.drawImage(bn,301,1,48,48);
    ctx2.drawImage(bn,51,351,48,48);
    
    ctx1.drawImage(wb,101,351,48,48);
    ctx2.drawImage(wb,251,1,48,48);
    ctx1.drawImage(wb,251,351,48,48);
    ctx2.drawImage(wb,101,1,48,48);
    ctx1.drawImage(bb,101,1,48,48);
    ctx2.drawImage(bb,251,351,48,48);
    ctx1.drawImage(bb,251,1,48,48);
    ctx2.drawImage(bb,101,351,48,48);

    ctx1.drawImage(wk,151,351,48,48);
    ctx2.drawImage(wk,201,1,48,48);
    ctx1.drawImage(wq,201,351,48,48);
    ctx2.drawImage(wq,151,1,48,48);
    ctx2.drawImage(bk,151,351,48,48);
    ctx1.drawImage(bk,201,1,48,48);
    ctx2.drawImage(bq,201,351,48,48);
    ctx1.drawImage(bq,151,1,48,48);

    for (var a = 0;a<8;a++){
	ctx1.drawImage(wp,(a*50)+1,301,48,48);
	ctx1.drawImage(bp,(a*50)+1,51,48,48);
	ctx2.drawImage(bp,(a*50)+1,301,48,48);
	ctx2.drawImage(wp,(a*50)+1,51,48,48);
    }
    console.log('end');
}
	    
var loadPiecesR = function(i, j){
    
    if(BoardA[i][j] != 0){
	addPiece(BoardA[i][j]);
	addPiece(BoardB[i][j]);
    }
    if (i==8){
	return;
    }
    if (j==8){
	loadPiecesR(i+1,0);
    }
    loadPiecesR(i,j+1);
}


makeLines(ctx1);
makeLines(ctx2);
makeSquares(ctx1);
makeSquares(ctx2);

Init()
loadPieces();




var hMoves = function(piece){
    piece.getMoves();
    for (var i = 0;i<piece.availableMoves.length;i++){
	hSquare(xplace[piece.availableMoves[i][0]].toLowerCase() + yplace[piece.availableMoves[i][1]]);
    }
}















function click1(e,d){
    
    if (oldx[0]%100==50){
        if (oldy[0]%100==0){
            ctx1.fillStyle = "#FF9999";
            ctx1.fillRect(oldx+1,oldy+1,48,48);
        }else{
            ctx1.fillStyle = "#FFFFFF";
            ctx1.fillRect(oldx+1,oldy+1,48,48);
        }
    }else{
        if (oldy[0]%100==50){
            ctx1.fillStyle = "#FF9999";
            ctx1.fillRect(oldx+1,oldy+1,48,48);
        }else{
            ctx1.fillStyle = "#FFFFFF";
            ctx1.fillRect(oldx+1,oldy+1,48,48);
        }
    }
       //for resetting square color
    var x = d['x'] - (d['x']%50);
    var y = d['y'] - (d['y']%50);
    ctx1.fillStyle = "#00FF00";
    //oldx[0] = x;
    //oldy[0] = y;
    $('#place').html(oldSquare + ' - ' + xplace[x/50].toLowerCase() + yplace[y/50]);
    //if (oldSquare != '00'){
	//addPiece(xplace[x/50].toLowerCase() + yplace[y/50],'PAWN');
	//resetSquare(oldSquare);
    //}
    oldSquare = xplace[x/50].toLowerCase() + yplace[y/50];
    console.log(xplace[x/50].toLowerCase()+yplace[y/50]);
};



function click2(e,d){
    
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
    ctx2.fillStyle = "#00FF00";
    //oldx[1] = x;
    //oldy[1] = y;
    $('#place').html(oldSquare + " - " + xplace[7-(x/50)] + yplace[7-(y/50)]);
    oldSquare = xplace[7-(x/50)] + yplace[7-(y/50)];
    console.log(xplace[7-(x/50)]+yplace[7-(y/50)]);
};

console.log('done');
console.log('var a = new Piece(white_A,white_A.color,Piece name,board[1 or 2], column[0 to 7], row[0 to 7])');


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


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
