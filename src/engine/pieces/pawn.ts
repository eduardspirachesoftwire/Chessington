import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import player from "../player";
import King from "./king";

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

        for (let i = -1; i <= 1; i += 2) {
            for (let j = -1; j <= 1; j += 2) {
                if (square.row + i < 8 && square.row + i >= 0 &&
                    square.col + i < 8 && square.col + 1 >= 0) {
                    let tempSquare: Square = new Square(square.row + i, square.col + j);
                    if (board.getPiece(tempSquare)) {
                        availableMoves.push(tempSquare);
                    }
                }
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

    public moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.moved = true;
    }
}
