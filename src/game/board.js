import { PieceFactory } from "./pieces.js";
import {boardSize, boardMargin, boardFieldsPerEdge, fieldSize, pieceSize} from "./constants.js";

/************** BOARD RANGES *****************
edge = 876
field edge = 96
first field pixel cords = 49 x 49
*********************************************/

/* THESE ARE NOT ACCURATE - THERE'S AN ERROR MARGIN FOR MORE CONVINIENG PIECE MOVING */
const minSpritePosition = boardMargin - pieceSize / 2;
const maxSpritePosition = boardSize - boardMargin - pieceSize / 2;


export class Board {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = boardSize;
        this.canvas.height = boardSize;

        this.context = this.canvas.getContext("2d");

        this.backgroundSprite = document.getElementById("board");
        this.pieceSprites = document.getElementById("pieces");

        this.initBoard();
        this.selectedPiece = null;

        this.draw();
    }

    getMouseRelativePosition(mousePositionX, mousePositionY) {
        const canvasRect = this.canvas.getBoundingClientRect();
        return [
            mousePositionX - canvasRect.left - boardMargin,
            mousePositionY - canvasRect.top - boardMargin
        ];
    }

    mapMousePosToCords(mousePositionX, mousePositionY) {
        const [relativeX, relativeY] = this.getMouseRelativePosition(mousePositionX, mousePositionY);
        let column = Math.floor(relativeX / fieldSize);
        let row = Math.floor(relativeY / fieldSize);
        // corrections are required because of error margin left in isValidSpritePosition()
        if (column < 0) column = 0;
        else if (column > boardFieldsPerEdge) column = boardFieldsPerEdge - 1;
        if (row < 0) column = 0;
        else if (row > boardFieldsPerEdge) row = boardFieldsPerEdge - 1;
        return [column, row];
    }

    mapCordsToPos(column, row) {
        const xCord = boardMargin + column * fieldSize + (fieldSize - pieceSize) / 2;
        const yCord = boardMargin + row * fieldSize + (fieldSize - pieceSize) / 2;
        return [xCord, yCord];
    }

    mapCordsToIndex(column, row) {
        return row * boardFieldsPerEdge + column;
    }

    isMouseInBoundaries(mousePositionX, mousePositionY) {
        const rect = this.canvas.getBoundingClientRect();
        return mousePositionX >= rect.left + boardMargin && mousePositionX < rect.left + (boardSize - boardMargin)
            && mousePositionY >= rect.top && mousePositionY < rect.top + (boardSize - boardMargin);
    }

    isValidPiecePosition(positionX, positionY) {
        return positionX > minSpritePosition && positionX < maxSpritePosition
            && positionY > minSpritePosition && positionY < maxSpritePosition;
    }

    isPieceSelected() {
        return this.selectedPiece !== null;
    }

    selectPiece(mousePositionX, mousePositionY) {
        if(!this.isMouseInBoundaries(mousePositionX, mousePositionY))
            return;

        const [column, row] = this.mapMousePosToCords(mousePositionX, mousePositionY);
        this.selectedPiece = this.board[this.mapCordsToIndex(column, row)];
        this.draw();
    }

    moveSelectedPiece(mousePositionX, mousePositionY) {
        const [x, y] = this.getMouseRelativePosition(mousePositionX, mousePositionY);

        this.context.clearRect(0, 0, boardSize, boardSize);
        this.selectedPiece.sprite.setPosition(x, y);
        this.draw();
    }

    dropSelectedPiece(mousePositionX, mousePositionY) {
        if(this.selectedPiece === null)
            return;

        if(!this.isValidPiecePosition(this.selectedPiece.spriteX(), this.selectedPiece.spriteY())) {
            this.selectedPiece.resetSpritePosition();
        }
        else {
            const [newColumn, newRow] = this.mapMousePosToCords(mousePositionX, mousePositionY);
            const oldIndex = this.mapCordsToIndex(this.selectedPiece.column, this.selectedPiece.row);
            const newIndex = this.mapCordsToIndex(newColumn, newRow);
            this.selectedPiece.setPosition(newColumn, newRow);
            [this.board[oldIndex], this.board[newIndex]] = [null, this.selectedPiece];
        }
        this.selectedPiece = null;
        this.draw();
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
            let column = i % boardFieldsPerEdge;
            let row = Math.floor(i / boardFieldsPerEdge);
            this.board.push(PieceFactory.createPiece(boardScheme[i], column, row));
        }
    }
}