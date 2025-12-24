import RewardCard from "./RewardCard";
import ProgressBar from "./ProgressBar";

export default function RewardsContent({
  user,
  stats,
  onRedeem,
  onChangeUsername
}) {
  return (
    <>
      {/* User Summary */}
      <div className="card rewards-summary">
        <div className="rewards-user">
          <h2>{user.username}</h2>
          <span
            className="reward-level"
            style={{ color: stats.levelColor }}
          >
            {user.level}
          </span>
        </div>

        <div className="rewards-points">
          <strong>{user.points}</strong> points
        </div>

        <ProgressBar
          value={stats.progress.current}
          max={stats.progress.max}
        />

        <small className="next-level">
          {stats.progress.remaining > 0
            ? `${stats.progress.remaining} points to next level`
            : "Max level reached"}
        </small>
      </div>

      {/* Metrics */}
      <div className="rewards-grid">
        <RewardCard
          title="Badges"
          value={stats.badgeCount}
          description="Achievements unlocked"
        />

        <RewardCard
          title="Cash Back"
          value={`$${stats.cashback}`}
          description="Available to redeem"
          actionLabel="Redeem"
          onAction={onRedeem}
          disabled={user.points < 100}
        />

        <RewardCard
          title="Login Streak"
          value={`${stats.loginStreak} days`}
          description="Daily activity"
        />

        <RewardCard
          title="Scans"
          value={stats.totalScans}
          description="Documents processed"
        />
      </div>

      {/* Badges */}
      <div className="card">
        <h3>Badges Earned</h3>

        {user.badges.length === 0 ? (
          <p className="muted">No badges yet. Keep going.</p>
        ) : (
          <ul className="badge-list">
            {user.badges.map((badge) => (
              <li key={badge}>🏆 {badge}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Profile */}
      <div className="card">
        <h3>Profile</h3>
        <button className="secondary-btn" onClick={onChangeUsername}>
          Change Username
        </button>
      </div>
    </>
  );
}
