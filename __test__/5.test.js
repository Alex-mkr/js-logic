const reconcileLedgers = require("../soal/5.js");
const fs = require("fs");
const path = require("path");

const testCases = [
  {
    name: "All matched",
    input: [
      [
        { id: "A", amount: 100, status: "cleared", timestamp: "2025-06-01T10:00:00Z" },
        { id: "B", amount: 200, status: "pending", timestamp: "2025-06-01T11:00:00Z" },
      ],
      [
        { id: "A", amount: 100, status: "cleared", timestamp: "2025-06-01T10:00:00Z" },
        { id: "B", amount: 200, status: "pending", timestamp: "2025-06-01T11:00:00Z" },
      ]
    ],
    expected: {
      mismatches: [],
      summary: {
        totalLedgerTransactions: 2,
        totalBankTransactions: 2,
        totalMatchedTransactions: 2,
        totalMismatchedTransactions: 0,
        mismatchedByReason: {
          missing_in_bank: 0,
          missing_in_ledger: 0,
          amount_mismatch: 0,
          status_mismatch: 0,
          date_mismatch: 0
        },
        ledgerTotalAmount: 300,
        bankTotalAmount: 300
      }
    },
    score: 5,
  },
  {
    name: "Amount mismatch",
    input: [
      [
        { id: "A", amount: 100, status: "cleared", timestamp: "2025-06-01T10:00:00Z" },
      ],
      [
        { id: "A", amount: 120, status: "cleared", timestamp: "2025-06-01T10:00:00Z" },
      ]
    ],
    expected: {
      mismatches: [
        {
          id: "A",
          ledgerAmount: 100,
          bankAmount: 120,
          ledgerStatus: "cleared",
          bankStatus: "cleared",
          ledgerDate: "2025-06-01T10:00:00Z",
          bankDate: "2025-06-01T10:00:00Z",
          reason: "amount_mismatch"
        }
      ],
      summary: {
        totalLedgerTransactions: 1,
        totalBankTransactions: 1,
        totalMatchedTransactions: 0,
        totalMismatchedTransactions: 1,
        mismatchedByReason: {
          missing_in_bank: 0,
          missing_in_ledger: 0,
          amount_mismatch: 1,
          status_mismatch: 0,
          date_mismatch: 0
        },
        ledgerTotalAmount: 100,
        bankTotalAmount: 120
      }
    },
    score: 5,
  },
  {
    name: "Missing in ledger and bank",
    input: [
      [
        { id: "A", amount: 100, status: "cleared", timestamp: "2025-06-01T10:00:00Z" },
      ],
      [
        { id: "B", amount: 200, status: "pending", timestamp: "2025-06-01T11:00:00Z" },
      ]
    ],
    expected: {
      mismatches: [
        {
          id: "A",
          ledgerAmount: 100,
          bankAmount: null,
          ledgerStatus: "cleared",
          bankStatus: null,
          ledgerDate: "2025-06-01T10:00:00Z",
          bankDate: null,
          reason: "missing_in_bank"
        },
        {
          id: "B",
          ledgerAmount: null,
          bankAmount: 200,
          ledgerStatus: null,
          bankStatus: "pending",
          ledgerDate: null,
          bankDate: "2025-06-01T11:00:00Z",
          reason: "missing_in_ledger"
        }
      ],
      summary: {
        totalLedgerTransactions: 1,
        totalBankTransactions: 1,
        totalMatchedTransactions: 0,
        totalMismatchedTransactions: 2,
        mismatchedByReason: {
          missing_in_bank: 1,
          missing_in_ledger: 1,
          amount_mismatch: 0,
          status_mismatch: 0,
          date_mismatch: 0
        },
        ledgerTotalAmount: 100,
        bankTotalAmount: 200
      }
    },
    score: 5,
  },
  {
    name: "Date mismatch (difference > 2 days)",
    input: [
      [
        { id: "A", amount: 100, status: "cleared", timestamp: "2025-06-01T10:00:00Z" },
      ],
      [
        { id: "A", amount: 100, status: "cleared", timestamp: "2025-06-04T10:00:01Z" },
      ]
    ],
    expected: {
      mismatches: [
        {
          id: "A",
          ledgerAmount: 100,
          bankAmount: 100,
          ledgerStatus: "cleared",
          bankStatus: "cleared",
          ledgerDate: "2025-06-01T10:00:00Z",
          bankDate: "2025-06-04T10:00:01Z",
          reason: "date_mismatch"
        }
      ],
      summary: {
        totalLedgerTransactions: 1,
        totalBankTransactions: 1,
        totalMatchedTransactions: 0,
        totalMismatchedTransactions: 1,
        mismatchedByReason: {
          missing_in_bank: 0,
          missing_in_ledger: 0,
          amount_mismatch: 0,
          status_mismatch: 0,
          date_mismatch: 1
        },
        ledgerTotalAmount: 100,
        bankTotalAmount: 100
      }
    },
    score: 5,
  },
];

describe("reconcileLedgers", () => {
  let totalScore = 0;

  testCases.forEach(({ name, input, expected, score }) => {
    test(name, () => {
      const result = reconcileLedgers(...input);

      // Sort mismatches by id for comparison
      const norm = arr => arr.slice().sort((a, b) => a.id.localeCompare(b.id));
      if (result.mismatches) {
        expect(norm(result.mismatches)).toEqual(norm(expected.mismatches));
      } else {
        expect(result.mismatches).toEqual(expected.mismatches);
      }
      expect(result.summary).toEqual(expected.summary);

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