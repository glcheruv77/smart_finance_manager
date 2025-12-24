import ProgressBar from "./ProgressBar";
import { useRewardsContext } from "../context/RewardsContext";

export default function RewardsCard() {
  const { user } = useRewardsContext();

  return (
    <div className="card">
      <h3>Rewards Progress</h3>

      <p><strong>Points:</strong> {user.points}</p>
      <p><strong>Level:</strong> {user.level}</p>

      <ProgressBar
        value={user.points}
        max={1000}   // next milestone
      />
    </div>
  );
}
