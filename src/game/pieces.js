import { SpriteFactory } from "./sprite.js";
import { boardMargin, fieldSize, pieceSize, MoveType, boardFieldsPerEdge, maxFieldCord } from "./constants.js";
import { Move } from "./move.js";

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
        this.firstMove = true;
    }

    getMoves(moveDirection) {
        let moves = [];
        const step = moveDirection === "up" ? -1 : 1;
        if(this.firstMove) {
            moves.push(new Move(this.column, this.row + 2 * step, MoveType.move));
            this.firstMove = false;
        }

        if (this.row < maxFieldCord && this.row > 0) {
            moves.push(new Move(this.column, this.row + step, MoveType.move));
            if (this.column > 0)
                moves.push(new Move(this.column - 1, this.row + step, MoveType.take));
            if (this.column < maxFieldCord)
                moves.push(new Move(this.column + 1, this.row + step, MoveType.take));
        }
        return moves;
    }
}

export class Knight extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackKnight() : SpriteFactory.whiteKnight();
        super(color, sprite, column, row);
    }

    getMoves() {
        let moves = [];

        if(this.column > 0) {
            if(this.row > 1)
                moves.push(new Move(this.column - 1, this.row - 2, MoveType.both));
            if (this.row < maxFieldCord - 1)
                moves.push(new Move(this.column - 1, this.row + 2, MoveType.both));
        }

        if(this.column > 1) {
            if(this.row > 0)
                moves.push(new Move(this.column - 2, this.row - 1, MoveType.both));
            if (this.row < maxFieldCord)
                moves.push(new Move(this.column - 2, this.row + 1, MoveType.both));
        }

        if(this.column < maxFieldCord) {
            if(this.row > 1)
                moves.push(new Move(this.column + 1, this.row - 2, MoveType.both));
            if (this.row < maxFieldCord - 1)
                moves.push(new Move(this.column + 1, this.row + 2, MoveType.both));
        }

        if(this.column < maxFieldCord - 1) {
            if(this.row > 0)
                moves.push(new Move(this.column + 2, this.row - 1, MoveType.both));
            if (this.row < maxFieldCord)
                moves.push(new Move(this.column + 2, this.row + 1, MoveType.both));
        }
        return moves;
    }
}

export class Bishop extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackBishop() : SpriteFactory.whiteBishop();
        super(color, sprite, column, row);
    }

    getMoves() {
        let moves = [];
        let [row, column] = [this.row + 1, this.column + 1];
        //DOWN RIGHT
        while(row < boardFieldsPerEdge && column < boardFieldsPerEdge) {
            moves.push(new Move(column, row, MoveType.both));
            row++;
            column++;
        }
        //DOWN LEFT
        [row, column] = [this.row + 1, this.column - 1];
        while(row < boardFieldsPerEdge && column > 0) {
            moves.push(new Move(column, row, MoveType.both));
            row++;
            column--;
        }
        //UP RIGHT
        [row, column] = [this.row - 1, this.column + 1];
        while(row > 0 && column < boardFieldsPerEdge) {
            moves.push(new Move(column, row, MoveType.both));
            row--;
            column++;
        }
        //UP LEFT
        [row, column] = [this.row - 1, this.column - 1];
        while(row > 0 && column > 0) {
            moves.push(new Move(column, row, MoveType.both));
            row--;
            column--;
        }
        return moves;
    }
}

export class Rook extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackRook() : SpriteFactory.whiteRook();
        super(color, sprite, column, row);
    }

    getMoves() {
        let moves = [];
        //ROW
        for(let row = 0; row < boardFieldsPerEdge; ++row) {
            if(row !== this.row)
                moves.push(new Move(this.column, row, MoveType.both));
        }
        //COLUMN
        for(let column = 0; column < boardFieldsPerEdge; ++column) {
            if(column !== this.column)
                moves.push(new Move(column, this.row, MoveType.both));
        }
        return moves;
    }
}

export class Queen extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackQueen() : SpriteFactory.whiteQueen();
        super(color, sprite, column, row);
    }

    getMoves() {
        let moves = [];
        let [row, column] = [this.row + 1, this.column + 1];
        //DOWN RIGHT
        while(row < boardFieldsPerEdge && column < boardFieldsPerEdge) {
            moves.push(new Move(column, row, MoveType.both));
            row++;
            column++;
        }
        //DOWN LEFT
        [row, column] = [this.row + 1, this.column - 1];
        while(row < boardFieldsPerEdge && column > 0) {
            moves.push(new Move(column, row, MoveType.both));
            row++;
            column--;
        }
        //UP RIGHT
        [row, column] = [this.row - 1, this.column + 1];
        while(row > 0 && column < boardFieldsPerEdge) {
            moves.push(new Move(column, row, MoveType.both));
            row--;
            column++;
        }
        //UP LEFT
        [row, column] = [this.row - 1, this.column - 1];
        while(row > 0 && column > 0) {
            moves.push(new Move(column, row, MoveType.both));
            row--;
            column--;
        }
        //ROW
        for(row = 0; row < boardFieldsPerEdge; ++row) {
            if(row !== this.row)
                moves.push(new Move(this.column, row, MoveType.both));
        }
        //COLUMN
        for(column = 0; column < boardFieldsPerEdge; ++column) {
            if(column !== this.column)
                moves.push(new Move(column, this.row, MoveType.both));
        }
        return moves;
    }
}

export class King extends Piece {
    constructor(color, column, row) {
        let sprite = color === "black" ? SpriteFactory.blackKing() : SpriteFactory.whiteKing();
        super(color, sprite, column, row);
    }

    getMoves() {
        let moves = [];
        if (this.column > 0) {
            moves.push(new Move(this.column - 1, this.row, MoveType.both));
            if (this.row > 0)
                moves.push(new Move(this.column - 1, this.row - 1, MoveType.both));

            if (this.row < maxFieldCord)
                moves.push(new Move(this.column - 1, this.row + 1, MoveType.both));
        }

        if (this.column < maxFieldCord) {
            moves.push(new Move(this.column + 1, this.row, MoveType.both));
            if (this.row > 0)
                moves.push(new Move(this.column + 1, this.row - 1, MoveType.both));

            if (this.row < maxFieldCord)
                moves.push(new Move(this.column + 1, this.row + 1, MoveType.both));
        }

        if(this.row > 0)
            moves.push(new Move(this.column, this.row - 1, MoveType.both));
        
        if(this.row < maxFieldCord)
            moves.push(new Move(this.column, this.row + 1, MoveType.both));

        return moves;
    }
}