import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Array<Square> = [];
        let square: Square = board.findPiece(this);

        for (let i = square.row + 1; i < 8; i ++) {
            availableMoves.push(new Square(i, square. col));
            if (board.getPiece(new Square(i, square.col)) !== undefined) {
                break;
            }
        }

        for (let i = square.row - 1; i >= 0; i --) {
            availableMoves.push(new Square(i, square. col));
            if (board.getPiece(new Square(i, square.col)) !== undefined) {
                break;
            }
        }

        for (let i = square.col - 1; i >= 0; i --) {
            availableMoves.push(new Square(square.row, i));
            if (board.getPiece(new Square(square.row, i)) !== undefined) {
                break;
            }
        }

        for (let i = square.col + 1; i < 8; i ++) {
            availableMoves.push(new Square(square.row, i));
            if (board.getPiece(new Square(square.row, i)) !== undefined) {
                break;
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
