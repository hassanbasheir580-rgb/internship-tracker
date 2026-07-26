const db = require("../database/database");

function createApplication(application) {
    return new Promise((resolve, reject) => {

        const company = application.company;
        const role = application.role;
        const location = application.location;
        const status = application.status;
        const application_url = application.application_url;
        const deadline = application.deadline;
        const notes = application.notes;

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
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(
            sql,
            [
                company,
                role,
                location,
                status,
                application_url,
                deadline,
                notes
            ],
            function (err) {

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }

            }
        );

    });
}

function getApplications() {
    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM applications
        `;

        db.all(sql, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });

    });
}

function updateStatus(id, newStatus) {
    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE applications
            SET status = ?
            WHERE id = ?  
        `;

        db.run(sql, [newStatus, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: "Status updated successfully" });
            }
        });

    })
}

module.exports = {
    createApplication,
    getApplications,
    updateStatus
};