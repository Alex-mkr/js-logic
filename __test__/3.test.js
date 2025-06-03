const consolidateOverdueInvoices = require("../soal/3.js");
const fs = require("fs");
const path = require("path");

const testCases = [
  {
    name: "Basic overdue consolidation",
    input: [
      { client: "Acme", dueDate: 1748716800000, amount: 300 }, // 2025-06-01
      { client: "Beta", dueDate: 1749062400000, amount: 150 }, // 2025-06-05 (not overdue)
      { client: "Acme", dueDate: 1748803200000, amount: 200 }, // 2025-06-02
      { client: "Beta", dueDate: 1748623200000, amount: 100 }, // 2025-05-31
    ],
    expected: [
      { client: "Acme", totalOverdue: 500 },
      { client: "Beta", totalOverdue: 100 },
    ],
    score: 5,
  },
  {
    name: "No overdue invoices",
    input: [
      { client: "Acme", dueDate: 1749062400000, amount: 300 }, // 2025-06-05
      { client: "Beta", dueDate: 1749150000000, amount: 200 }, // after 2025-06-03
    ],
    expected: [],
    score: 5,
  },
  {
    name: "Multiple clients with mixed overdue",
    input: [
      { client: "Gamma", dueDate: 1748600000000, amount: 400 },
      { client: "Gamma", dueDate: 1748700000000, amount: 600 },
      { client: "Delta", dueDate: 1749200000000, amount: 500 },
    ],
    expected: [
      { client: "Gamma", totalOverdue: 1000 },
    ],
    score: 5,
  },
  {
    name: "Empty input",
    input: [],
    expected: [],
    score: 5,
  },
];

describe("consolidateOverdueInvoices", () => {
  let totalScore = 0;

  testCases.forEach(({ name, input, expected, score }) => {
    test(name, () => {
      const result = consolidateOverdueInvoices(input);

      // Sort by client name for stable comparison
      const normalized = result.sort((a, b) => a.client.localeCompare(b.client));
      const expectedNormalized = expected.sort((a, b) => a.client.localeCompare(b.client));

      expect(normalized).toEqual(expectedNormalized);

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
