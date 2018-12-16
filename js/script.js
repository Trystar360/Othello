//the color of the current player
var playerColor = "white";
//true for testing
var isTesting = true;
var pMoves = [];
var start = true;
var w = window.innerWidth;
var h = window.innerHeight;
var gameDim = 0;
var boardDim = 0;
var array = [];
resize();
function resize(){
  w = window.innerWidth;
  h = window.innerHeight;
  gameDim = 0;
if(w < h){
  gameDim = w;
}else{
  gameDim = h;
}
boardDim = gameDim - (gameDim * .15);
$(".gameBoard").width(boardDim);
$(".gameBoard").height(boardDim);

}
//an array with the first 8 letters un the alphabet
var alph = ["A","B","C","D","E","F","G","H"];

//when called, creates a table that is x by x
function makeTable(x){
  //creates x rows
  for(var i = 0; i < x; i++){
  $("#gameTable").append('<tr class="row" id="row' +alph[i]+ '"> </tr>');
  }
  //creates x cells inside the rows
  for(var j = 0; j < x; j++){
    for(var i = 0; i < x; i++){
      curRow = "row" +alph[j];
      $("#"+curRow).append('<td class="cell " id="'+alph[j] + i +'"> </td>');
    }
  }
//sizes the cells
var cellSize = boardDim/x;

$("#title").css("font-size", boardDim*.05)
$("#title").css("letter-spacing", boardDim*.06);
$("#title").css("padding-left", boardDim*.049);
$("table").height(boardDim);
$("table").width(boardDim);
$(".cell").height(cellSize - 3.125);
$(".cell").width(cellSize);


}
makeTable(8);
tableClick()
function tableClick(){
  
  $(".cell").click(function(){
    array = [];
    console.log("-----------new "+ playerColor + " turn-----------");
    if(!$(this).hasClass("piece")){
      if(playerColor == "white"){
        $(this).addClass("white piece");
      }
      if(playerColor == "black"){
        $(this).addClass("black piece");
      }
      look($(this).attr("id"), true);
      console.log(playerColor);
      if(found){  if(playerColor == "white"){
          playerColor = "black";
          $("#title").css("color", "black");
        }else{
          playerColor = "white";
          $("#title").css("color", "white");
        }}
    }
    openSpots();
    if(start == false){
      skip();
    }
  })
}

var failed = false;
var found = false;
function look(cell, real){
  if(isTesting == false)
    found = false;
  else  
  found = true;
  
  lookH(cell, real);
  lookV(cell, real );
  lookD(cell, real);
  if(found == false){
    $("#"+cell).removeClass("piece");
    $("#"+cell).removeClass("white");
    $("#"+cell).removeClass("black");
  //   if(playerColor == "white")
  //   playerColor = "black";
  //   else
  //   playerColor = "white";
   }
  end();
}



function lookH(cell, real){
  //look Right
  array = [];
  curCheck = parseInt(getCol(cell)) + 1;
  failed = false;
  for(curCheck; curCheck < 8; curCheck++){
    test(cell, getRow(cell) + curCheck, "r", real);
  }

    //look Left
    array = [];
    curCheck = parseInt(getCol(cell)) - 1;
    failed = false;
    for(curCheck; curCheck >-1; curCheck--){
      test(cell, getRow(cell) + curCheck, "l", real)
    }


}

function lookV(cell, real){
  var curRowNum = rowNumber(cell.substring(0,1))

  //look down
  array = [];
  var curCheck = parseInt(curRowNum) + 1;
  failed = false;
  for(curCheck; curCheck < 8; curCheck++){
    test(cell, alph[curCheck] + getCol(cell), "d", real);
  }

    //look up
    array = [];
    curCheck = parseInt(curRowNum) - 1;
    failed = false;
    for(curCheck; curCheck > -1; curCheck--){
      test(cell, alph[curCheck] + getCol(cell), "u", real);
      //console.log(alph[curCheck] + getCol(cell));
      
    }
}


