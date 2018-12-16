/*
Authors: Tristan Frederick and Daniel Frederick
Date: December 15, 2018

@TODO:
- actually generate gameboard
- cell same color method might return true if both are unclicked
*/

// initialize variables
//------------------------------------------------------------------\\
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
//------------------------------------------------------------------\\

class cell {
    // @param int row - row in game table
    // @param int col - column in game table
    // @param game g - parent game of cell
    // @param int state - state of cell, 0 unclicked, 1 white, 2 black, or 3 possible
    constructor(row, col, g, state = 0) {
        // @type int - row number in game table
        this.row = row;
        // @type str - css id tag for cell row
        this.rowid = '#row' + alph[row];
        // @type str - css id tag for cell without # sign
        this.orowid = 'row' + alph[row];
        // @type int - column number for cell
        this.col = col;
        // @type int - 0 unclicked, 1 white, 2 black, or 3 possible
        this.state = state;
        // @type str - css id tag for cell
        this.id = '#' + alph[row] + this.col;
        // @type str - css id tag for cell without # sign
        this.oid = alph[row] + this.col;
        // game piece is a part of
        this.g = g;
    }

    // @return - returns an array of arrays of cells that can be flipped
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
        var t
        for(c; c < size; c++){
            // test piece
            t = !this.test(this.g.table[this.row[c]], line)
            if(!t){
                break;
            }else{
                line.push(t)
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
            t = !this.test(this.g.table[this.row[c]], line)
            if(!t){
                break;
            }else{
                line.push(t)
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
            t = !this.test(this.g.table[this.row[c]], line)
            if(!t){
                break;
            }else{
                line.push(t)
            }
        }
        if(line.length > 0){
            array.push(line);
        }

        // look down ----------------------
        // current row being checked
        r = this.row + 1;
        line = [];
        for(r; r < size; r++){
            // test piece
            t = !this.test(this.g.table[this.row[c]], line)
            if(!t){
                break;
            }else{
                line.push(t)
            }
        }
        if(line.length > 0){
            array.push(line);
        }

        // look down right
        // current row and column being checked
        r = this.row + 1;
        c = this.col + 1;
        line = [];
        for(r && c; r < size && c < size; r++ && c++){
            t = !this.test(this.g.table[this.row[c]], line)
            if(!t){
                break;
            }else{
                line.push(t)
            }
        }
        if(line.length > 0){
            array.push(line);
        }

        // look down left
        // current row and column being checked
        r = this.row + 1;
        c = this.col - 1;
        line = [];
        for(r && c; r < size && c > -1; r++ && c--){
            t = !this.test(this.g.table[this.row[c]], line)
            if(!t){
                break;
            }else{
                line.push(t)
            }
        }
        if(line.length > 0){
            array.push(line);
        }

        // look up right
        // current row and column being checked
        r = this.row - 1;
        c = this.col + 1;
        line = [];
        for(r && c; r > -1 && c < size; r-- && c++){
            t = !this.test(this.g.table[this.row[c]], line)
            if(!t){
                break;
            }else{
                line.push(t)
            }
        }
        if(line.length > 0){
            array.push(line);
        }

        // look up left
        // current row and column being checked
        r = this.row - 1;
        c = this.col - 1;
        line = [];
        for(r && c; r > -1 && c > -1; r-- && c--){
            t = !this.test(this.g.table[this.row[c]], line)
            if(!t){
                break;
            }else{
                line.push(t)
            }
        }
        if(line.length > 0){
            array.push(line);
        }
    }

    // used by look method, to check if c is the same color as cell calling it
    // @param c - cell to check
    // @return cell or boolean - either returns a cell that can be flipped, or false
    test(c) {
        // id of the cell being checked
        var cellid = cell.id;

        if(c.state == 0){
            cont == false;
        }
        if(cont){
            if(!this.sameColor(c)){
                return c;
            }else if(this.sameColor(c)){
                return false;
            }
        }
    }

    // @param cell c - cell to check color of cell calling method against
    // @return boolean - true it cell and cell calling method are the same color, else false
    sameColor(c) {
        if(this.state == c.state){
            return true
        }else{
            return false
        }
    }

    // switches color of cell to opposite
    switchColor() {
        // if the cell is white, make it black
        if(this.state == 1){
            this.state = 2;
            $("#"+cell).removeClass('white');
            $("#"+cell).addClass('black');
        }
        // if the cell is black, make it white
        else if(this.state == 2){
            this.state = 1;
            $("#"+cell).removeClass('black');
            $("#"+cell).addClass('white');
        }
    }
}

class game {
    // @param int size - size of game table, default is 8
    constructor(size = 8) {
        // @type str - initialize player color
        this.pcolor = 'white';
        // @type int - initialize board size, default 8
        this.size = size;
        // @type array - initialize array for game cells
        this.table = [];
        // change this to self, for jquery errors
        var self = this

        // resize the window based on browser environment
        self.initWindow();

        // continuously checks if cell is clicked...
        self.tableClick();
    }

