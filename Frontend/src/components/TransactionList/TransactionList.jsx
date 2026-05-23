import React from "react";
import { useTransactions } from "../../context/TransactionContext";
import "./TransactionList.css";

const TransactionList = ({ data }) => {

  const {
    transactions = [],
    deleteTransaction,
  } = useTransactions() || {};

  // use filtered data if available
  const listData = data || transactions;

  return (
    <div className="transaction-container">

      <h2 className="title">
        Recent Transactions
      </h2>

      {listData.length === 0 ? (

        <p className="empty">
          No transactions found
        </p>

      ) : (

        <ul className="transaction-list">

          {listData.map((t) => (

            <li
              key={t._id}
              className="transaction-item"
            >

              <div className="left">

                <h4>{t.title}</h4>

                <p className="category">
                  {t.category}
                </p>

              </div>

              <div className="right">

                <span
                  className={
                    t.type === "expense"
                      ? "amount expense"
                      : "amount income"
                  }
                >
                  {t.type === "expense"
                    ? "-"
                    : "+"}
                  ₹{t.amount}
                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTransaction?.(t._id)
                  }
                >
                  ❌
                </button>

              </div>

            </li>

          ))}

        </ul>

      )}
    </div>
  );
};

export default TransactionList;