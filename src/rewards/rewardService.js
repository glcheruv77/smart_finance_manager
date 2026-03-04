import { invoke } from "@tauri-apps/api/core";

export async function fetchRewards() {
  return invoke("fetch_rewards");
}

export async function fetchRewardSummary() {
  return invoke("fetch_reward_summary");
}

export async function earnReward(title, points) {
  return invoke("earn_reward", { title, points });
}
