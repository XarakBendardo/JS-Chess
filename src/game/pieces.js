const SPRITES_DIR = "../../resource";


class Piece {
    constructor(color, spritePath) {
        this.color = color;
        this.sprite = new Image();
        this.sprite.src = spritePath;
    }
}

export class Pawn extends Piece {
    constructor(color) {
        super(color, `${SPRITES_DIR}/${color} pawn.png`);
    }
}

export class Knight extends Piece {
    constructor(color) {
        super(color);
    }
}

export class Bishop extends Piece {
    constructor(color) {
        super(color);
    }
}

export class Rook extends Piece {
    constructor(color) {
        super(color);
    }
}

export class Queen extends Piece {
    constructor(color) {
        super(color);
    }
}

export class King extends Piece {
    constructor(color) {
        super(color);
    }
}