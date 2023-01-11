import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.136.0/testing/bdd.ts";
import { Distance, IndexToXY, MidPoint } from "./distance.ts";

describe("Distance", () => {
  it("index to coordinates", () => {
    assertEquals(IndexToXY(1), [0, 1]);
    assertEquals(IndexToXY(4), [0, 4]);
    assertEquals(IndexToXY(5), [1, 0]);
    assertEquals(IndexToXY(10), [2, 0]);
    assertEquals(IndexToXY(24), [4, 4]);
  });

  it("horizontal Distance", () => {
    assertEquals(Distance(1, 2), 1);
    assertEquals(Distance(5, 6), 1);

    assertEquals(Distance(0, 4), 4);
    assertEquals(Distance(5, 9), 4);
  });

  it("vertical Distance", () => {
    assertEquals(Distance(0, 5), 1);
    assertEquals(Distance(5, 10), 1);
    assertEquals(Distance(9, 14), 1);

    assertEquals(Distance(9, 19), 2);
    assertEquals(Distance(0, 20), 4);
  });

  it("mid point", () => {
    assertEquals(MidPoint(1, 3), 2);
    assertEquals(MidPoint(1, 11), 6);
    assertEquals(MidPoint(0, 12), 6);
  });
});
