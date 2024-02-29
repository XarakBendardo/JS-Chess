import { Bishop, King, Knight, Pawn, Queen, Rook } from "./pieces.js";

const boardSize = 876;
const boardMargin = 50;
const fieldSize = 97;
const boardFieldsPerEdge = 8;
const pieceSize = 96;

/************** BOARD RANGES *****************
edge = 876
field edge = 96
first field pixel cords = 49 x 49
*********************************************/

export class Board {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = boardSize;
        this.canvas.height = boardSize;

        this.context = this.canvas.getContext("2d");

        this.backgroundSprite = document.getElementById("board");
        this.pieceSprites = document.getElementById("pieces");

        this.selectedPiece = null;
    }

    mapMousePosToCords(mousePositionX, mousePositionY) {
        const canvasRect = this.canvas.getBoundingClientRect();
        const fieldX = Math.floor((mousePositionX - canvasRect.left - boardMargin) / fieldSize);
        const fieldY = Math.floor((mousePositionY - canvasRect.top - boardMargin) / fieldSize);
        return [fieldX, fieldY];
    }

    mapCordsToIndex(fieldX, fieldY) {
        return fieldY * boardFieldsPerEdge + fieldX;
    }

    isMouseInBoundaries(mousePositionX, mousePositionY) {
        const rect = this.canvas.getBoundingClientRect();
        return mousePositionX >= rect.left + boardMargin && mousePositionX < rect.left + boardSize
            && mousePositionY >= rect.top && mousePositionY < rect.top + boardSize;
    }

    selectPiece(mousePositionX, mousePositionY) {
        if(!this.isMouseInBoundaries(mousePositionX, mousePositionY))
            return;

        const [fieldX, fieldY] = this.mapMousePosToCords(mousePositionX, mousePositionY);
        this.selectedPiece = this.board[this.mapCordsToIndex(fieldX, fieldY)];
        console.log(this.selectedPiece);
    }

    moveSelectedPiece() {
        
    }

    dropSelectedPiece(fieldX, fieldY) {
        if(this.selectedPiece === null)
            return;

        const oldIndex = this.mapCordsToIndex(this.selectedPiece.x, this.selectedPiece.y);
        const newIndex = this.mapCordsToIndex(fieldX, fieldY);
        [this.board[oldIndex], this.board[newIndex]] = [null, this.selectedPiece];
        console.log(this.selectedPiece);
    }

    draw() {
        // board
        this.context.drawImage(this.backgroundSprite, 0, 0, boardSize, boardSize, 0, 0, boardSize, boardSize);
        
        //pieces
        for(let piece of this.board) {
            if(piece != null) this.drawPiece(piece.x, piece.y, piece.spritePositionX, piece.spritePositionY);
        }
    }

    drawPiece(pieceX, pieceY, spritePositionX, spritePositionY) {
        const xCord = boardMargin + pieceX * fieldSize + (fieldSize - pieceSize) / 2;
        const yCord = boardMargin + pieceY * fieldSize + (fieldSize - pieceSize) / 2;
        this.context.drawImage(this.pieceSprites,
            spritePositionX * pieceSize, spritePositionY * pieceSize,
            pieceSize, pieceSize,
            xCord, yCord,
            pieceSize, pieceSize);
    }

    initBoard(color) {
        const boardWhite = [
        //  1   2   3   4   5   6   7   8
            "br", "bkn", "bb", "bq", "bki", "bb", "bkn", "br", //1
            "bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp", //2
            "", "", "", "", "", "", "", "", //3
            "", "", "", "", "", "", "", "", //4
            "", "", "", "", "", "", "", "", //5
            "", "", "", "", "", "", "", "", //6
            "wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp", //7
            "wr", "wkn", "wb", "wq", "wki", "wb", "wkn", "wr", //8
        ];

        const boardBlack = [
            //  1   2   3   4   5   6   7   8
            "wr", "wkn", "wb", "wki", "wq", "wb", "wkn", "wr", //1
            "wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp", //2
            "", "", "", "", "", "", "", "", //3
            "", "", "", "", "", "", "", "", //4
            "", "", "", "", "", "", "", "", //5
            "", "", "", "", "", "", "", "", //6
            "bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp", //7
            "br", "bkn", "bb", "bki", "bq", "bb", "bkn", "br", //8
        ];

        const boardScheme = color === "white" ? boardWhite : boardBlack;

        this.board = [];
        for(let i = 0; i < boardScheme.length; i++) {
            let x = i % boardFieldsPerEdge;
            let y = Math.floor(i / boardFieldsPerEdge);

            switch (boardScheme[i]) {
                case "bp":
                    this.board.push(new Pawn("black", x, y));
                    break;
                case "bkn":
                    this.board.push(new Knight("black", x, y));
                    break;    
                case "bb":
                    this.board.push(new Bishop("black", x, y));
                    break;
                case "br":
                    this.board.push(new Rook("black", x, y));
                    break;
                case "bq":
                    this.board.push(new Queen("black", x, y));
                    break;
                case "bki":
                    this.board.push(new King("black", x, y));
                    break;
                case "wp":
                    this.board.push(new Pawn("white", x, y));
                    break;
                case "wkn":
                    this.board.push(new Knight("white", x, y));
                    break;    
                case "wb":
                    this.board.push(new Bishop("white", x, y));
                    break;
                case "wr":
                    this.board.push(new Rook("white", x, y));
                    break;
                case "wq":
                    this.board.push(new Queen("white", x, y));
                    break;
                case "wki":
                    this.board.push(new King("white", x, y));
                    break;
                default:
                    this.board.push(null);
                    break;
            }
        }
    }
}