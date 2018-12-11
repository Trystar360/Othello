
var w = window.innerWidth;
var h = window.innerHeight;
console.log(w,h);
gameDim = 0;
if(w < h){
  gameDim = w;
}else{
  gameDim = h;
}
boardDim = gameDim - 80;
$(".gameBoard").width(boardDim);
$(".gameBoard").height(boardDim);

//an array with the first 8 letters un the alphabet
var alph = ["A","B","C","D","E","F","G","H"];

//when called, creates a table that is x by x
function makeTable(x){
  //creates x rows
  for(var i = 0; i < x; i++){
  $("#gameTable").append('<tr class="row" id="row' +alph[i]+ '"> </tr>');
  console.log('<tr id="cell' +alph[i]+ '> </tr>');
  }
  //creates x cells inside the rows
  for(var j = 0; j < x; j++){
    for(var i = 0; i < x; i++){
      curRow = "row" +alph[j];
      $("#"+curRow).append('<td class="cell" id="'+alph[j] + i +'"> </td>');
    }
  }
//sizes the cells
var cellSize = boardDim/x;
$("table").height(boardDim);
$("table").width(boardDim);
$(".cell").height(cellSize - 3.125);
$(".cell").width(cellSize);

}
makeTable(8);