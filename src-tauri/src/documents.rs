use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use crate::model::Document;


#[derive(Debug, Serialize, Deserialize)]
pub struct Document {
    pub id: Option<i32>,
    pub file_name: String,
    pub doc_type: String,      // "receipt" | "pdf"
    pub extracted_text: String,
    pub total_amount: Option<f64>,
    pub created_at: String,
}

/* ============================
   Database Setup
============================ */

pub fn init_documents_table(conn: &Connection) -> Result<()> {
    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_name TEXT NOT NULL,
            doc_type TEXT NOT NULL,
            extracted_text TEXT NOT NULL,
            total_amount REAL,
            created_at TEXT NOT NULL
        )
        ",
        [],
    )?;
    Ok(())
}

/* ============================
   CRUD Operations
============================ */

pub fn add_document(conn: &Connection, doc: Document) -> Result<()> {
    conn.execute(
        "
        INSERT INTO documents
        (file_name, doc_type, extracted_text, total_amount, created_at)
        VALUES (?1, ?2, ?3, ?4, ?5)
        ",
        params![
            doc.file_name,
            doc.doc_type,
            doc.extracted_text,
            doc.total_amount,
            doc.created_at
        ],
    )?;
    Ok(())
}

pub fn get_all_documents(conn: &Connection) -> Result<Vec<Document>> {
    let mut stmt = conn.prepare(
        "
        SELECT id, file_name, doc_type, extracted_text, total_amount, created_at
        FROM documents
        ORDER BY created_at DESC
        ",
    )?;

    let docs_iter = stmt.query_map([], |row| {
        Ok(Document {
            id: row.get(0)?,
            file_name: row.get(1)?,
            doc_type: row.get(2)?,
            extracted_text: row.get(3)?,
            total_amount: row.get(4)?,
            created_at: row.get(5)?,
        })
    })?;

    let mut docs = Vec::new();
    for doc in docs_iter {
        docs.push(doc?);
    }

    Ok(docs)
}
