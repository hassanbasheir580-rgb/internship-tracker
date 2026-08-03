const pool = require("../database/database");

async function createUser(
    email,
    passwordHash,
    verificationToken,
    verificationTokenExpires
) {
    const sql = `
        INSERT INTO users (
            email,
            password_hash,
            verification_token,
            verification_token_expires
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, is_verified, created_at
    `;

    const result = await pool.query(sql, [
        email,
        passwordHash,
        verificationToken,
        verificationTokenExpires,
    ]);

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

async function findUserByVerificationToken(verificationToken) {
    const sql = `
        SELECT *
        FROM users
        WHERE verification_token = $1
        AND verification_token_expires > CURRENT_TIMESTAMP
    `;

    const result = await pool.query(sql, [verificationToken]);

    return result.rows[0];
}

async function verifyUser(userId) {
    const sql = `
        UPDATE users
        SET
            is_verified = TRUE,
            verification_token = NULL,
            verification_token_expires = NULL
        WHERE id = $1
        RETURNING id, email, is_verified
    `;

    const result = await pool.query(sql, [userId]);

    return result.rows[0];
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserByVerificationToken,
    verifyUser,
};