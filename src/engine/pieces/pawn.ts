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

        if (this.player == Player.WHITE &&
                board.getPiece(new Square(square.row + 1, square.col)) === undefined) {
            if (!this.moved && board.getPiece(new Square(square.row + 2, square.col)) === undefined) {
                availableMoves.push(new Square(square.row + 2, square.col));
            }
            availableMoves.push(new Square(square.row + 1, square.col));
        } else if (this.player == Player.BLACK &&
                board.getPiece(new Square(square.row - 1, square.col)) === undefined) {
            if (!this.moved && board.getPiece(new Square(square.row - 2, square.col)) === undefined) {
                availableMoves.push(new Square(square.row - 2, square.col));
            }
            availableMoves.push(new Square(square.row - 1, square.col));
        }

        return availableMoves;
    }

    public moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.moved = true;
    }
}
