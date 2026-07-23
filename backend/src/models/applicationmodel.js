const db = require("../database/database");

function createApplication(application) {
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
        notes,
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
        notes,
    ],
    function (err) {
        if (err) {
            console.error("❌ Failed to create application:", err);
        } else {
            console.log("✅ Application created successfully.");
        }
    }
);

}

module.exports = {
    createApplication
};