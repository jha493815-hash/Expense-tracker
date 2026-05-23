import { useState, useEffect } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionList/TransactionList";
import SearchBar from "../../components/SearchBar/SearchBar";

import { useTransactions } from "../../context/TransactionContext";

import "./Transactions.css";

const Transactions = () => {

  const {
    transactions = [],
  } = useTransactions() || {};

  const [filtered, setFiltered] =
    useState([]);

  // sync when data updates
  useEffect(() => {
    setFiltered(transactions);
  }, [transactions]);

  // search handler
  const handleSearch = (query) => {

    const result = transactions.filter(
      (t) =>

        t.title
          ?.toLowerCase()
          .includes(query.toLowerCase())

        ||

        t.category
          ?.toLowerCase()
          .includes(query.toLowerCase())

    );

    setFiltered(result);
  };

  return (
    <div className="transaction-page">

      <Sidebar />

      <div className="transaction-content">

        <Navbar />

        {/* SEARCH */}
        <SearchBar
          onSearch={handleSearch}
        />

        {/* FORM */}
        <TransactionForm />

        {/* LIST */}
        <TransactionList
          data={filtered}
        />

      </div>
    </div>
  );
};

export default Transactions;