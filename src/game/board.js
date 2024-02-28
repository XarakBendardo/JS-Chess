const boardSize = 876;

/************** BOARD RANGES *****************
edge = 876
field edge = 96
*********************************************/


class Board {
    constructor() {
        this.path = "../../resource/sprites/board.png";
        this.canvas = document.getElementById("canvas");
        this.canvas.width = boardSize;
        this.canvas.height = boardSize;

        this.context = this.canvas.getContext("2d");

        this.image = new Image();
        this.image.src = this.path;
        this.image.onload = () => {
            this.context.drawImage(this.image, 0, 0, boardSize, boardSize, 0, 0, boardSize, boardSize);
        }
    }
}

export let board = new Board();