import { Board } from "./board.js";


export class Game {
    constructor() {
        
    }

    init(playerColor="white") {
        this.playerColor = playerColor;
        this.board = new Board(this.playerColor);
        this.board.initBoard("black");
        this.board.draw();
    }
}