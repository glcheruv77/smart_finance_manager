import React, { useEffect, useState } from "react";
import { rewardForTransaction } from "../services/rewardService";

const BudgetTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("general");

  /* ===================== LOAD DATA ===================== */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);
  }, []);

  /* ===================== SAVE DATA ===================== */
  const saveTransactions = (data) => {
    localStorage.setItem("transactions", JSON.stringify(data));
    setTransactions(data);
  };

  /* ===================== ADD TRANSACTION ===================== */
  const addTransaction = (e) => {
    e.preventDefault();

    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString()
    };

    const updated = [newTransaction, ...transactions];
    saveTransactions(updated);

    // Reward system hook
    rewardForTransaction(newTransaction.amount, newTransaction.type);

    // Reset form
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("general");
  };

  /* ===================== CALCULATIONS ===================== */
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  /* ===================== RENDER ===================== */
  return (
    <div className="app-container">
      <h1>Budget Tracker</h1>

      {/* ===================== TOTALS ===================== */}
      <section className="totals">
        <div className="total-box income-box">
          <h3>Income</h3>
          <p>${income.toLocaleString()}</p>
        </div>

        <div className="total-box expense-box">
          <h3>Expenses</h3>
          <p>${expenses.toLocaleString()}</p>
        </div>

        <div className="total-box balance-box">
          <h3>Balance</h3>
          <p>${balance.toLocaleString()}</p>
        </div>
      </section>

      {/* ===================== ADD TRANSACTION ===================== */}
      <section className="planner-main">
        <div className="planner-card">
          <h3>Add Transaction</h3>

          <form onSubmit={addTransaction} className="form-grid">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="general">General</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
            </select>

            <button className="button" type="submit">
              Add
            </button>
          </form>
        </div>

        {/* ===================== TRANSACTION LIST ===================== */}
        <div className="planner-card">
          <h3>Recent Transactions</h3>

          {transactions.length === 0 ? (
            <p style={{ opacity: 0.6 }}>No transactions yet.</p>
          ) : (
            <ul className="transaction-list">
              {transactions.map((t) => (
                <li key={t.id} className={`transaction ${t.type}`}>
                  <span>{t.description}</span>
                  <span>${t.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default BudgetTracker;
