import "./TransactionForm.css";

import { useState } from "react";

import {
  useTransactions,
} from "../../context/TransactionContext";

const TransactionForm = () => {

  const {
    addTransaction,
  } = useTransactions();

  const [amount, setAmount] =
    useState("");

  const [showCustom, setShowCustom] =
    useState(false);

  const [customTitle, setCustomTitle] =
    useState("");

  const [customCategory,
    setCustomCategory] =
    useState("");

  const categories = [
    "Food",
    "Movie",
    "Travel",
    "Shopping",
    "Bills",
    "Games",
  ];

  // QUICK EXPENSE

  const handleQuickExpense = (
    category
  ) => {

    if(!amount) return;

    addTransaction(
      category,
      amount,
      category
    );

    setAmount("");
  };

  // CUSTOM EXPENSE

  const handleCustomExpense = (
    e
  ) => {

    e.preventDefault();

    if(
      !customTitle ||
      !amount ||
      !customCategory
    ) return;

    addTransaction(
      customTitle,
      amount,
      customCategory
    );

    setCustomTitle("");
    setAmount("");
    setCustomCategory("");
  };

  return (
    <div className="transaction-form">

      <h2>
        Quick Expense
      </h2>

      {/* AMOUNT */}

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      {/* QUICK BUTTONS */}

      <div className="category-grid">

        {categories.map((item, index) => (

          <button
            key={index}
            onClick={() =>
              handleQuickExpense(item)
            }
          >

            {item}

          </button>

        ))}

      </div>

      {/* CUSTOM */}

      <button
        className="custom-btn"
        onClick={() =>
          setShowCustom(!showCustom)
        }
      >

        + Custom Expense

      </button>

      {/* CUSTOM FORM */}

      {showCustom && (

        <form
          className="custom-form"
          onSubmit={handleCustomExpense}
        >

          <input
            type="text"
            placeholder="Expense Title"
            value={customTitle}
            onChange={(e) =>
              setCustomTitle(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={customCategory}
            onChange={(e) =>
              setCustomCategory(
                e.target.value
              )
            }
          />

          <button type="submit">
            Add Expense
          </button>

        </form>

      )}

    </div>
  );
};

export default TransactionForm;