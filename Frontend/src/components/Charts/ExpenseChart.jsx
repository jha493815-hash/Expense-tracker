import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { useTransactions } from "../../context/TransactionContext";

import "./Charts.css";

const ExpenseChart = () => {

  const { transactions = [] } = useTransactions() || {};

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const amt = Number(t.amount);

    if (t.type === "income") {
      income += amt;
    } else {
      expense += amt;
    }
  });

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#00E676", "#FF5252"];

  return (
    <div className="chart-container">

      <div className="chart-title">
        Income vs Expense
      </div>

      <div className="chart-subtext">
        Live breakdown from your transactions
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PieChart width={280} height={280}>

          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </div>

    </div>
  );
};

export default ExpenseChart;