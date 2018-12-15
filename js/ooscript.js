/*
Authors: Tristan Frederick and Daniel Frederick
Date: December 15, 2018

TODO:
- fix resize method
- write switchColor method in cell class
- write showPos method in game class
*/

var alph = ["A","B","C","D","E","F","G","H"];

// window variables
var w = window.innerWidth;
var h = window.innerHeight;
var gameDim = 0;
var boardDim = 0;

// ------------------------change
var curRow

// if testing code
var testing = true;

// initialize empty array for look method
var array = [];

// initialize game board size to 8
var size = 8;

class cell {
    constructor(row, col, g, state = 0) {
        this.row = row;
        this.col = col;
        //  0 unclicked, 1 white or 2 black
        this.state = state;
        this.id = alph[row] + this.col;
        // game piece is a part of
        this.g = g
    }

    // returns completed line
    look() {
        // initialize row and column
        var r = this.row
        var c = this.col
        // line containing cells to be flipped
        var line = []
        // continue checking line
        var cont = true;
        // valid move
        var found = false;
        // if testing, every move is valid
        if(testing == true){
            found = true;
        }

        // look right -------------------
        // current column being checked
        c = this.col + 1;
        line = [];
        for(c; c < size; c++){
            // test piece
            if(!this.test(g.table[this.row[c]], line)){
                break;
            }
        }
        if(line.length > 0){
            array.push(line);
        }

        // look left --------------------
        // current column being checked
        c = this.col - 1;
        line = [];
        for(c; c > -1; c--){
            // test piece
            if(!this.test(g.table[this.row[c]], line)){
                break;
            }
        }
        if(line.length > 0){
            array.push(line);
        }

        // look up ----------------------
        // current row being checked
        r = this.row - 1;
        line = [];
        for(r; r > -1; r--){
            // test piece
            if(!this.test(g.table[this.row[c]], line)){
                break;
            }
        }

        // look down ----------------------
        // current row being checked
        r = this.row + 1;
        line = [];
        for(r; r < size; r++){
            // test piece
            if(!this.test(g.table[this.row[c]], line)){
                break;
            }
        }

        // look down right
        // current row and column being checked
        r = this.row + 1;
        c = this.col + 1;
        line = [];
        for(r && c; r < size && c < size; r++ && c++){
            if(!this.test(g.table[this.row[c]], line)){
                break;
            }
        }

        // look down left
        // current row and column being checked
        r = this.row + 1;
        c = this.col - 1;
        line = [];
        for(r && c; r < size && c > -1; r++ && c--){
            if(!this.test(g.table[this.row[c]], line)){
                break;
            }
        }

        // look up right
        // current row and column being checked
        r = this.row - 1;
        c = this.col + 1;
        line = [];
        for(r && c; r > -1 && c < size; r-- && c++){
            if(!this.test(g.table[this.row[c]], line)){
                break;
            }
        }

        // look up left
        // current row and column being checked
        r = this.row - 1;
        c = this.col - 1;
        line = [];
        for(r && c; r > -1 && c > -1; r-- && c--){
            if(!this.test(g.table[this.row[c]], line)){
                break;
            }
        }
    }

    test(c, line) {
        // id of the cell being checked
        var cellid = cell.id;

        if(c.state == 0){
            cont == false;
        }
        if(cont){
            if(!this.sameColor(c)){
                line.push(c);
            }else if(this.sameColor(c)){
                return false;
            }else{
                line = [];
            }
        }
    }

    // returns true if this cell and cell are the same color, else false
    sameColor(cell) {
        if(this.state == cell.state){
            return true
        }else{
            return false
        }
    }

    // switches color of cell to opposite
    switchColor() {

    }
}

class game {
    constructor(size = 8) {
        // initialize player color
        this.pcolor = 'white'
        // initialize board size, default 8
        this.size = size;
        // initialize array for game cells
        this.table = []

        // resize the window based on browser environment
        this.initWindow();
        // blank array
        var barr = []
        // create rows in game table
        for(var i; i < this.size; i++){
            $("#gameTable").append('<tr class="row" id="row' +alph[i]+ '"> </tr>');
            this.table.push(barr);
        }

        // creat columns in game table
        for(var j = 0; j < this.size; j++){
            for(var i = 0; i < this.size; i++){
              curRow = "row" +alph[j];
              $("#"+curRow).append('<td class="cell " id="'+alph[j] + i +'"> </td>');
              var c = new cell(j, i, this)
              this.table[j].push(c)
            }
        }

        // continuously check if cell is clicked...
        this.tableClick()
    }

    // resizes game window based on browser environment
    initWindow(){
        // set window size
        w = window.innerWidth;
        h = window.innerHeight;
        gameDim = 0;
        // makes window square
        if(w < h){
            gameDim = w;
        }
        else{
            gameDim = h;
        }
        boardDim = gameDim - (gameDim * .15);
        $(".gameBoard").width(boardDim);
        $(".gameBoard").height(boardDim);

        // set cell sizes
        var cellSize = boardDim/this.size;

        $("#title").css("font-size", boardDim*.05)
        $("#title").css("letter-spacing", boardDim*.06);
        $("#title").css("padding-left", boardDim*.049);
        $("table").height(boardDim);
        $("table").width(boardDim);
        $(".cell").height(cellSize - 3.125);
        $(".cell").width(cellSize);
      }

    // what to do if cell is clicked
    tableClick(){
        $(".cell").click(function(){
            console.log('\tNewTurn');
            if(!$(this).hasClass('piece')){
                if(pcolor == 'white'){
                    $(this).addClass('white piece');
                }
                else if(pcolor == 'black'){
                    $(this).addClass('black piece');
                }
                var c = this.getcell($(this).attr('id'));
                var pos = c.look;
                for(i in pos){
                    for(j in i){
                        j.switchColor();
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
            // show possibilities
            this.showPos();
        })
    }

    // shows possibilites
    showPos(){

    }

    // returns cell with css id
    getcell(id){
        id = id.split('');
        return this.table[id[0]][id[1]];
    }
}

const g = new game();