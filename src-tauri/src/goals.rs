use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use crate::model::Goal;


#[derive(Debug, Serialize, Deserialize)]
pub struct Goal {
    pub id: Option<i64>,
    pub title: String,
    pub target_amount: f64,
    pub current_amount: f64,
    pub completed: bool,
}

/* -------------------------------
   Database setup
-------------------------------- */

pub fn init_goals_table(conn: &Connection) {
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            target_amount REAL NOT NULL,
            current_amount REAL NOT NULL DEFAULT 0,
            completed INTEGER NOT NULL DEFAULT 0
        )
        ",
        [],
    )
    .expect("failed to create goals table");
}

/* -------------------------------
   CRUD operations
-------------------------------- */

pub fn add_goal(conn: &Connection, goal: Goal) {
    conn.execute(
        "
        INSERT INTO goals (title, target_amount, current_amount, completed)
        VALUES (?1, ?2, ?3, ?4)
        ",
        params![
            goal.title,
            goal.target_amount,
            goal.current_amount,
            goal.completed as i32
        ],
    )
    .expect("failed to insert goal");
}

pub fn list_goals(conn: &Connection) -> Vec<Goal> {
    let mut stmt = conn
        .prepare(
            "
            SELECT id, title, target_amount, current_amount, completed
            FROM goals
            ORDER BY id DESC
            ",
        )
        .expect("failed to prepare select");

    let rows = stmt
        .query_map([], |row| {
            Ok(Goal {
                id: row.get(0)?,
                title: row.get(1)?,
                target_amount: row.get(2)?,
                current_amount: row.get(3)?,
                completed: row.get::<_, i32>(4)? != 0,
            })
        })
        .expect("failed to query goals");

    rows.filter_map(Result::ok).collect()
}

pub fn update_goal_progress(conn: &Connection, goal_id: i64, amount: f64) {
    conn.execute(
        "
        UPDATE goals
        SET current_amount = current_amount + ?1
        WHERE id = ?2
        ",
        params![amount, goal_id],
    )
    .expect("failed to update goal progress");
}

pub fn complete_goal(conn: &Connection, goal_id: i64) {
    conn.execute(
        "
        UPDATE goals
        SET completed = 1
        WHERE id = ?1
        ",
        params![goal_id],
    )
    .expect("failed to complete goal");
}
