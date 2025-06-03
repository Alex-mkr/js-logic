const summarizeOrderStatus = require("../soal/1.js");
const fs = require("fs");
const path = require("path");

const testCases = [
  {
    name: "Single transit, mixed statuses",
    input: [
      {
        transit: "Warehouse",
        orders: [
          { orderId: "ORD1", status: "processing" },
          { orderId: "ORD2", status: "shipped" },
          { orderId: "ORD3", status: "processing" },
          { orderId: "ORD4", status: "cancelled" },
          { orderId: "ORD5", status: "shipped" },
        ],
      },
    ],
    expected: [
      { status: "processing", count: 2 },
      { status: "shipped", count: 2 },
      { status: "cancelled", count: 1 },
    ],
    score: 5,
  },
  {
    name: "Multiple transit locations",
    input: [
      {
        transit: "Warehouse",
        orders: [
          { orderId: "ORD1", status: "processing" },
          { orderId: "ORD2", status: "shipped" },
        ],
      },
      {
        transit: "Sorting",
        orders: [
          { orderId: "ORD3", status: "shipped" },
          { orderId: "ORD4", status: "shipped" },
        ],
      },
      {
        transit: "Delivery",
        orders: [
          { orderId: "ORD5", status: "delivered" },
          { orderId: "ORD6", status: "delivered" },
        ],
      },
    ],
    expected: [
      { status: "processing", count: 1 },
      { status: "shipped", count: 3 },
      { status: "delivered", count: 2 },
    ],
    score: 5,
  },
  {
    name: "Empty orders in transits",
    input: [
      { transit: "Warehouse", orders: [] },
      { transit: "Delivery", orders: [] },
    ],
    expected: [],
    score: 5,
  },
  {
    name: "All orders have same status",
    input: [
      {
        transit: "Fulfillment",
        orders: [
          { orderId: "ORD1", status: "cancelled" },
          { orderId: "ORD2", status: "cancelled" },
        ],
      },
    ],
    expected: [{ status: "cancelled", count: 2 }],
    score: 5,
  },
];

describe("summarizeOrderStatus", () => {
  let totalScore = 0;

  testCases.forEach(({ name, input, expected, score }) => {
    test(name, () => {
      const result = summarizeOrderStatus(input);

      const normalized = result.sort((a, b) =>
        a.status.localeCompare(b.status)
      );
      const expectedNormalized = expected.sort((a, b) =>
        a.status.localeCompare(b.status)
      );

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
