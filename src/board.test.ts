import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.136.0/testing/asserts.ts";
import {
  afterEach,
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.136.0/testing/bdd.ts";
import { Board, Goat, Tiger } from "./board.ts";

describe("Board", () => {
  it("constructor", () => {
    const board = new Board(new Goat(), new Tiger());
    assertEquals(board.cells.length, 25);
  });

  describe("move goat", () => {
    let board: Board;
    beforeEach(() => {
      board = new Board(new Goat(), new Tiger());
      board.insert(1);
      board.move(24, 23);
    });

    afterEach(() => {
      board.reset();
    });

    it("to non-empty cell", () => {
      assertThrows(() => board.move(1, 0), Error, "target cell is not empty");
    });

    it("to same cell", () => {
      assertThrows(() => board.move(1, 1), Error, "target cell is not empty");
    });

    it("jump", () => {
      assertThrows(() => board.move(1, 3), Error, "goats can't jump");
    });

    it("invalid diagonal move", () => {
      assertThrows(() => board.move(1, 7), Error, "no way to the destination");
    });

    it("valid horizontal move", () => {
      board.move(1, 2);
    });

    it("valid diagonal move", () => {
      board.move(0, 6);
    });
  });

  describe("insert", () => {
    let board: Board;
    beforeEach(() => {
      board = new Board(new Goat(), new Tiger());
    });

    afterEach(() => {
      board.reset();
    });
  });

  describe("second insert", () => {
    let board: Board;
    beforeEach(() => {
      board = new Board(new Goat(), new Tiger());
      board.insert(5);
      board.move(0, 1);
    });

    afterEach(() => {
      board.reset();
    });

    it("valid index", () => {
      assertEquals(board.cells.length, 25);
    });

    it("double entry", () => {
      assertThrows(
        () => board.insert(5),
        Error,
        "position already filled",
      );
    });
  });
});
