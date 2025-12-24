import { useState, useEffect, useCallback } from "react";
import { calculateLevel, calculateCashback } from "../services/rewardService";

export default function useRewards() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("rewardUser")) || {
      username: "User",
      points: 0,
      badges: [],
      level: "Bronze"
    };
  });

  useEffect(() => {
    localStorage.setItem("rewardUser", JSON.stringify(user));
  }, [user]);

  const addPoints = useCallback((points, reason) => {
    setUser(prev => {
      const newPoints = prev.points + points;
      return {
        ...prev,
        points: newPoints,
        level: calculateLevel(newPoints)
      };
    });
  }, []);

  const awardBadge = (badge) => {
    setUser(prev =>
      prev.badges.includes(badge)
        ? prev
        : { ...prev, badges: [...prev.badges, badge] }
    );
  };

  return {
    user,
    addPoints,
    awardBadge,
    cashback: calculateCashback(user.points)
  };
}
