var c = document.getElementById("board1");
var ctx = c.getContext('2d');
//var ctx = $('board1').getContext("2d");

//console.log($('board1'))

for (var i=0;i<400;i+=50){
    ctx.moveTo(0,i);
    ctx.lineTo(400,i);
    ctx.stroke();
    ctx.moveTo(i,0);
    ctx.lineTo(i,400);
    ctx.stroke();
};

$('board1').on('click', function(e){
    var x = e.pageX - (e.pageX%50);
    var y = e.pageY - (e.pageY%50);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(x,y,50,50);
    console.log('click');
});  

console.log('done');
