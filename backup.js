tableClick(){
    $(".cell").click(function(){
        console.log('\t---- New Turn ----');
        if(!$(this).hasClass('piece')){
            if(pcolor == 'white'){
                $(this).addClass('white piece');
            }
            else if(pcolor == 'black'){
                $(this).addClass('black piece');
            }
            var c = this.getcell($(this).attr('id'));
            var pos = c.look();
            // blank arr used in for loop below
            var arr;
            for(var i = 0; i < pos.length; i++){
                arr = pos[i];
                for(var j = 0; j < arr.length; j++){
                    arr[j].switchColor();
                }
            }

            // switches turn
            if(playerColor == "white"){
                playerColor = "black";
                $("#title").css("color", "black");
              }else{
                playerColor = "white";
                $("#title").css("color", "white");
              }
        }
        // reset possible cells
        this.resetTable();
    })
}