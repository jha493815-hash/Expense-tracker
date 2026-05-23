import { Link, useLocation } from "react-router-dom";

import "./Sidebar.css";

import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Wallet,
  LogOut,
} from "lucide-react";

const Sidebar = () => {

  const location = useLocation();

  return (
    <div className="sidebar">

      <h2 className="logo">
        ExpenseAI
      </h2>

      <div className="menu">

        {/* DASHBOARD */}

        <Link to="/dashboard" className="link">

          <div
            className={
              location.pathname === "/dashboard"
                ? "menu-item active"
                : "menu-item"
            }
          >

            <LayoutDashboard />

            <span>Dashboard</span>

          </div>

        </Link>

        {/* TRANSACTIONS */}

        <Link to="/transactions" className="link">

          <div
            className={
              location.pathname === "/transactions"
                ? "menu-item active"
                : "menu-item"
            }
          >

            <Receipt />

            <span>Transactions</span>

          </div>

        </Link>

        {/* REPORTS */}

        <Link to="/reports" className="link">

          <div
            className={
              location.pathname === "/reports"
                ? "menu-item active"
                : "menu-item"
            }
          >

            <BarChart3 />

            <span>Reports</span>

          </div>

        </Link>

        {/* BUDGET */}

        <Link to="/budget-planner" className="link">

          <div
            className={
              location.pathname === "/budget-planner"
                ? "menu-item active"
                : "menu-item"
            }
          >

            <Wallet />

            <span>Budget Planner</span>

          </div>

        </Link>

      </div>

      {/* LOGOUT */}

      <div className="logout">

        <LogOut />

        <span>Logout</span>

      </div>

    </div>
  );
};

export default Sidebar;