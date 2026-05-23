import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { useTransactions } from "../../context/TransactionContext";

import "./Charts.css";

const SavingsChart = () => {

  const { transactions = [] } =
    useTransactions() || {};

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

  const savings = income - expense;
  const spent = expense;

  const data = [
    {
      name: "Savings",
      value: savings > 0 ? savings : 0,
    },
    {
      name: "Spent",
      value: spent,
    },
  ];

  const COLORS = ["#4CAF50", "#FF3D00"];

  return (
    <div className="chart-container">

      <div className="chart-title">
        Savings Overview
      </div>

      <div className="chart-subtext">
        How much you are saving vs spending
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
            innerRadius={65}
            outerRadius={95}
            paddingAngle={6}
          >

            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </div>
    </div>
  );
};

export default SavingsChart;