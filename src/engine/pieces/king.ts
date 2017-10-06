import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Array<Square> = [];
        let square: Square = board.findPiece(this);

        if (square.row + 1 < 8) {
            if (square.col + 1 < 8) {
                availableMoves.push(new Square(square.row + 1, square.col + 1));
            }
            if (square.col - 1 > 0) {
                availableMoves.push(new Square(square.row + 1, square.col - 1));
            }
            availableMoves.push(new Square(square.row + 1, square.col));
        }
        if (square.row - 1 >= 0) {
            if (square.col + 1 < 8) {
                availableMoves.push(new Square(square.row - 1, square.col + 1));
            }
            if (square.col - 1 > 0) {
                availableMoves.push(new Square(square.row - 1, square.col - 1));
            }
            availableMoves.push(new Square(square.row - 1, square.col));
        }
        if (square.col + 1 < 8) {
            availableMoves.push(new Square(square.row, square.col + 1));
        }
        if (square.col - 1 >= 0) {
            availableMoves.push(new Square(square.row, square.col - 1));
        }


        return availableMoves;
    }
}
