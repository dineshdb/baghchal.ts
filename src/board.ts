import { Distance, MidPoint } from "./distance.ts";

enum BoardCell {
  EMPTY,
  TIGER,
  GOAT,
}

type Position =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

export const ErrorInvalidPlayer = new Error("Invalid player");
export const ErrorPositionAlreadyFilled = new Error("position already filled");
export const ErrorTargetCellNotEmpty = new Error("target cell not empty");
export const ErrorSourceCellEmpty = new Error("source cell is empty");
export const ErrorMaximumGoatsInserted = new Error("maximum goals inserted");

export const ErrorCantEatTigers = new Error("cant eat tigers");

export class Board {
  cells: Array<BoardCell>;
  goatsInserted = 0;

  goatPlayer: Player;
  tigerPlayer: Player;

  currentPlayer: Player;

  constructor(goatPlayer: Player, tigerPlayer: Player) {
    this.goatPlayer = goatPlayer;
    this.tigerPlayer = tigerPlayer;
    this.currentPlayer = goatPlayer;
    this.cells = [];
    this.reset();
  }

  reset() {
    this.cells = Array.from({ length: 25 }, () => BoardCell.EMPTY);
    this.cells[0] = BoardCell.TIGER;
    this.cells[4] = BoardCell.TIGER;
    this.cells[19] = BoardCell.TIGER;
    this.cells[24] = BoardCell.TIGER;
    this.goatsInserted = 0;
  }

  insert(position: Position) {
    if (!this.isValidPlayer(BoardCell.GOAT)) {
      throw ErrorInvalidPlayer;
    }

    if (!this.isEmpty(position)) {
      throw ErrorPositionAlreadyFilled;
    }

    if (this.goatsInserted >= 20) {
      throw ErrorMaximumGoatsInserted;
    }

    this.cells[position] = BoardCell.GOAT;
    this.currentPlayer = this.tigerPlayer;
  }

  isEmpty(position: Position): boolean {
    return !this.cells[position] || this.cells[position] === BoardCell.EMPTY;
  }

  isValidPlayer(piece: BoardCell): boolean {
    return this.currentPlayer === this.tigerPlayer
      ? piece === BoardCell.TIGER
      : piece === BoardCell.GOAT;
  }

  move(source: Position, target: Position) {
    this.currentPlayer.move(this, source, target);
  }
}

interface Player {
  move(b: Board, source: Position, target: Position): void;
}

export class Goat implements Player {
  move(b: Board, source: Position, target: Position) {
    if (b.currentPlayer !== this) {
      throw ErrorInvalidPlayer;
    }

    if (!b.isEmpty(target)) {
      throw new Error("target cell is not empty");
    }

    if (b.isEmpty(source)) {
      throw new Error("source cell is empty");
    }

    const dist = Distance(source, target);
    if (dist >= 2) {
      throw new Error("goats can't jump");
    }

    // only even cells are diagonally connected
    if (dist > 1 && source % 2 !== 0) {
      throw new Error("no way to the destination");
    }

    b.cells[target] = b.cells[source];
    b.cells[source] = BoardCell.EMPTY;
    b.currentPlayer = b.tigerPlayer;
  }
}

export class Tiger implements Player {
  move(board: Board, source: Position, target: Position) {
    if (board.currentPlayer !== this) {
      throw ErrorInvalidPlayer;
    }

    if (!board.isEmpty(target)) {
      throw ErrorTargetCellNotEmpty;
    }

    if (board.isEmpty(source)) {
      throw ErrorSourceCellEmpty;
    }

    const dist = Distance(source, target);

    if (dist >= 3) {
      throw new Error("can't jump that much");
    }

    // only even cells are diagonally connected
    if (dist > 1 && source % 2 !== 0) {
      throw new Error("no way to the destination");
    }

    // goats are being eaten
    if (dist >= 2) {
      const midPoint = MidPoint(source, target);

      if (board.isEmpty(midPoint as Position)) {
        throw new Error("can't eat anything");
      }

      if (board.cells[midPoint] === BoardCell.TIGER) {
        throw ErrorCantEatTigers;
      }

      board.cells[midPoint] = BoardCell.EMPTY;
    }

    board.cells[target] = board.cells[source];
    board.cells[source] = BoardCell.EMPTY;
    board.currentPlayer = board.goatPlayer;
  }
}
