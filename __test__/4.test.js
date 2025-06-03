const { recap } = require("../4.js");

describe("recap", () => {
  test("should return correct recap for given data", () => {
    const dataInput = [
      { name: 'Adi', department: 'IT', value: 80 },
      { name: 'Bintang', department: 'Biology', value: 70 },
      { name: 'Nanda', department: 'IT', value: 90 },
      { name: 'Rama', department: 'Electrical Engineering', value: 80 },
      { name: 'Reggi', department: 'IT', value: 100 },
      { name: 'Windy', department: 'Biology', value: 100 },
    ];
    const expectedOutput = {
      'IT': { students: ['Adi', 'Nanda', 'Reggi'], average: 90 },
      'Biology': { students: ['Bintang', 'Windy'], average: 85 },
      'Electrical Engineering': { students: ['Rama'], average: 80 },
    };
    expect(recap(dataInput)).toEqual(expectedOutput);
  });

  test("should return empty object for empty data", () => {
    const dataInput = [];
    const expectedOutput = {};
    expect(recap(dataInput)).toEqual(expectedOutput);
  });

  test("should handle data with only one student", () => {
    const dataInput = [
      { name: 'Adi', department: 'IT', value: 80 },
    ];
    const expectedOutput = {
      'IT': { students: ['Adi'], average: 80 },
    };
    expect(recap(dataInput)).toEqual(expectedOutput);
  });

  test("should handle data with multiple students in one department", () => {
    const dataInput = [
      { name: 'Adi', department: 'IT', value: 80 },
      { name: 'Nanda', department: 'IT', value: 90 },
      { name: 'Reggi', department: 'IT', value: 100 },
    ];
    const expectedOutput = {
      'IT': { students: ['Adi', 'Nanda', 'Reggi'], average: 90 },
    };
    expect(recap(dataInput)).toEqual(expectedOutput);
  });
});