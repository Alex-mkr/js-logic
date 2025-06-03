const isMatchBloodType = require("../5.js");

describe("isMatchBloodType", () => {
  test("should return true for valid child blood type from parents O and A", () => {
    expect(isMatchBloodType("O", "A", "O")).toBe(true);
    expect(isMatchBloodType("O", "A", "A")).toBe(true);
  });

  test("should return false for invalid child blood type from parents O and A", () => {
    expect(isMatchBloodType("O", "A", "B")).toBe(false);
  });

  test("should return true for valid child blood type from parents AB and B", () => {
    expect(isMatchBloodType("AB", "B", "B")).toBe(true);
  });

  test("should return false for invalid child blood type from parents AB and B", () => {
    expect(isMatchBloodType("AB", "B", "O")).toBe(false);
  });
});