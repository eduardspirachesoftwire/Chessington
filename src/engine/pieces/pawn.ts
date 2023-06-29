import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";

export default class Pawn extends Piece {
    private moved: boolean;

    public constructor(player: Player) {
        super(player);
        this.moved = false;
    }

    private checkForBlack(board: Board) {
        let square: Square = board.findPiece(this);
        if (this.player !== Player.BLACK) {
            return false;
        }
        if (square.row - 1 < 0) {
            return false;
        }
        if (board.getPiece(new Square(square.row - 1, square.col)) !== undefined) {
            return false;
        }
        return true;
    }

    private checkForWhite(board: Board) {
        let square: Square = board.findPiece(this);
        if (this.player !== Player.WHITE) {
            return false;
        }
        if (square.row + 1 > 7) {
            return false;
        }
        if (board.getPiece(new Square(square.row + 1, square.col)) !== undefined) {
            return false;
        }
        return true;
    }
    public getAvailableMoves(board: Board) {
        let availableMoves: Array<Square> = [];
        let square: Square = board.findPiece(this);

        if (this.checkForWhite(board)) {
            if (!this.moved && board.getPiece(new Square(square.row + 2, square.col)) === undefined) {
                availableMoves.push(new Square(square.row + 2, square.col));
            }
            availableMoves.push(new Square(square.row + 1, square.col));
        } else if (this.checkForBlack(board)) {
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