    // initializes game window based on browser environment and builds game table
    initWindow(){
        // makes window square
        if(w < h){
            gameDim = w;
        }
        else{
            gameDim = h;
        }

        // set dimensions for gameboard
        boardDim = gameDim - (gameDim * .15);
        $(".gameBoard").width(boardDim);
        $(".gameBoard").height(boardDim);

        var tb = $('<table/>').attr('id', 'gameTable');

        for(var i; i < this.size; i++){
            var row = $('<tr/>').addClass('row').attr('id', 'row' + alph[i]);
            var arr = [];
            for(var j = 0; j < this.size; j++){
                c = new cell(j, i, this);
                arr.push(c);

                var cel = $('<td/>').addClass('cell').attr('id', c.oid);
                row.append();
            }
            this.table.push(arr);
            tb.append(row);
        }

        $('#gameBoard').append(tb);

        /*
        // create rows in game table
        for(var i; i < this.size; i++){
            $("#gameTable").append('<tr class="row" id="row' + alph[i] + '"> </tr>');
        }
        */

        /*
        // for current cell
        var c;
        // create columns in game table
        for(var j = 0; j < this.size; j++){
            var arr = [];
            for(var i = 0; i < this.size; i++){
                c = new cell(j, i, this);
                arr.push(c);
                $(c.rowid).append('<td class="cell" id="'+ c.oid + '"> </td>');
                // for debug -------------------------------- remove
                console.log('Creating cell ' + c.id + ' which has state ' + c.state + ' in row ' + c.rowid + ' and an oid of ' + c.oid)
            }
            this.table.push(arr);
        }
        */

        // set cell sizes
        var cellSize = boardDim/this.size;

        // set sizes to work with browser environment sizes
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
            console.log('\t---- New Turn ----');
            if(!$(this).hasClass('piece')){
                if(pcolor == 'white'){
                    $(this).addClass('white piece');
                }
                else if(pcolor == 'black'){
                    $(this).addClass('black piece');
                }
                var c = self.getcell($(this).attr('id'));
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

    // shows possibilites
    showPos(){
        var pos
        // init row and cell vars
        var r
        var c
        for(var i = 0; i < this.table.length; i++){
            r = this.table[i]
            for(var j = 0; j < r.length; j++){
                c = r[j]
                pos = c.look();
                if(pos > 0){
                    // change state to possible
                    c.state = 3;
                    $(c.id).addClass("possible");
                }
            }
        }

    }

    // reset possible cells
    resetTable(){
        for(var i in this.table){
            for(var j in i){
                if(j.state == 3){
                    j.state = 0;
                    $(j.id).removeClass("possible")
                }
            }
        }

        // change state of possible cells to possible
        this.showPos();
    }

    // @param str id - string css id of cell, obtained through jquery probably
    // @return cell - returns cell with corresponding id
    getcell(id){
        id = id.split('');
        return this.table[id[0]][id[1]];
    }
}
// declare instance of game
var g = new game();