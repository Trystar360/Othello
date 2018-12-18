class Game{

    constructor(){
        //the color of the current player
        var playerColor = "white";
        //true for testing
        var isTesting = false;
        //used to ensure somthing happens only once on init
        var start = true;

        //Get the dimensions of the window. Used to size game 
        var w = window.innerWidth;
        var h = window.innerHeight;
        var gameDim = 0;
        var boardDim = 0;

        //an array with the first 8 letters un the alphabet
        var alph = ["A","B","C","D","E","F","G","H"];

        // used to ensure the look() method does not continue 
        var failed = false;

        //used to keep track of weather or not it is a valid move 
        var found = false;



        this.resize();
        this.makeTable();
        this.tableClick();
        this.gameSetup();
    }

    //Sets the game size according to the window dimensions 
    resize(){
        this.w = window.innerWidth;
        this.h = window.innerHeight;
            this.gameDim = 0;
        if(w < h){
            this.gameDim = w;
        }else{
            this.gameDim = h;
        }
        boardDim = (gameDim - 41) - (gameDim * .15);
        $(".gameBoard").width(boardDim);
        $(".gameBoard").height(boardDim);
  
    }

    //when called, creates a table
    makeTable(){
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
  
        //sets visual atributes atributes 
        $("#title").css("font-size", boardDim*.05)
        $("#title").css("letter-spacing", boardDim*.06);
        $("#title").css("padding-left", boardDim*.049);
        $("table").height(boardDim);
        $("table").width(boardDim);
        $(".cell").height(cellSize - 3.125);
        $(".cell").width(cellSize);
  
    }

    gameSetup(){
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
    }

    rowNumber(row){
        for(var i = 0; i < alph.length; i++){
            if(row == alph[i]){
                return i;
            }
        }
        console.log("inputr to rowNumber Doesnt match a letter");
        return null
    }

    getColor(cell){
        if($("#"+cell).hasClass("white")){
            return "white";
        }else if($("#"+cell).hasClass("black")){
            return "black";
        }
            return $("#"+cell).attr("class").substring(5,10);
    }

    getRow(cell){
        return cell.substring(0,1);
    }
      
    getCol(cell){
        return cell.substring(1);
    }
      
    sameColor(cell){
        
        if(getColor(cell) == playerColor)
        return true;
        else return false;
    }
      
    isPiece(cell){
        return $("#"+cell).hasClass("piece");
    }

    end(){
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++){
                var cell = alph[i] + j;
                if($("#"+cell).hasClass("flipped")){
                    $("#"+cell).removeClass("flipped")
                }
            }
        }
    }


      
}