class Look extends Player{
    constructor(){
        //An array used to add possible flips in look
        var array = []; 
        //array for possible moves
        var pMoves = [];
    }

    //looks in all directions for moves
    //@param cell
    //  the cell to start looking 
    //@param real
    //  used to tell the method what to do when it finds that the move is good  
    //
    look(cell, real){
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
        }
        end();
    }

    lookH(cell, real){
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
      
    lookV(cell, real){
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
      
      
    lookD(cell, real){
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
    
    openSpots(){
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

    test(start, cell, event, real){
        var curCell = cell;
        if(!isPiece(curCell)){
            failed = true; 
        }else{
            if(!failed){
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
                            skip();
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
}