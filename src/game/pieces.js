import { SpriteFactory } from "./sprite.js";
import { boardMargin, fieldSize, pieceSize } from "./constants.js";

export class PieceFactory {
    static createPiece(symbol, column, row) {
        switch (symbol) {
            case "bp":
                return new Pawn("black", column, row);
            case "bkn":
                return new Knight("black", column, row);   
            case "bb":
                return new Bishop("black", column, row);
            case "br":
                return new Rook("black", column, row);
            case "bq":
                return new Queen("black", column, row);
            case "bki":
                return new King("black", column, row);
            case "wp":
                return new Pawn("white", column, row);
            case "wkn":
                return new Knight("white", column, row);
            case "wb":
                return new Bishop("white", column, row);
            case "wr":
                return new Rook("white", column, row);
            case "wq":
                return new Queen("white", column, row);
            case "wki":
                return new King("white", column, row);
            default:
                return null;
        }
    }
}

class Piece {
    constructor(color, sprite, column, row) {
        this.color = color;
        this.sprite = sprite;
        this.setPosition(column, row);
    }

    setPosition(column, row) {
        this.column = column;
        this.row = row;
        const xCord = boardMargin + column * fieldSize + (fieldSize - pieceSize) / 2;
        const yCord = boardMargin + row * fieldSize + (fieldSize - pieceSize) / 2;
        this.sprite.setPosition(xCord, yCord);
    }

    resetSpritePosition() {
        this.setPosition(this.column, this.row);
    }

    spriteX() {
        return this.sprite.x;
    }

    spriteY() {
        return this.sprite.y;
    }
}

export class Pawn extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackPawn() : SpriteFactory.whitePawn();
        super(color, sprite, column, row);
    }
}

export class Knight extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackKnight() : SpriteFactory.whiteKnight();
        super(color, sprite, column, row);
    }
}

export class Bishop extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackBishop() : SpriteFactory.whiteBishop();
        super(color, sprite, column, row);
    }
}

export class Rook extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackRook() : SpriteFactory.whiteRook();
        super(color, sprite, column, row);
    }
}

export class Queen extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackQueen() : SpriteFactory.whiteQueen();
        super(color, sprite, column, row);
    }
}

export class King extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackKing() : SpriteFactory.whiteKing();
        super(color, sprite, column, row);
    }
}