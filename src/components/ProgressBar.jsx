export default function ProgressBar({ value, max = 100 }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%` }}
      />
      <span className="progress-bar-label">
        {Math.floor(percentage)}%
      </span>
    </div>
  );
}
