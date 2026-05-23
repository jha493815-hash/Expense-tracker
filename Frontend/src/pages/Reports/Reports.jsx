import "./Reports.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const Reports = () => {

  const data = [
    {
      name: "Food",
      value: 1200,
    },

    {
      name: "Travel",
      value: 800,
    },

    {
      name: "Shopping",
      value: 1500,
    },

    {
      name: "Bills",
      value: 700,
    },
  ];

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
  ];

  return (
    <div className="reports-page">

      <h1>
        Expense Reports
      </h1>

      <div className="charts-grid">

        {/* PIE CHART */}

        <div className="chart-card">

          <h2>
            Expense Categories
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}

        <div className="chart-card">

          <h2>
            Monthly Spending
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={data}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[10,10,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default Reports;