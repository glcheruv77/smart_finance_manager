import React from "react";
import { Link } from "react-router-dom";
import RewardCard from "../components/RewardCard";
import ProgressBar from "../components/ProgressBar";

const Dashboard = () => {
  // Temporary mock data (until backend exists)
  const summary = {
    balance: 3240,
    income: 5200,
    expenses: 1960,
    rewardPoints: 780,
    rewardGoal: 1000
  };

  return (
    <div className="app-container">
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

      {/* ===================== FINANCIAL OVERVIEW ===================== */}
      <section className="totals">
        <div className="total-box income-box">
          <h3>Income</h3>
          <p>${summary.income.toLocaleString()}</p>
        </div>

        <div className="total-box expense-box">
          <h3>Expenses</h3>
          <p>${summary.expenses.toLocaleString()}</p>
        </div>

        <div className="total-box balance-box">
          <h3>Balance</h3>
          <p>${summary.balance.toLocaleString()}</p>
        </div>
      </section>

      {/* ===================== QUICK ACTIONS ===================== */}
      <section className="planner-main">
        <div className="planner-card">
          <h3>Quick Actions</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/budget" className="button">Budget Tracker</Link>
            <Link to="/scanner" className="button">Scan Document</Link>
            <Link to="/planner" className="button">Smart Planner</Link>
          </div>
        </div>

        {/* ===================== REWARDS PREVIEW ===================== */}
        <div className="planner-card rewards-card">
          <h3>Rewards Progress</h3>

          <RewardCard
            title="Current Points"
            value={`${summary.rewardPoints} pts`}
          />

          <ProgressBar
            value={summary.rewardPoints}
            max={summary.rewardGoal}
            label="Next Reward"
          />

          <Link to="/rewards" className="reward-btn" style={{ marginTop: "14px", display: "inline-block" }}>
            View Rewards
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
