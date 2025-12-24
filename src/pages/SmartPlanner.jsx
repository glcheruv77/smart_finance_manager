import { useEffect, useState } from "react";
import {
  rewardForGoalCreation,
  rewardForGoalCompletion,
  rewardForAIUsage
} from "../services/rewardService";

export default function SmartPlanner() {
  const [goals, setGoals] = useState(
    JSON.parse(localStorage.getItem("goals")) || []
  );

  const [aiOutput, setAiOutput] = useState(
    "Click “Generate AI Plan” to see your insights."
  );

  // =========================
  // Goal Creation
  // =========================
  function handleAddGoal(e) {
    e.preventDefault();

    const name = e.target.goalName.value.trim();
    const amount = parseFloat(e.target.goalAmount.value);

    if (!name || amount <= 0) return;

    const newGoal = {
      id: Date.now(),
      name,
      amount,
      progress: 0,
      completed: false
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));

    rewardForGoalCreation();
    e.target.reset();
  }

  // =========================
  // Complete Goal
  // =========================
  function completeGoal(goalId) {
    const updatedGoals = goals.map(goal =>
      goal.id === goalId
        ? { ...goal, progress: goal.amount, completed: true }
        : goal
    );

    const completedGoal = goals.find(g => g.id === goalId);
    if (completedGoal && !completedGoal.completed) {
      rewardForGoalCompletion(completedGoal.name);
    }

    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  }

  // =========================
  // AI Planner (Mock)
  // =========================
  function generateAIPlan() {
    rewardForAIUsage();

    if (goals.length === 0) {
      setAiOutput("You don’t have any goals yet. Start by creating one.");
      return;
    }

    const totalTarget = goals.reduce((sum, g) => sum + g.amount, 0);

    setAiOutput(
      `Based on your ${goals.length} financial goals totaling $${totalTarget.toFixed(
        2
      )}, we recommend setting aside at least ${
        Math.ceil(totalTarget * 0.15)
      } per month. Focus on completing one goal at a time for maximum momentum.`
    );
  }

  // =========================
  // Sync on Load
  // =========================
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // =========================
  // Render
  // =========================
  return (
    <div className="planner-main">

      {/* Financial Goals */}
      <div className="planner-card">
        <h2>🎯 Financial Goals</h2>

        <form className="goal-form" onSubmit={handleAddGoal}>
          <input
            name="goalName"
            placeholder="Goal Name (e.g., Emergency Fund)"
            required
          />
          <input
            name="goalAmount"
            type="number"
            step="0.01"
            placeholder="Target Amount ($)"
            required
          />
          <button className="button">Add Goal</button>
        </form>

        <ul className="goal-list">
          {goals.length === 0 && (
            <li style={{ opacity: 0.6 }}>No goals yet</li>
          )}

          {goals.map(goal => (
            <li key={goal.id} className="goal-item">
              <strong>{goal.name}</strong>
              <span>${goal.amount.toFixed(2)}</span>

              {!goal.completed && (
                <button
                  className="button small"
                  onClick={() => completeGoal(goal.id)}
                >
                  Mark Complete
                </button>
              )}

              {goal.completed && (
                <span className="completed-badge">✅ Completed</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* AI Insights */}
      <div className="planner-card ai-section">
        <h2>🤖 AI Financial Insights</h2>
        <p>
          AI analyzes your spending, income, and goals to create a tailored
          financial plan.
        </p>

        <button className="button" onClick={generateAIPlan}>
          Generate AI Plan
        </button>

        <div className="ai-output">
          <p>{aiOutput}</p>
        </div>
      </div>

    </div>
  );
}
