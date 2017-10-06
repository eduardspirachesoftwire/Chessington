import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    private moved: boolean;

    public constructor(player: Player) {
        super(player);
        this.moved = false;
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Array<Square> = [];
        let square: Square = board.findPiece(this);

        if (this.player == Player.WHITE) {
            if (!this.moved) {
                availableMoves.push(new Square(square.row + 2, square.col));
            }
            availableMoves.push(new Square(square.row + 1, square.col));
        } else {
            if (!this.moved) {
                availableMoves.push(new Square(square.row - 2, square.col));
            }
            availableMoves.push(new Square(square.row - 1, square.col));
        }

        let newAvailableMoves: Array<Square> = [];
        for (let move of availableMoves) {
            if (board.getPiece(move) === undefined) {
                newAvailableMoves.push(move);
            }
        }

        return newAvailableMoves;
    }

    public moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.moved = true;
    }
}
