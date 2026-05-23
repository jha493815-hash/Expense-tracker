import React, { useState, useEffect } from 'react';
import './BudgetPlanner.css';

export default function BudgetPlanner({ userEmail }) {
  // Budget States
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const saved = localStorage.getItem(`budget_${userEmail}`);
    return saved ? Number(saved) : 2000; 
  });
// { if people spent over thaen this message shown examples}
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(`categories_${userEmail}`);
    return saved ? JSON.parse(saved) : [
      { name: 'Rent & Housing', allocated: 800, spent: 800 },
      { name: 'Groceries & Food', allocated: 400, spent: 250 },
      { name: 'Entertainment & Leisure', allocated: 300, spent: 340 }, 
      { name: 'Utilities & Internet', allocated: 200, spent: 120 },
      { name: 'Savings & Investing', allocated: 300, spent: 300 }
    ];
  });

  // Form Inputs State
  const [newAllocated, setNewAllocated] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Sync state changes back to localStorage
  useEffect(() => {
    localStorage.setItem(`budget_${userEmail}`, monthlyBudget.toString());
  }, [monthlyBudget, userEmail]);

  useEffect(() => {
    localStorage.setItem(`categories_${userEmail}`, JSON.stringify(categories));
  }, [categories, userEmail]);

  // Handle updating a category's budget ceiling
  const handleUpdateBudget = (e) => {
    e.preventDefault();
    if (!newAllocated || isNaN(newAllocated)) return;

    const updated = [...categories];
    updated[selectedIdx].allocated = Number(newAllocated);
    setCategories(updated);
    
    // Dynamically update total master budget based on sum of allocations
    const newTotal = updated.reduce((sum, cat) => sum + cat.allocated, 0);
    setMonthlyBudget(newTotal);
    setNewAllocated('');
  };

  // Global calculations
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = monthlyBudget - totalSpent;

  return (
    <div className="planner-grid-layout">
      {/* LEFT COLUMN: Controls & Allocation Tool */}
      <div className="planner-card control-panel">
        <div className="panel-header">
          <h2>Budget Planner Setup</h2>
          <p>Distribute your financial limits across target profiles</p>
        </div>

        <div className="master-budget-display">
          <span>Master Target Budget</span>
          <h2>${monthlyBudget.toLocaleString()}</h2>
        </div>

        <form onSubmit={handleUpdateBudget} className="allocation-form">
          <div className="form-group">
            <label>Select Category to Modify</label>
            <select 
              value={selectedIdx} 
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={idx}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>New Allocated Limit ($)</label>
            <input 
              type="number" 
              placeholder="e.g. 500" 
              value={newAllocated}
              onChange={(e) => setNewAllocated(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-update-budget">
            💾 Apply Limit Adjustment
          </button>
        </form>

        <div className="planner-summary-footer">
          <div className="summary-pill total-spent">
            <span>Total Utilized</span>
            <strong>${totalSpent.toLocaleString()}</strong>
          </div>
          <div className={`summary-pill total-left ${remainingBudget < 0 ? 'deficit' : 'surplus'}`}>
            <span>Remaining Runway</span>
            <strong>${remainingBudget.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Visual Progress Channels & Overspending Indicators */}
      <div className="planner-card status-panel">
        <h3>Live Allocation Channels</h3>
        <div className="channels-list">
          {categories.map((cat, idx) => {
            const usagePercent = Math.min((cat.spent / cat.allocated) * 100, 100);
            const isOverspent = cat.spent > cat.allocated;

            return (
              <div key={idx} className={`channel-item ${isOverspent ? 'danger-alert' : ''}`}>
                <div className="channel-meta">
                  <div className="channel-info">
                    <h4>{cat.name}</h4>
                    <span className="channel-numbers">
                      ${cat.spent.toLocaleString()} spent / <strong>${cat.allocated.toLocaleString()} cap</strong>
                    </span>
                  </div>
                  {isOverspent && <span className="warning-badge">⚠️ Budget Breached</span>}
                </div>

                {/* Custom animated progress tracks */}
                <div className="progress-track-bg">
                  <div 
                    className={`progress-fill-bar ${isOverspent ? 'fill-danger' : 'fill-normal'}`}
                    style={{ width: `${usagePercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}