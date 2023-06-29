import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Array<Square> = [];
        let square: Square = board.findPiece(this);

        if (square.row + 2 < 8) {
            if (square.col - 1 >= 0) {
                availableMoves.push(new Square(square.row + 2, square.col - 1));
            }
            if (square.col + 1 < 8) {
                availableMoves.push(new Square(square.row + 2, square.col + 1));
            }
        }

        if (square.row - 2 >= 0) {
            if (square.col - 1 >= 0) {
                availableMoves.push(new Square(square.row - 2, square.col - 1));
            }
            if (square.col + 1 < 8) {
                availableMoves.push(new Square(square.row - 2, square.col + 1));
            }
        }

        if (square.col - 2 >= 0) {
            if (square.row - 1 >= 0) {
                availableMoves.push(new Square(square.row - 1, square.col - 2));
            }
            if (square.row + 1 < 8) {
                availableMoves.push(new Square(square.row + 1, square.col - 2));
            }
        }

        if (square.col + 2 < 8) {
            if (square.row - 1 >= 0) {
                availableMoves.push(new Square(square.row - 1, square.col + 2));
            }
            if (square.row + 1 < 8) {
                availableMoves.push(new Square(square.row + 1, square.col + 2));
            }
        }

        let updatedMoves: Array<Square> = [];
        for (let move of availableMoves) {
            if (board.getPiece(move) instanceof King || board.getPiece(move)?.player === this.player) {
                continue;
            }
            updatedMoves.push(move);
        }
        return updatedMoves;
    }
}
