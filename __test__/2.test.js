const salaryAllocationByLevel = require("../soal/2.js");
const fs = require("fs");
const path = require("path");

const testCases = [
  {
    name: "Empty departments input",
    input: [],
    expected: [],
    score: 5,
  },
  {
    name: "Department with no employees",
    input: [
      { name: "HR", employees: [] },
      {
        name: "Finance",
        employees: [{ level: "Junior", salary: 3000 }],
      },
    ],
    expected: [
      {
        department: "Finance",
        level: "Junior",
        total: 3000,
        average: 3000,
        median: 3000,
      },
    ],
    score: 5,
  },
  {
    name: "Multiple employees with same level and salaries (median even)",
    input: [
      {
        name: "Dev",
        employees: [
          { level: "Mid", salary: 7000 },
          { level: "Mid", salary: 8000 },
          { level: "Mid", salary: 9000 },
          { level: "Mid", salary: 10000 },
        ],
      },
    ],
    expected: [
      {
        department: "Dev",
        level: "Mid",
        total: 34000,
        average: 8500,
        median: 8500,
      },
    ],
    score: 5,
  },
  {
    name: "Multiple departments and levels with mixed salaries",
    input: [
      {
        name: "Design",
        employees: [
          { level: "Junior", salary: 4000 },
          { level: "Junior", salary: 6000 },
          { level: "Senior", salary: 12000 },
          { level: "Senior", salary: 15000 },
          { level: "Senior", salary: 13000 },
        ],
      },
      {
        name: "Support",
        employees: [
          { level: "Junior", salary: 3500 },
          { level: "Junior", salary: 3700 },
          { level: "Junior", salary: 3900 },
          { level: "Senior", salary: 8000 },
        ],
      },
    ],
    expected: [
      {
        department: "Design",
        level: "Junior",
        total: 10000,
        average: 5000,
        median: 5000,
      },
      {
        department: "Design",
        level: "Senior",
        total: 40000,
        average: 13333.333333333334,
        median: 13000,
      },
      {
        department: "Support",
        level: "Junior",
        total: 11100,
        average: 3700,
        median: 3700,
      },
      {
        department: "Support",
        level: "Senior",
        total: 8000,
        average: 8000,
        median: 8000,
      },
    ],
    score: 5,
  },
];

describe("salaryAllocationByLevel", () => {
  let totalScore = 0;

  function sortResult(arr) {
    return arr
      .slice()
      .sort((a, b) =>
        a.department.localeCompare(b.department) ||
        a.level.localeCompare(b.level)
      );
  }

  testCases.forEach(({ name, input, expected, score }) => {
    test(name, () => {
      const result = salaryAllocationByLevel(input);
      const sortedResult = sortResult(result);
      const sortedExpected = sortResult(expected);
      expect(sortedResult).toEqual(sortedExpected);
      totalScore += score;
    });
  });

  afterAll(() => {
    const scoreFile = path.join("__test__", "score.json");
    let finalScore = totalScore;

    if (fs.existsSync(scoreFile)) {
      const previous = JSON.parse(fs.readFileSync(scoreFile, "utf-8"));
      if (typeof previous.score === "number") {
        finalScore += previous.score;
      }
    }

    fs.writeFileSync(scoreFile, JSON.stringify({ score: finalScore }, null, 2));
    console.log(`Final Score: ${finalScore}`);
  });
});
