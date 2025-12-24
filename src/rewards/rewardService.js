import ProgressBar from "./ProgressBar";

export default function RewardCard({ user }) {
  const nextLevelPoints = getNextLevelTarget(user.level);
  const prevLevelPoints = getPrevLevelTarget(user.level);

  const progressValue = user.points - prevLevelPoints;
  const progressMax = nextLevelPoints - prevLevelPoints;

  return (
    <div className="planner-card rewards-card">
      <h2>🏆 Rewards Dashboard</h2>

      <div className="reward-stat">
        <strong>User</strong>
        <span>{user.username}</span>
      </div>

      <div className="reward-stat">
        <strong>Points</strong>
        <span>{user.points}</span>
      </div>

      <div className="reward-stat">
        <strong>Level</strong>
        <span>{user.level}</span>
      </div>

      <ProgressBar
        value={progressValue}
        max={progressMax}
        label="Progress to next level"
      />

      <h3>Badges</h3>
      <ul className="badge-list">
        {user.badges.length === 0 ? (
          <li style={{ opacity: 0.6 }}>No badges yet</li>
        ) : (
          user.badges.map(badge => (
            <li key={badge}>🏆 {badge}</li>
          ))
        )}
      </ul>
    </div>
  );
}

function getNextLevelTarget(level) {
  if (level === "Bronze") return 100;
  if (level === "Silver") return 500;
  if (level === "Gold") return 1000;
  return 1000;
}

function getPrevLevelTarget(level) {
  if (level === "Silver") return 100;
  if (level === "Gold") return 500;
  if (level === "Platinum") return 1000;
  return 0;
}