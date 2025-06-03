const { battleStats } = require("../3.js");

describe("battleStats", () => {
  test("should return correct stats for given battle data", () => {
    const battle = [
      ["Hwang Shi Mok", -1],
      ["Savants", 1],
      ["Hwang Shi Mok", 2],
      ["Hwang Shi Mok", 1],
      ["Savants", 5],
      ["Legolas", 10],
      ["Legolas", -20],
      ["Legolas", -10],
    ];
    const expectedOutput = {
      "Hwang Shi Mok": { Lose: 1, Win: 3 },
      "Savants": { Lose: 0, Win: 6 },
      "Legolas": { Lose: 30, Win: 10 },
    };
    expect(battleStats(battle)).toEqual(expectedOutput);
  });

  test("should return empty object for empty battle data", () => {
    const battle = [];
    const expectedOutput = {};
    expect(battleStats(battle)).toEqual(expectedOutput);
  });

  test("should handle battles with only wins", () => {
    const battle = [
      ["Hwang Shi Mok", 1],
      ["Savants", 2],
      ["Legolas", 3],
    ];
    const expectedOutput = {
      "Hwang Shi Mok": { Lose: 0, Win: 1 },
      "Savants": { Lose: 0, Win: 2 },
      "Legolas": { Lose: 0, Win: 3 },
    };
    expect(battleStats(battle)).toEqual(expectedOutput);
  });

  test("should handle battles with only losses", () => {
    const battle = [
      ["Hwang Shi Mok", -1],
      ["Savants", -2],
      ["Legolas", -3],
    ];
    const expectedOutput = {
      "Hwang Shi Mok": { Lose: 1, Win: 0 },
      "Savants": { Lose: 2, Win: 0 },
      "Legolas": { Lose: 3, Win: 0 },
    };
    expect(battleStats(battle)).toEqual(expectedOutput);
  });
});