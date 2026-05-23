import api from "./api";

// GET
export const getTransactions = () => api.get("/transactions");

// POST
export const createTransaction = (data) =>
  api.post("/transactions", data);

// DELETE
export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`);