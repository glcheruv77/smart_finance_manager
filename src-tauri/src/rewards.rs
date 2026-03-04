use rusqlite::{params, Connection, Result};
use chrono::Utc;
use crate::model::{Reward, RewardSummary};

/* =========================
   DB INIT
========================= */

pub fn init_rewards_table(conn: &Connection) -> Result<()> {
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS rewards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            points INTEGER NOT NULL,
            earned_at TEXT NOT NULL
        )
        ",
        [],
    )?;
    Ok(())
}

/* =========================
   ADD REWARD
========================= */

pub fn add_reward(conn: &Connection, title: &str, points: i32) -> Result<()> {
    let now = Utc::now().to_rfc3339();

    conn.execute(
        "INSERT INTO rewards (title, points, earned_at) VALUES (?1, ?2, ?3)",
        params![title, points, now],
    )?;
    Ok(())
}

/* =========================
   FETCH ALL REWARDS
========================= */

pub fn get_rewards(conn: &Connection) -> Result<Vec<Reward>> {
    let mut stmt = conn.prepare(
        "SELECT id, title, points, earned_at FROM rewards ORDER BY earned_at DESC",
    )?;

    let rewards = stmt
        .query_map([], |row| {
            Ok(Reward {
                id: row.get(0)?,
                title: row.get(1)?,
                points: row.get(2)?,
                earned_at: row.get(3)?,
            })
        })?
        .collect::<Result<Vec<_>, _>>()?;

    Ok(rewards)
}

/* =========================
   SUMMARY / LEVEL SYSTEM
========================= */

pub fn get_reward_summary(conn: &Connection) -> Result<RewardSummary> {
    let total_points: i32 = conn.query_row(
        "SELECT COALESCE(SUM(points), 0) FROM rewards",
        [],
        |row| row.get(0),
    )?;

    let level = total_points / 500 + 1;
    let progress = (total_points % 500) as f32 / 500.0;

    Ok(RewardSummary {
        total_points,
        level,
        progress,
    })
}
