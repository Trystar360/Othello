class Player extends Game{
    constructor(id){
        var playerId = id;

    }

    //handles clicks on cells
    tableClick(){
        //on the event of a cell being clicked on 
        $(".cell").click(function(){
            array = [];
            console.log("-----------new "+ playerColor + " turn-----------");
            //white = black 
            //black = white
            //adds piece class 
                if(!$(this).hasClass("piece")){
                    if(playerColor == "white"){
                        $(this).addClass("white piece");
                    }
                    if(playerColor == "black"){
                    $(this).addClass("black piece");
                    }
                    //runs look method on cell 
                    look($(this).attr("id"), true);

                    if(found){
                        if(playerColor == "white"){
                            playerColor = "black";
                            $("#title").css("color", "black");
                        }else{
                            playerColor = "white";
                            $("#title").css("color", "white");
                        }
                    }
                }
                openSpots();
                if(start == false){
                    skip();
                }
            }
        )
    }

    switchColor(cell){
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

    skip(){
        console.log(pMoves);
        if(pMoves.length < 1){
            if(playerColor == "white"){
                playerColor = "black";
                $("#title").css("color", "black");
            }else{
                playerColor = "white";
                $("#title").css("color", "white");
            }
            openSpots();
        }
        
    }
}