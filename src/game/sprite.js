import { pieceSize } from "./constants.js";

export class SpriteFactory {

    static blackPawn(spriteX, spriteY) {
        return new Sprite(0 * pieceSize, 0, spriteX, spriteY);
    }

    static blackKnight(spriteX, spriteY) {
        return new Sprite(1 * pieceSize, 0, spriteX, spriteY);
    }

    static blackBishop(spriteX, spriteY) {
        return new Sprite(2 * pieceSize, 0, spriteX, spriteY);
    }

    static blackRook(spriteX, spriteY) {
        return new Sprite(3 * pieceSize, 0, spriteX, spriteY);
    }

    static blackQueen(spriteX, spriteY) {
        return new Sprite(4 * pieceSize, 0, spriteX, spriteY);
    }

    static blackKing(spriteX, spriteY) {
        return new Sprite(5 * pieceSize, 0, spriteX, spriteY);
    }

    static whitePawn(spriteX, spriteY) {
        return new Sprite(0 * pieceSize, pieceSize, spriteX, spriteY);
    }

    static whiteKnight(spriteX, spriteY) {
        return new Sprite(1 * pieceSize, pieceSize, spriteX, spriteY);
    }

    static whiteBishop(spriteX, spriteY) {
        return new Sprite(2 * pieceSize, pieceSize, spriteX, spriteY);
    }

    static whiteRook(spriteX, spriteY) {
        return new Sprite(3 * pieceSize, pieceSize, spriteX, spriteY);
    }

    static whiteQueen(spriteX, spriteY) {
        return new Sprite(4 * pieceSize, pieceSize, spriteX, spriteY);
    }

    static whiteKing(spriteX, spriteY) {
        return new Sprite(5 * pieceSize, pieceSize, spriteX, spriteY);
    }
}

class Sprite {
    constructor(imgLeft, imgTop, x=0, y=0) {
        this.imgLeft = imgLeft;
        this.imgTop = imgTop;
        this.imgWidth = pieceSize;
        this.imgHeight = pieceSize;
        this.x = x;
        this.y = y;
    }

    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
}