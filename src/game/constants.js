// GRAPHICS
export const boardSize = 876;
export const boardMargin = 50;
export const fieldSize = 97;
export const boardFieldsPerEdge = 8;
export const maxFieldCord = boardFieldsPerEdge -1;
export const pieceSize = 96;

export function selectedFieldColor(column, row) {
    //LIGHT FIELDS
    if((column % 2 == 0 && row % 2 === 0)
    || (column % 2 == 1 && row % 2 === 1))
        return "rgba(0, 0, 100, 1.0)";
    //DARK FIELDS
    return "rgba(0, 0, 100, 0.6)";
}

//LOGIC
export const MoveType = {
    move: "move",
    take: "take",
    both: "both",
}