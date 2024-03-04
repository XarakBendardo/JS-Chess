import { Board } from "./board.js";


export class Game {
    static board;
    static playerColor;
    constructor() {
        
    }

    static init(playerColor="white") {
        if (Game.board != null)
            return;

        Game.playerColor = playerColor;
        Game.board = new Board(this.playerColor);

        document.addEventListener("mousedown", Game.grabPiece);
        document.addEventListener("mousemove", Game.movePiece);
        document.addEventListener("mouseup", Game.dropPiece);
    }

    static run() {
        
    }

    static grabPiece(event) {
        Game.board.selectPiece(event.pageX, event.pageY);
    }

    static movePiece(event) {
        if(Game.board.isPieceSelected())
            Game.board.moveSelectedPiece(event.pageX, event.pageY);
    }

    static dropPiece(event) {
        Game.board.dropSelectedPiece(event.pageX, event.pageY);
    }
}