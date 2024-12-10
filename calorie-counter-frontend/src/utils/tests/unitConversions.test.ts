import { convertWeight, convertHeight } from "../unitConversions";

describe("convertWeight", () => {
  test("converts kg to lbs", () => {
    expect(convertWeight(1, true)).toBe(2.2); // 1kg = 2.204 lbs (rounded to 2.20)
    expect(convertWeight(0.5, true)).toBe(1.1); // 0.5kg = 1.102 lbs (rounded to 1.1)
  });

  test("converts lbs to grams", () => {
    expect(convertWeight(1.1, false)).toBe(0.5); // 1.1 lbs = 0.5 kg
    expect(convertWeight(2.205, false)).toBe(1.0); // 2.205 lbs = 1 kg
    expect(convertWeight(1, false)).toBe(0.45); // 1.1 lbs = 0.45 kg
  });

  test("handles zero weight correctly", () => {
    expect(convertWeight(0, true)).toBe(0.0); // 0 grams = 0 lbs
    expect(convertWeight(0, false)).toBe(0.0); // 0 lbs = 0 grams
  });

  test("handles negative weights", () => {
    expect(convertWeight(-1, true)).toBe(-2.2); // -1 grams = -2.20 lbs
    expect(convertWeight(-2.205, false)).toBe(-1.0); // -2.205 lbs = -1 kg
  });
});

describe("convertHeight", () => {
  // Test metric-to-imperial conversions
  describe("Metric to Imperial", () => {
    test("180 cm to imperial", () => {
      expect(convertHeight("180", true)).toBe("5'11\"");
    });

    test("150 cm to imperial", () => {
      expect(convertHeight("150", true)).toBe("4'11\"");
    });

    test("0 cm to imperial", () => {
      expect(convertHeight("0", true)).toBe("0'00\"");
    });

    test("Height with decimals", () => {
      expect(convertHeight("167.64", true)).toBe("5'06\"");
    });

    test("Negative height should throw an error", () => {
      expect(() => convertHeight("-180", true)).toThrow("Invalid height input");
    });
  });

  // Test imperial-to-metric conversions
  describe("Imperial to Metric", () => {
    test("5'11\" to metric", () => {
      expect(convertHeight("5'11\"", false)).toBeCloseTo(180.34);
    });

    test("6'2\" to metric", () => {
      expect(convertHeight("6'2\"", false)).toBeCloseTo(187.96);
    });

    test("0'0\" to metric", () => {
      expect(convertHeight("0'0\"", false)).toBe(0);
      expect(convertHeight("", false)).toBe(0);
    });

    test('Only inches (e.g., 11") to metric', () => {
      expect(convertHeight('11"', false)).toBeCloseTo(27.94);
    });

    test("Only feet (e.g., 6') to metric", () => {
      expect(convertHeight("6'", false)).toBeCloseTo(182.88);
    });

    test("Invalid format should throw an error", () => {
      expect(() => convertHeight("invalid", false)).toThrow(
        "Invalid height input"
      );
      expect(() => convertHeight("5'11'", false)).toThrow(
        "Invalid height input"
      );
      expect(() => convertHeight('5"11"', false)).toThrow(
        "Invalid height input"
      );
      expect(() => convertHeight("5'11'11\"", false)).toThrow(
        "Invalid height input"
      );
    });
  });
});
