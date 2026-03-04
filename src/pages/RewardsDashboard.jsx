import { useEffect, useState } from "react";
import { fetchRewards, fetchRewardSummary } from "../rewards/rewardService";

export default function RewardsDashboard({ user }) {
  const [rewards, setRewards] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchRewards().then(setRewards);
    fetchRewardSummary().then(setSummary);
  }, []);

  return (
    <div>
      <h2>🏆 Rewards Dashboard</h2>

      <div className="reward-stat">
        <strong>User</strong>
        <span>{user?.username ?? "Guest"}</span>
      </div>

      <div className="reward-stat">
        <strong>Total Points</strong>
        <span>{summary?.total_points ?? 0}</span>
      </div>

      <ul>
        {rewards.map((r) => (
          <li key={r.id}>
            {r.title} (+{r.points})
          </li>
        ))}
      </ul>
    </div>
  );
}
