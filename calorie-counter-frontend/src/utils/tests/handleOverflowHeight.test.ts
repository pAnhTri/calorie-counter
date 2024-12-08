import { handleOverflowHeight } from "../handleOverflowHeight";

describe("handleOverflowHeight", () => {
  test("empty input results to 0", () => {
    expect(handleOverflowHeight("")).toEqual([0, 0]);
  });

  test("valid inputs with feet and inches", () => {
    expect(handleOverflowHeight("5'11\"")).toEqual([5, 11]);
    expect(handleOverflowHeight("6'12\"")).toEqual([7, 0]);
    expect(handleOverflowHeight("4'15\"")).toEqual([5, 3]);
    expect(handleOverflowHeight("0'13\"")).toEqual([1, 1]);
  });

  test("valid inputs with inches only", () => {
    expect(handleOverflowHeight('15"')).toEqual([1, 3]);
    expect(handleOverflowHeight('11"')).toEqual([0, 11]);
    expect(handleOverflowHeight('24"')).toEqual([2, 0]);
    expect(handleOverflowHeight('01"')).toEqual([0, 1]);
  });

  test("valid inputs with feet only", () => {
    expect(handleOverflowHeight("5'")).toEqual([5, 0]);
    expect(handleOverflowHeight("6'")).toEqual([6, 0]);
    expect(handleOverflowHeight("9'")).toEqual([9, 0]);
  });

  test("invalid inputs", () => {
    expect(() => handleOverflowHeight("abc")).toThrow("Invalid height input");
    expect(() => handleOverflowHeight("5'11'")).toThrow("Invalid height input");
    expect(() => handleOverflowHeight('5"11"')).toThrow("Invalid height input");
    expect(() => handleOverflowHeight("5'11'11\"")).toThrow(
      "Invalid height input"
    );
  });
});
