class Piece {
    constructor(color, spritePositionX, x, y) {
        this.color = color;
        this.spritePositionY = this.color === "black" ? 0 : 1;
        this.spritePositionX = spritePositionX;
        this.x = x;
        this.y = y;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPixelPosition() {

    }
}

export class Pawn extends Piece {
    constructor(color, x, y) {
        super(color, 0, x, y);
    }
}

export class Knight extends Piece {
    constructor(color, x, y) {
        super(color, 1, x, y);
    }
}

export class Bishop extends Piece {
    constructor(color, x, y) {
        super(color, 2, x, y);
    }
}

export class Rook extends Piece {
    constructor(color, x, y) {
        super(color, 3, x, y);
    }
}

export class Queen extends Piece {
    constructor(color, x, y) {
        super(color, 4, x, y);
    }
}

export class King extends Piece {
    constructor(color, x, y) {
        super(color, 5, x, y);
    }
}