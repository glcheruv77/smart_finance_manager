use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use crate::model::Transaction;


#[derive(Serialize, Deserialize)]
pub struct Transaction {
    pub description: String,
    pub amount: f64,
    pub tx_type: String,
    pub date: String,
}

pub fn add_transaction(conn: &Connection, tx: Transaction) {
    conn.execute(
        "INSERT INTO transactions (description, amount, type, date)
         VALUES (?1, ?2, ?3, ?4)",
        params![tx.description, tx.amount, tx.tx_type, tx.date],
    ).unwrap();
}
