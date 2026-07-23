const sqlite3 = require("sqlite3");
require("dotenv").config();

const databasePath = process.env.DATABASE_PATH;

const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(`
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company TEXT NOT NULL,
            role TEXT NOT NULL,
            location TEXT,
            application_url TEXT,
            status TEXT NOT NULL DEFAULT 'Saved',
            applied_date DATE,
            deadline DATE,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `,
        (err) => {
        if (err) {
            console.error("❌ Failed to create applications table:", err);
        } else {
            console.log("✅ Applications table ready.");
        }
    });
    }
});

module.exports = db;