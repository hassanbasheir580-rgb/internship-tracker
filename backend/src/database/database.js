const sqlite3 = require("sqlite3");
require("dotenv").config();

const databasePath = process.env.DATABASE_PATH;

const db = new sqlite3.Database(databasePath);