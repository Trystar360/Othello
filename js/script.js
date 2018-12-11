
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
var alph = ["A","B","C","D","E","F","G","H"];
function makeTable(x){
  for(var i = 0; i < x; i++){
  $("#gameTable").append('<tr class="cell" id="cell' +alph[i]+ '"> </tr>');
  console.log('<tr id="cell' +alph[i]+ '> </tr>');
  }
  for(var i = 0; i < x; i++){
    curRow = "cell" +alph[i];
    $("#"+curRow).append('<td class="cell" id="'+curRow + i +'"> </td>');
  }
}
makeTable(8);