const pool = require("../database/database");

async function createApplication(application) {

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
            company,
            role,
            location,
            status,
            application_url,
            deadline,
            notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    await pool.query(sql, [
        company,
        role,
        location,
        status,
        application_url,
        deadline,
        notes,
    ]);
}

async function getApplications() {

    const sql = `
        SELECT *
        FROM applications
    `;

    const result = await pool.query(sql);

    return result.rows;
}

async function updateStatus(id, newStatus) {

    const sql = `
        UPDATE applications
        SET status = $1
        WHERE id = $2
    `;

    await pool.query(sql, [newStatus, id]);

    return {
        message: "Status updated successfully",
    };
}

async function deleteApplication(id) {

    const sql = `
        DELETE FROM applications
        WHERE id = $1
    `;

    await pool.query(sql, [id]);

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