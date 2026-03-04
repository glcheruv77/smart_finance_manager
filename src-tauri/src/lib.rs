use rusqlite::Connection;
use tauri::State;

mod db;
mod transactions;
mod goals;
mod models;
mod rewards;

use db::init_db;
use transactions::{add_transaction, Transaction};
use goals::{add_goal, list_goals, update_goal_progress, complete_goal, Goal};
use rewards::{add_reward, get_rewards, get_reward_summary};
use models::{Reward, RewardSummary};

/* =========================
   APP STATE
========================= */

struct AppState {
    conn: Connection,
}

/* =========================
   TRANSACTIONS
========================= */

#[tauri::command]
fn create_transaction(state: State<AppState>, tx: Transaction) -> Result<(), String> {
    add_transaction(&state.conn, tx).map_err(|e| e.to_string())
}

/* =========================
   GOALS
========================= */

#[tauri::command]
fn create_goal(state: State<AppState>, goal: Goal) -> Result<(), String> {
    add_goal(&state.conn, goal).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_goals(state: State<AppState>) -> Result<Vec<Goal>, String> {
    Ok(list_goals(&state.conn))
}

#[tauri::command]
fn add_to_goal(state: State<AppState>, goal_id: i64, amount: f64) -> Result<(), String> {
    update_goal_progress(&state.conn, goal_id, amount)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn finish_goal(state: State<AppState>, goal_id: i64) -> Result<(), String> {
    complete_goal(&state.conn, goal_id).map_err(|e| e.to_string())
}

/* =========================
   REWARDS
========================= */

#[tauri::command]
fn earn_reward(
    state: State<AppState>,
    title: String,
    points: i32,
) -> Result<(), String> {
    add_reward(&state.conn, &title, points)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn fetch_rewards(state: State<AppState>) -> Result<Vec<Reward>, String> {
    get_rewards(&state.conn).map_err(|e| e.to_string())
}

#[tauri::command]
fn fetch_reward_summary(state: State<AppState>) -> Result<RewardSummary, String> {
    get_reward_summary(&state.conn).map_err(|e| e.to_string())
}

/* =========================
   APP ENTRY POINT
========================= */

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let conn = init_db().expect("Failed to initialize database");

    tauri::Builder::default()
        .manage(AppState { conn })
        .invoke_handler(tauri::generate_handler![
            create_transaction,
            create_goal,
            get_goals,
            add_to_goal,
            finish_goal,
            earn_reward,
            fetch_rewards,
            fetch_reward_summary
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
