import Sidebar from "../../components/Sidebar/Sidebar"
import BalanceCard from "../../components/BalanceCard/BalanceCard";

import Navbar from "../../components/Navbar/Navbar";
import ExpenseChart from "../../components/Charts/ExpenseChart";
import SavingsChart from "../../components/Charts/SavingChart"
import TransactionList from "../../components/TransactionList/TransactionList";
import AI from "../../components/AI/AI"


import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
       <Navbar />

        {/* TOP SUMMARY */}
        <BalanceCard />

        {/* CHART SECTION */}
        <div className="charts-section">
          <ExpenseChart />
          <SavingsChart />
        </div>
      
       
<AI/>
  

        {/* TRANSACTIONS */}
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard;