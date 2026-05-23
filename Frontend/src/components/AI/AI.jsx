import React from "react";
import { useTransactions } from "../../context/TransactionContext";
import "./AI.css";

const AIInsights = () => {

  const { transactions = [] } =
    useTransactions() || {};

  let income = 0;
  let expense = 0;

  const categoryMap = {};

  transactions.forEach((t) => {

    const amt = Number(t.amount);

    if (t.type === "income") {
      income += amt;
    } else {
      expense += amt;
    }

    if (categoryMap[t.category]) {
      categoryMap[t.category] += amt;
    } else {
      categoryMap[t.category] = amt;
    }

  });

  const savings = income - expense;

  let topCategory = "None";
  let max = 0;

  Object.keys(categoryMap).forEach((key) => {

    if (categoryMap[key] > max) {
      max = categoryMap[key];
      topCategory = key;
    }

  });

  return (
    <div className="ai-container">

      <h2>🧠 AI Insights</h2>

      {transactions.length === 0 ? (

        <p>
          Add transactions to get insights
        </p>

      ) : (

        <div className="insights">

          <p>
            💰 Income:
            <b> ₹{income}</b>
          </p>

          <p>
            💸 Expense:
            <b> ₹{expense}</b>
          </p>

          <p>
            💾 Savings:
            <b
              style={{
                color:
                  savings > 0
                    ? "lightgreen"
                    : "red",
              }}
            >
              {" "}₹{savings}
            </b>
          </p>

          <p>
            📊 Top Spending Category:
            <b> {topCategory}</b>
          </p>

          {expense > income && (
            <p style={{ color: "red" }}>
              ⚠ You are spending more than you earn!
            </p>
          )}

          {savings > 0 &&
            savings < income * 0.2 && (
              <p style={{ color: "orange" }}>
                ⚠ Try to increase your savings rate
              </p>
            )}

          {savings > income * 0.3 && (
            <p style={{ color: "lightgreen" }}>
              🎉 Great job! You are saving well
            </p>
          )}

        </div>
      )}
    </div>
  );
};

export default AIInsights;