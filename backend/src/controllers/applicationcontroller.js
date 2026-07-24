const { createApplication, getApplications } = require("../models/applicationModel");

async function createApplicationController(req, res) {
    try {
        const application = req.body;

        await createApplication(application);

        res.status(201).json({
            message: "Application created successfully."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Failed to create application."
        });

    }
}

async function getApplicationsController(req, res) {
    try {
        const applications = await getApplications();

        res.status(200).json(applications);

    } catch (err) {
        console.error("❌ Failed to retrieve applications:", err);

        res.status(500).json({ 
            error: "Failed to retrieve applications." 
        });
    }
}

module.exports = {
    createApplicationController,
    getApplicationsController
};