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
        Game.board.initBoard("black");
        Game.board.draw();

        document.addEventListener("mousedown", Game.grabPiece);
        // document.addEventListener("mouseup", dropPiece);
        // document.addEventListener("mousemove", movePiece);
    }

    static grabPiece(event) {
        const rect = Game.board.canvas.getBoundingClientRect();
        const xOnBoard = event.pageX - rect.left;
        const yOnBoard = event.pageY - rect.top;
        const piece = Game.board.mapCordsToField(xOnBoard, yOnBoard);
        console.log(piece);
    }
}