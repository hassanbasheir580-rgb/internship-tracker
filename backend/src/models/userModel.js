const pool = require("../database/database");

async function createUser(email, passwordHash) {
    const sql = `
        INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING id, email, is_verified, created_at
    `;

    const result = await pool.query(sql, [email, passwordHash]);

    return result.rows[0];
}

async function findUserByEmail(email) {
    const sql = `
        SELECT *
        FROM users
        WHERE email = $1
    `;

    const result = await pool.query(sql, [email]);

    return result.rows[0];
}

module.exports = {
    createUser,
    findUserByEmail,
};