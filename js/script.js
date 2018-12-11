
var w = window.innerWidth;
var h = window.innerHeight;
console.log(w,h);
gameDim = 0;
if(w < h){
  gameDim = w;
}else{
  gameDim = h;
}
$(".gameBoard").width(gameDim - 80);
$(".gameBoard").height(gameDim - 80);
console.log(gameDim);
