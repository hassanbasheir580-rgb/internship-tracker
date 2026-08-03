const pool = require("../database/database");

async function createApplication(application, userId) {
    const {
        company,
        role,
        location,
        status,
        application_url,
        deadline,
        notes,
    } = application;

    const sql = `
        INSERT INTO applications (
            user_id,
            company,
            role,
            location,
            status,
            application_url,
            deadline,
            notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    await pool.query(sql, [
        userId,
        company,
        role,
        location,
        status,
        application_url,
        deadline,
        notes,
    ]);
}

async function getApplications(userId) {
    const sql = `
        SELECT *
        FROM applications
        WHERE user_id = $1
        ORDER BY created_at DESC
    `;

    const result = await pool.query(sql, [userId]);

    return result.rows;
}

async function updateStatus(id, newStatus, userId) {
    const sql = `
        UPDATE applications
        SET status = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        AND user_id = $3
    `;

    await pool.query(sql, [newStatus, id, userId]);

    return {
        message: "Status updated successfully",
    };
}

async function deleteApplication(id, userId) {
    const sql = `
        DELETE FROM applications
        WHERE id = $1
        AND user_id = $2
    `;

    await pool.query(sql, [id, userId]);

    return {
        message: "Application deleted successfully",
    };
}

module.exports = {
    createApplication,
    getApplications,
    updateStatus,
    deleteApplication,
};