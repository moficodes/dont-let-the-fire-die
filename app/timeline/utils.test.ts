import { expect, test, describe } from "bun:test";
import { formatGameTime } from "./utils";
import { GameTime } from "@/types";

describe("formatGameTime", () => {
  test("formats traditional calendar with 12-hour AM/PM", () => {
    const time: GameTime = {
      era: "The Second Age",
      year: 1000,
      month: "Solaris",
      day: 15,
      hour: 14,
      minute: 30,
    };
    expect(formatGameTime(time)).toBe("Solaris 15, 1000 at 2:30 PM");
  });

  test("formats Age of Umbra calendar with 20-hour military/direct time format", () => {
    const time: GameTime = {
      era: "Age of Umbra",
      year: 100,
      month: "Shade-Weave",
      day: 18,
      hour: 17,
      minute: 0,
    };
    expect(formatGameTime(time)).toBe("Shade-Weave 18, 100 - Age of Umbra at 17:00");
  });

  test("formats Age of Umbra midnight hour correctly", () => {
    const time: GameTime = {
      era: "Age of Umbra",
      year: 0,
      month: "Oth-Ascent",
      day: 1,
      hour: 0,
      minute: 0,
    };
    expect(formatGameTime(time)).toBe("Oth-Ascent 1, 0 - Age of Umbra at 00:00");
  });
});
