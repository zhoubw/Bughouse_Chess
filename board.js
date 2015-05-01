var oldx = [0,0];
var oldy = [0,0];
var xplace = ['A','B','C','D','E','F','G','H'];
var yplace = ['8','7','6','5','4','3','2','1'];
var ctx1 = $('#board1')[0].getContext("2d");
var ctx2 = $('#board2')[0].getContext("2d");
var oldSquare = '00'

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

/*
var clicker = function(e,ctx){
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
    var x = e.pageX - (e.pageX%50);
    var y = e.pageY - (e.pageY%50);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(x+1,y+1,48,48);
    oldx = x;
    oldy = y;
    console.log(xplace[x/50]+yplace[y/50]);
}
*/

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

var addPiece = function(coord,piece){
    console.log(piece);
    var arr = getCoords(coord);
    if (arr[2]==1){
	base_image = new Image();
	base_image.src = 'chesspieces/alpha/wP.png';
	base_image.onload = function(){
	    ctx1.drawImage(base_image, arr[0], arr[1], 48, 48);
	}
    }else{
	base_image = new Image();
	base_image.src = 'chesspieces/alpha/wP.png';
	base_image.onload = function(){
	    ctx2.drawImage(base_image, arr[0], arr[1], 48, 48);
	}
    }
}

var loadPieces = function(board,context){
    for (var i =0;i<8;i++){
	for (var j=0;j<8;j++){
	    //need to wait until the format for the board storage is finished
	    j=j;
	}
    }
}


makeLines(ctx1);
makeLines(ctx2);
makeSquares(ctx1);
makeSquares(ctx2);

$('#board1').on('click', function(e){
    /*
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
    */ //for resetting square color
    var x = e.pageX - (e.pageX%50);
    var y = e.pageY - (e.pageY%50);
    ctx1.fillStyle = "#00FF00";
    hSquare(xplace[x/50].toLowerCase() + yplace[y/50]);
    //oldx[0] = x;
    //oldy[0] = y;
    $('#place').html(oldSquare + ' - ' + xplace[x/50].toLowerCase() + yplace[y/50]);
    if (oldSquare != '00'){
	addPiece(xplace[x/50].toLowerCase() + yplace[y/50],'PAWN');
	resetSquare(oldSquare);
    }
    oldSquare = xplace[x/50].toLowerCase() + yplace[y/50];
    console.log(xplace[x/50].toLowerCase()+yplace[y/50]);
});

$('#board2').on('click', function(e){
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
    */ //for resetting square color
    var x = e.pageX - (e.pageX%50)-400;
    var y = e.pageY - (e.pageY%50);
    ctx2.fillStyle = "#00FF00";
    hSquare(xplace[7-(x/50)] + yplace[7-(y/50)]);
    //oldx[1] = x;
    //oldy[1] = y;
    $('#place').html(oldSquare + " - " + xplace[7-(x/50)] + yplace[7-(y/50)]);
    oldSquare = xplace[7-(x/50)] + yplace[7-(y/50)];
    console.log(xplace[7-(x/50)]+yplace[7-(y/50)]);
});
console.log('done');
