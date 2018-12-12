var playerColor = "white";
var isTesting = true;
var w = window.innerWidth;
var h = window.innerHeight;
gameDim = 0;
if(w < h){
  gameDim = w;
}else{
  gameDim = h;
}
boardDim = gameDim - (80 );
$(".gameBoard").width(boardDim);
$(".gameBoard").height(boardDim);

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

$("#D3").addClass("white piece");
$("#D4").addClass("black piece");
$("#E3").addClass("black piece");
$("#E4").addClass("white piece");

}
makeTable(8);
tableClick()
function tableClick(){
  $(".cell").click(function(){
    if(!$(this).hasClass("piece")){
      if(playerColor == "white"){
        $(this).addClass("white piece");
      }
      if(playerColor == "black"){
        $(this).addClass("black piece");
      }
      look($(this).attr("id"));

      if(playerColor == "white"){
        playerColor = "black";
        $("#title").css("color", "black");
      }else{
        playerColor = "white";
        $("#title").css("color", "white");
      }
    }
    
  })
}
var found = false;
function look(cell){
  if(isTesting == false)
    found = false;
  else  
  found = true;
  
  lookH(cell);
  lookV(cell);
  lookD(cell);
  console.log(found);
  if(found == false){
    $("#"+cell).removeClass("piece");
    $("#"+cell).removeClass("white");
    $("#"+cell).removeClass("black");
    if(playerColor == "white")
    playerColor = "black";
    else
    playerColor = "white";
  }
}



function lookH(cell){
  var ra = [];
  //look Right
  var curCheck = parseInt(getCol(cell)) + 1;
  var failed = false;
  for(curCheck; curCheck < 8; curCheck++){
    var curCell = getRow(cell) + curCheck;
    if(!isPiece(curCell)){failed = true;}else{
      if(!failed){
        if(sameColor(getRow(cell)+curCheck)){
          console.log(ra);
          for(var i = 0;i < ra.length; i ++){
            found = true;
            var pieceColor = getColor(ra[i]);
            if(pieceColor == "white"){
              $("#"+ra[i]).removeClass("white");
              $("#"+ra[i]).addClass("black");
            }else{
              $("#"+ra[i]).removeClass("black");
              $("#"+ra[i]).addClass("white");
            }
            
          }
          failed = true;
          console.log(getRow(cell)+curCheck);
        }else if(!sameColor(getRow(cell)+curCheck)){
          ra.push(getRow(cell)+curCheck);
        }
      }else{
        failed = true;
      }
      }
      

  }

    //look Left
    var curCheck = parseInt(getCol(cell)) - 1;
    var failed = false;
    for(curCheck; curCheck >-1; curCheck--){
      var curCell = getRow(cell) + curCheck;
      if(!isPiece(curCell)){failed = true}else{
        if(!failed){
          if(sameColor(getRow(cell)+curCheck)){
            for(var i = 0;i < ra.length; i ++){
              found = true;
              var pieceColor = getColor(ra[i]);
              if(pieceColor == "white"){
                
                $("#"+ra[i]).removeClass("white");
                $("#"+ra[i]).addClass("black");
              }else{
                $("#"+ra[i]).removeClass("black");
                $("#"+ra[i]).addClass("white");
              }
              
            }
            failed = true;
            console.log(getRow(cell)+curCheck);
          }else if(!sameColor(getRow(cell)+curCheck)){
            ra.push(getRow(cell)+curCheck);
          }
        }else{
          failed = true;
        }
        }
        
  
    }


}

function lookV(cell){
  var ua = [];
  var da = [];

  var curRowNum = rowNumber(cell.substring(0,1))

  //look down

  var curCheck = parseInt(curRowNum) + 1;
  var failed = false;
  for(curCheck; curCheck < 8; curCheck++){
    var curCell = alph[curCheck] + getCol(cell);
    if(!isPiece(curCell)){failed = true}else{
      if(!failed){
        if(sameColor(alph[curCheck] + getCol(cell))){
          for(var i = 0;i < da.length; i ++){

            found = true;
            var pieceColor = getColor(da[i]);
            if(pieceColor == "white"){
              $("#"+da[i]).removeClass("white");
              $("#"+da[i]).addClass("black");
            }else{
              $("#"+da[i]).removeClass("black");
              $("#"+da[i]).addClass("white");
            }
            
          }
          failed = true;
          console.log(alph[curCheck] + getCol(cell));
        }else if(!sameColor(alph[curCheck] + getCol(cell))){
          da.push(alph[curCheck] + getCol(cell));
        }
      }else{
        failed = true;
      }
      }
      
  }

    //look up

     curCheck = parseInt(curRowNum) - 1;
     failed = false;
    for(curCheck; curCheck > -1; curCheck--){
      var curCell = alph[curCheck] + getCol(cell);
      if(!isPiece(curCell)){failed = true}else{
        if(!failed){
          if(sameColor(alph[curCheck] + getCol(cell))){
            for(var i = 0;i < da.length; i ++){
              found = true;
              var pieceColor = getColor(da[i]);
              if(pieceColor == "white"){
                $("#"+da[i]).removeClass("white");
                $("#"+da[i]).addClass("black");
              }else{
                $("#"+da[i]).removeClass("black");
                $("#"+da[i]).addClass("white");
              }
              
            }
            failed = true;
            console.log(alph[curCheck] + getCol(cell));
          }else if(!sameColor(alph[curCheck] + getCol(cell))){
            da.push(alph[curCheck] + getCol(cell));
          }
        }else{
          failed = true;
        }
        }
        
    }
}

