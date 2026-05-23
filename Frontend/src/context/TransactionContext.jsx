import {
  createContext,
  useContext,
  useState,
} from "react";

const TransactionContext =
  createContext();

export const TransactionProvider = ({
  children,
}) => {

  const [balance, setBalance] =
    useState(4000);

  const [transactions, setTransactions] =
    useState([]);

  const addTransaction = (
    title,
    amount,
    category
  ) => {

    const newTransaction = {
      id: Date.now(),
      title,
      amount,
      category,
      date:
        new Date().toLocaleDateString(),
    };

    setTransactions([
      newTransaction,
      ...transactions,
    ]);

    setBalance(
      balance - Number(amount)
    );
  };

  return (

    <TransactionContext.Provider
      value={{
        balance,
        transactions,
        addTransaction,
      }}
    >

      {children}

    </TransactionContext.Provider>

  );
};

export const useTransactions = () => {
  return useContext(
    TransactionContext
  );
};

export default TransactionContext;