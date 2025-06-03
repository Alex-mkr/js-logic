const hospitalRoom = require("../6.js");

describe("hospitalRoom", () => {
  test("should return correct room placement for given patients", () => {
    const input = [
      ["Dimas", "I"],
      ["Awtian", "II"],
      ["Dimitri", "II"],
      ["Icha", "II"],
      ["Hardim", "II"],
      ["Radit", "I"],
    ];
    const expectedOutput = {
      "I": [['Dimas'], ['Radit']],
      "II": [['Awtian', 'Dimitri'], ['Icha', 'Hardim']],
    };
    expect(hospitalRoom(input)).toEqual(expectedOutput);
  });

  test("should handle patients in multiple classes", () => {
    const input = [
      ["Zaskia", "I"],
      ["Adhi", "III"],
      ["Agus", "III"],
      ["Abu Hanifah", "III"],
      ["Umi Hani", "I"],
      ["Umar", "III"],
      ["Arthamevia", "IV"],
    ];
    const expectedOutput = {
      "I": [['Zaskia'], ['Umi Hani']],
      "III": [['Adhi', 'Agus', 'Abu Hanifah'], ['Umar']],
      "IV": [['Arthamevia']],
    };
    expect(hospitalRoom(input)).toEqual(expectedOutput);
  });

  test("should handle single patient in each class", () => {
    const input = [
      ["Naruto", "IV"],
      ["Sasuke", "II"],
      ["Sakura", "I"],
      ["Kakashi", "III"],
    ];
    const expectedOutput = {
      "IV": [['Naruto']],
      "II": [['Sasuke']],
      "I": [['Sakura']],
      "III": [['Kakashi']],
    };
    expect(hospitalRoom(input)).toEqual(expectedOutput);
  });

  test("should handle empty input", () => {
    const input = [];
    const expectedOutput = {};
    expect(hospitalRoom(input)).toEqual(expectedOutput);
  });
});