function lookD(cell){
  var ua = [];
  var da = [];

  var curRowNum = rowNumber(cell.substring(0,1))

  //look down Right
  var curCheckRow = parseInt(curRowNum) + 1;
  var curCheckCol = parseInt(getCol(cell)) +1;
  var startRow = curCheckRow;
  var startCol = curCheckCol;
  var failed = false;
  da = [];
  for(curCheckRow && curCheckCol; curCheckRow < 8 && curCheckCol < 8; curCheckRow++ && curCheckCol++){
    var curCell = alph[curCheckRow] + curCheckCol;
    if(!isPiece(curCell)){failed = true}else{
      if(!failed){
        if(sameColor(curCell)){
          for(var i = 0;i < da.length; i ++){
            switchColor(da[i]);
            console.log("flipped " + da[i] + " dr");
          }
          failed = true;
        }else if(!sameColor(curCell)){
          da.push(curCell);
        }
      }else{
        failed = true;
      }
      }
      
  }
//------------------------------------------------------------------\\
 //look Up Right
  var curCheckRow = parseInt(curRowNum) - 1;
  var curCheckCol = parseInt(getCol(cell)) +1;
  var startRow = curCheckRow;
  var startCol = curCheckCol;
  var failed = false;
  da = [];
  for(curCheckRow && curCheckCol; curCheckRow > -1 && curCheckCol < 8; curCheckRow-- && curCheckCol++){
        var curCell = alph[curCheckRow] + curCheckCol;
    if(!isPiece(curCell)){failed = true}else{
      if(!failed){
        if(sameColor(curCell)){
          for(var i = 0;i < da.length; i ++){
            switchColor(da[i]);
            console.log("flipped " + da[i] + " ur");
          }
          failed = true;
        }else if(!sameColor(curCell)){
          da.push(curCell);
        }
      }else{
        failed = true;
        
      }
      }
      
  }

  //------------------------------------------------------------------\\

  //look Up Left
  var curCheckRow = parseInt(curRowNum) - 1;
  var curCheckCol = parseInt(getCol(cell)) -1;
  var startRow = curCheckRow;
  var startCol = curCheckCol;
  var failed = false;
  da = [];
  for(curCheckRow && curCheckCol; curCheckRow > -1 && curCheckCol > -1; curCheckRow-- && curCheckCol--){
    console.log(curCheckRow, curCheckCol);
    var curCell = alph[curCheckRow] + curCheckCol;
    console.log(curCell);
    if(!isPiece(curCell)){failed = true}else{
      if(!failed){
        if(sameColor(curCell)){
          for(var i = 0;i < da.length; i ++){
            switchColor(da[i]);
            console.log("flipped " + da[i] + " ul");
          }
          failed = true;
        }else if(!sameColor(curCell)){
          da.push(curCell);
        }
      }else{
        failed = true;
      }
      }
      
  }

  //------------------------------------------------------------------\\
 //look Down Left
 var curCheckRow = parseInt(curRowNum) + 1;
 var curCheckCol = parseInt(getCol(cell))-1 ;
 var startRow = curCheckRow;
 var startCol = curCheckCol;
 var failed = false;
 da = [];
 for(curCheckRow && curCheckCol; curCheckRow < 8 && curCheckCol> -1; curCheckRow++ && curCheckCol--){
   var curCell = alph[curCheckRow] + curCheckCol;
   if(!isPiece(curCell)){failed = true}else{
     if(!failed){
       if(sameColor(curCell)){
         for(var i = 0;i < da.length; i ++){
           switchColor(da[i]);
           console.log(da);
           console.log("flipped " + da[i] + " dl");
         }
         failed = true;
       }else if(!sameColor(curCell)){
         da.push(curCell);
       }
     }else{
       failed = true;
     }
     }
     
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
           if(pieceColor == "white"){
             $("#"+cell).removeClass("white");
             $("#"+cell).addClass("black");
           }else{
             $("#"+cell).removeClass("black");
             $("#"+cell).addClass("white");
           }
           
}