function lookD(cell, real){
  var curRowNum = rowNumber(cell.substring(0,1))

  //look down Right
  var curCheckRow = parseInt(curRowNum) + 1;
  var curCheckCol = parseInt(getCol(cell)) +1;
  failed = false;
  array = [];
  for(curCheckRow && curCheckCol; curCheckRow < 8 && curCheckCol < 8; curCheckRow++ && curCheckCol++){
    test(cell, alph[curCheckRow] + curCheckCol, "dr", real);
  }
//------------------------------------------------------------------\\
 //look Up Right
  var curCheckRow = parseInt(curRowNum) - 1;
  var curCheckCol = parseInt(getCol(cell)) +1;
  failed = false;
  array = [];
  for(curCheckRow && curCheckCol; curCheckRow > -1 && curCheckCol < 8; curCheckRow-- && curCheckCol++){
      test(cell, alph[curCheckRow] + curCheckCol, "ur", real);
  }

  //------------------------------------------------------------------\\

  //look Up Left
  var curCheckRow = parseInt(curRowNum) - 1;
  var curCheckCol = parseInt(getCol(cell)) -1;
  failed = false;
  array = [];
  for(curCheckRow && curCheckCol; curCheckRow > -1 && curCheckCol > -1; curCheckRow-- && curCheckCol--){
    test(cell, alph[curCheckRow] + curCheckCol, "ul", real);
  }

  //------------------------------------------------------------------\\
 //look Down Left
 var curCheckRow = parseInt(curRowNum) + 1;
 var curCheckCol = parseInt(getCol(cell))-1 ;
  failed = false;
 array = [];
 for(curCheckRow && curCheckCol; curCheckRow < 8 && curCheckCol> -1; curCheckRow++ && curCheckCol--){
   test(cell, alph[curCheckRow] + curCheckCol, "dl", real);
 }

 //------------------------------------------------------------------\\
}
function rowNumber(row){
  for(var i = 0; i < alph.length; i++){
    if(row == alph[i]){
      return i;
    }
}
console.log("inputr to rowNumber Doesnt match a letter");
      return null
}

function getColor(cell){
  if($("#"+cell).hasClass("white")){
    return "white";
  }else if($("#"+cell).hasClass("black")){
    return "black";
  }
  
 return $("#"+cell).attr("class").substring(5,10);
}

function getRow(cell){
  return cell.substring(0,1);
}

function getCol(cell){
  return cell.substring(1);
}

function sameColor(cell){
  
  if(getColor(cell) == playerColor)
  return true;
  else return false;
}

function isPiece(cell){
  return $("#"+cell).hasClass("piece");
}

function switchColor(cell){
  var pieceColor = getColor(cell);
  found = true;
          if(!$("#"+cell).hasClass("flipped")){
            if(pieceColor == "white"){
              $("#"+cell).removeClass("white");
              $("#"+cell).addClass("black flipped");
            }else{
              $("#"+cell).removeClass("black");
              $("#"+cell).addClass("white flipped");
            }
          }
           
}

function openSpots(){
  pMoves = [];
  for(var i = 0; i < 8; i++){
    for(var j = 0; j < 8; j++){
      var cell = alph[i] + j;
      if($("#"+cell).hasClass("possible")){
        $("#"+cell).removeClass("possible");
      }
    }
  }
  for(var i = 0; i < 8; i++){
    for(var j = 0; j < 8; j++){
      if(!$("#"+alph[i] + j).hasClass("piece")){
        look(alph[i] + j, false);
      }
      
    }
  }
}

function end(){
  for(var i = 0; i < 8; i++){
    for(var j = 0; j < 8; j++){
      var cell = alph[i] + j;
      if($("#"+cell).hasClass("flipped")){
        $("#"+cell).removeClass("flipped")
      }
    }
  }
}


function test(start, cell, event, real){
  var curCell = cell;
   if(!isPiece(curCell)){failed = true; }else{
     if(!failed){
      //
       if(sameColor(curCell)){
         failed = true;
        if(real){
         for(var i = 0;i < array.length; i ++){
          console.log(array, event);
           switchColor(array[i]);
         }
        }else{
          if(array.length > 0){
            $("#"+start).addClass("possible");
            pMoves.push(start);
          }
        }
       }else{
         array.push(curCell);
       }
     }else{
       failed = true;
     }
     }
}

if(isTesting == false && start == true){
  isTesting = true;
  $("#D3").click();
  $("#D4").click();
  $("#E4").click();
  $("#E3").click();
  isTesting = false;
  //playerColor = "white";
  start = false
}


function skip(){
  console.log(pMoves);
  if(pMoves.length < 1){
    if(playerColor == "white"){
      playerColor = "black"
    }else{
      playerColor = "white";
    }
  }
}