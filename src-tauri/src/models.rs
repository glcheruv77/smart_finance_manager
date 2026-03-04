use serde::{Deserialize, Serialize};

/* =========================
   TRANSACTIONS
========================= */

#[derive(Debug, Serialize, Deserialize)]
pub struct Transaction {
    pub id: Option<i64>,
    pub title: String,
    pub amount: f64,
    pub category: String,
    pub timestamp: String,
}

/* =========================
   GOALS
========================= */

#[derive(Debug, Serialize, Deserialize)]
pub struct Goal {
    pub id: Option<i64>,
    pub title: String,
    pub target_amount: f64,
    pub current_amount: f64,
    pub completed: bool,
}

/* =========================
   DOCUMENTS
========================= */

#[derive(Debug, Serialize, Deserialize)]
pub struct Document {
    pub id: Option<i64>,
    pub name: String,
    pub path: String,
    pub doc_type: String,
    pub uploaded_at: String,
}

/* =========================
   OPTIONAL: USER SETTINGS
========================= */

#[derive(Debug, Serialize, Deserialize)]
pub struct UserSettings {
    pub dark_mode: bool,
    pub currency: String,
}
/* =========================
   REWARDS
========================= */

#[derive(Debug, Serialize, Deserialize)]
pub struct Reward {
    pub id: Option<i64>,
    pub title: String,
    pub points: i32,
    pub earned_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RewardSummary {
    pub total_points: i32,
    pub level: i32,
    pub progress: f32,
}
