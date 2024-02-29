import { PieceFactory } from "./pieces.js";
import {boardSize, boardMargin, boardFieldsPerEdge, fieldSize, pieceSize} from "./constants.js";

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

    mapCordsToPos(fieldX, fieldY) {
        const xCord = boardMargin + fieldX * fieldSize + (fieldSize - pieceSize) / 2;
        const yCord = boardMargin + fieldY * fieldSize + (fieldSize - pieceSize) / 2;
        return [xCord, yCord];
    }

    mapCordsToIndex(fieldX, fieldY) {
        return fieldY * boardFieldsPerEdge + fieldX;
    }

    isMouseInBoundaries(mousePositionX, mousePositionY) {
        const rect = this.canvas.getBoundingClientRect();
        console.log(mousePositionX >= rect.left + boardMargin && mousePositionX < rect.left + (boardSize - boardMargin)
            && mousePositionY >= rect.top && mousePositionY < rect.top + (boardSize - boardMargin));
        return mousePositionX >= rect.left + boardMargin && mousePositionX < rect.left + (boardSize - boardMargin)
            && mousePositionY >= rect.top && mousePositionY < rect.top + (boardSize - boardMargin);
    }

    isPieceSelected() {
        return this.selectedPiece !== null;
    }

    selectPiece(mousePositionX, mousePositionY) {
        if(!this.isMouseInBoundaries(mousePositionX, mousePositionY))
            return;

        const [fieldX, fieldY] = this.mapMousePosToCords(mousePositionX, mousePositionY);
        this.selectedPiece = this.board[this.mapCordsToIndex(fieldX, fieldY)];
        console.log(this.selectedPiece);
    }

    moveSelectedPiece() {
        console.log("moving");
        // this.context.clearRect(0, 0, boardSize, boardFieldsPerEdge);
        // this.draw();
    }

    dropSelectedPiece(mousePositionX, mousePositionY) {
        if(this.selectedPiece === null || !this.isMouseInBoundaries(mousePositionX, mousePositionY))
            return;

        const [newFieldX, newFieldY] = this.mapMousePosToCords(mousePositionX, mousePositionY);
        const oldIndex = this.mapCordsToIndex(this.selectedPiece.x, this.selectedPiece.y);
        const newIndex = this.mapCordsToIndex(newFieldX, newFieldY);
        this.selectedPiece.setPosition(newFieldX, newFieldY);
        [this.board[oldIndex], this.board[newIndex]] = [null, this.selectedPiece];
        this.selectedPiece = null;
    }

    draw() {
        this.context.clearRect(0, 0, boardSize, boardSize);
        // board
        this.context.drawImage(this.backgroundSprite, 0, 0, boardSize, boardSize, 0, 0, boardSize, boardSize);
        
        //pieces
        for(let piece of this.board) {
            if(piece != null) this.drawSprite(piece.sprite);
        }
    }

    drawSprite(sprite) {
        this.context.drawImage(this.pieceSprites,
            sprite.imgLeft, sprite.imgTop,
            pieceSize, pieceSize,
            sprite.x, sprite.y,
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
            this.board.push(PieceFactory.createPiece(boardScheme[i], x, y));
        }
    }
}