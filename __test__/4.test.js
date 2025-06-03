const calculatePromoRevenueAndRisk = require("../soal/4.js");
const fs = require("fs");
const path = require("path");

const testCases = [
  {
    name: "No markup promotions",
    input: [
      {
        storeId: "S3",
        sales: [
          { product: "A", basePrice: 100, soldPrice: 100, quantity: 2 },
          { product: "B", basePrice: 200, soldPrice: 180, quantity: 3 },
        ],
      },
    ],
    expected: [
      { storeId: "S3", promoRevenue: 0, riskScore: 0 },
    ],
    score: 5,
  },
  {
    name: "All markup promotions, different risk",
    input: [
      {
        storeId: "S4",
        sales: [
          { product: "A", basePrice: 50, soldPrice: 100, quantity: 1 }, // +50, risk 1
          { product: "B", basePrice: 100, soldPrice: 200, quantity: 2 }, // +200, risk 2
        ],
      },
    ],
    expected: [
      { storeId: "S4", promoRevenue: 250, riskScore: 3.00 },
    ],
    score: 5,
  },
  {
    name: "Mixed promotions and no promotions",
    input: [
      {
        storeId: "S5",
        sales: [
          { product: "A", basePrice: 100, soldPrice: 120, quantity: 1 }, // +20, risk 0.2
          { product: "B", basePrice: 100, soldPrice: 100, quantity: 2 }, // 0
          { product: "C", basePrice: 50, soldPrice: 60, quantity: 3 },   // +30, risk 0.6
        ],
      },
    ],
    expected: [
      { storeId: "S5", promoRevenue: 50, riskScore: 0.8 },
    ],
    score: 5,
  },
  {
    name: "Empty sales array",
    input: [
      { storeId: "S6", sales: [] },
    ],
    expected: [
      { storeId: "S6", promoRevenue: 0, riskScore: 0 },
    ],
    score: 5,
  },
];

describe("calculatePromoRevenueAndRisk", () => {
  let totalScore = 0;

  testCases.forEach(({ name, input, expected, score }) => {
    test(name, () => {
      const result = calculatePromoRevenueAndRisk(input);

      // Sort by storeId for comparison
      const norm = arr => arr.slice().sort((a, b) => a.storeId.localeCompare(b.storeId));
      expect(norm(result)).toEqual(norm(expected));

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