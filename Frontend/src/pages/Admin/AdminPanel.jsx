import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminPanel({ onLogout }) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUserTransactions, setSelectedUserTransactions] = useState(null);
  const [viewingEmail, setViewingEmail] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    setUsers(storedUsers);
  }, []);

  // DELETE USER
  const handleDeleteUser = (emailToDelete) => {
    if (window.confirm(`Are you absolutely sure you want to delete user: ${emailToDelete}? This cannot be undone.`)) {
      const updatedUsers = users.filter(user => user.email !== emailToDelete);
      setUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      localStorage.removeItem(`transactions_${emailToDelete}`);

      if (viewingEmail === emailToDelete) {
        setSelectedUserTransactions(null);
        setViewingEmail("");
      }
    }
  };

  // VIEW USER TRANSACTIONS
  const handleInspectUser = (email) => {
    const userTransactions =
      JSON.parse(localStorage.getItem(`transactions_${email}`)) || [];

    setSelectedUserTransactions(userTransactions);
    setViewingEmail(email);
  };

  // DELETE TRANSACTION
  const handleDeleteTransaction = (txIndex) => {
    if (window.confirm("Delete this user's transaction entry?")) {
      const updatedTx = [...selectedUserTransactions];
      updatedTx.splice(txIndex, 1);

      setSelectedUserTransactions(updatedTx);
      localStorage.setItem(
        `transactions_${viewingEmail}`,
        JSON.stringify(updatedTx)
      );
    }
  };

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Hubio <span>Master Control</span></h2>
        </div>

        <nav className="admin-nav">
          <a href="#database" className="active">🔑 Global Terminal</a>
        </nav>

        {/* BACK BUTTON */}
        <button
          className="admin-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <button className="admin-logout-btn" onClick={onLogout}>
          🚪 Terminate Session
        </button>
      </aside>

      {/* MAIN AREA */}
      <main className="admin-main">

        <header className="admin-header">
          <h1>Master Admin Workstation</h1>
          <span className="badge critical-shield">
            Root Access Granted
          </span>
        </header>

        {/* USERS TABLE */}
        <section className="users-section">
          <h2>System User Accounts Directory</h2>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Budget Target</th>
                  <th>Management Control Tools</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-row">
                      No active user databases found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td className="user-email">{user.email}</td>
                      <td className="user-budget">
                        ${Number(user.budget).toLocaleString()}
                      </td>
                      <td>
                        <div className="action-button-group">
                          <button
                            className="btn-inspect"
                            onClick={() => handleInspectUser(user.email)}
                          >
                            👁️ View Ledger
                          </button>

                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteUser(user.email)}
                          >
                            🗑️ Evict User
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* LEDGER SECTION */}
        {selectedUserTransactions && (
          <section className="admin-ledger-section animate-fade-in">

            <div className="ledger-header">
              <h3>
                Live Ledger Activity for: <span>{viewingEmail}</span>
              </h3>

              <button
                className="btn-close-ledger"
                onClick={() => setSelectedUserTransactions(null)}
              >
                ✕ Close Ledger
              </button>
            </div>

            <div className="table-container">
              <table className="ledger-table">

                <thead>
                  <tr>
                    <th>Date/Time</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedUserTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-row">
                        This user hasn't created any transaction history cards yet.
                      </td>
                    </tr>
                  ) : (
                    selectedUserTransactions.map((tx, idx) => (
                      <tr key={idx}>
                        <td>{tx.date || "N/A"}</td>

                        <td>
                          <strong>{tx.title || tx.description}</strong>
                        </td>

                        <td>
                          <span
                            className={`type-tag ${
                              tx.type === "income"
                                ? "tag-income"
                                : "tag-expense"
                            }`}
                          >
                            {tx.type}
                          </span>
                        </td>

                        <td
                          className={
                            tx.type === "income"
                              ? "income-color"
                              : "expense-color"
                          }
                        >
                          {tx.type === "income" ? "+" : "-"}$
                          {Number(tx.amount).toLocaleString()}
                        </td>

                        <td>
                          <button
                            className="btn-action-delete"
                            onClick={() => handleDeleteTransaction(idx)}
                          >
                            Remove Tx
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}