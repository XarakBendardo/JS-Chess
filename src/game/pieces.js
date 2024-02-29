import { SpriteFactory } from "./sprite.js";
import { boardMargin, fieldSize, pieceSize } from "./constants.js";

export class PieceFactory {
    static createPiece(symbol, x, y) {
        switch (symbol) {
            case "bp":
                return new Pawn("black", x, y);
            case "bkn":
                return new Knight("black", x, y);   
            case "bb":
                return new Bishop("black", x, y);
            case "br":
                return new Rook("black", x, y);
            case "bq":
                return new Queen("black", x, y);
            case "bki":
                return new King("black", x, y);
            case "wp":
                return new Pawn("white", x, y);
            case "wkn":
                return new Knight("white", x, y);
            case "wb":
                return new Bishop("white", x, y);
            case "wr":
                return new Rook("white", x, y);
            case "wq":
                return new Queen("white", x, y);
            case "wki":
                return new King("white", x, y);
            default:
                return null;
        }
    }
}

class Piece {
    constructor(color, sprite, x, y) {
        this.color = color;
        this.sprite = sprite;
        this.setPosition(x, y);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        const xCord = boardMargin + x * fieldSize + (fieldSize - pieceSize) / 2;
        const yCord = boardMargin + y * fieldSize + (fieldSize - pieceSize) / 2;
        this.sprite.setPosition(xCord, yCord);
    }

    resetSpritePosition() {
        this.setPosition(this.x, this.y);
    }

    spriteX() {
        return this.sprite.x;
    }

    spriteY() {
        return this.sprite.y;
    }
}

export class Pawn extends Piece {
    constructor(color, x, y) {
        let sprite = color === "black" ? SpriteFactory.blackPawn() : SpriteFactory.whitePawn();
        super(color, sprite, x, y);
    }
}

export class Knight extends Piece {
    constructor(color, x, y) {
        let sprite = color === "black" ? SpriteFactory.blackKnight() : SpriteFactory.whiteKnight();
        super(color, sprite, x, y);
    }
}

export class Bishop extends Piece {
    constructor(color, x, y) {
        let sprite = color === "black" ? SpriteFactory.blackBishop() : SpriteFactory.whiteBishop();
        super(color, sprite, x, y);
    }
}

export class Rook extends Piece {
    constructor(color, x, y) {
        let sprite = color === "black" ? SpriteFactory.blackRook() : SpriteFactory.whiteRook();
        super(color, sprite, x, y);
    }
}

export class Queen extends Piece {
    constructor(color, x, y) {
        let sprite = color === "black" ? SpriteFactory.blackQueen() : SpriteFactory.whiteQueen();
        super(color, sprite, x, y);
    }
}

export class King extends Piece {
    constructor(color, x, y) {
        let sprite = color === "black" ? SpriteFactory.blackKing() : SpriteFactory.whiteKing();
        super(color, sprite, x, y);
    }
}