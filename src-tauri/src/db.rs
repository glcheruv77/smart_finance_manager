use rusqlite::{Connection, Result};
use std::path::PathBuf;
use tauri::api::path::app_data_dir;
use crate::goals::init_goals_table;
use crate::rewards::init_rewards_table;


/// Initialize the SQLite database
pub fn init_db() -> Result<Connection> {
    // Resolve OS-safe app data directory
    let mut db_path: PathBuf = app_data_dir(&tauri::Config::default())
        .expect("Failed to get app data directory");

    db_path.push("finance.db");

    let conn = Connection::open(db_path)?;

    // Create transactions table
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            tx_type TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        ",
        [],
    )?;

    Ok(conn)
}

pub fn init_db() -> rusqlite::Result<Connection> {
    let conn = Connection::open("finance.db")?;

    init_goals_table(&conn);
    // init_transactions_table(&conn);
    // init_documents_table(&conn);
    init_rewards_table(&conn)?;

    Ok(conn)
}
