const {
    createApplication,
    getApplications,
    updateStatus,
    deleteApplication
} = require("../models/applicationModel");

async function createApplicationController(req, res) {
    try {
        const application = req.body;
        const userId = req.user.id;

        await createApplication(application, userId);

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
        const userId = req.user.id;

        const applications = await getApplications(userId);

        res.status(200).json(applications);

    } catch (err) {
        console.error("❌ Failed to retrieve applications:", err);

        res.status(500).json({
            error: "Failed to retrieve applications."
        });
    }
}

async function updateStatusController(req, res) {
    try {
        const id = Number(req.params.id);
        const newStatus = req.body.status;
        const userId = req.user.id;

        await updateStatus(id, newStatus, userId);

        res.status(200).json({
            message: "Status updated successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Failed to update status"
        });
    }
}

async function deleteApplicationController(req, res) {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;

        await deleteApplication(id, userId);

        res.status(200).json({
            message: "Application deleted successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Failed to delete application"
        });
    }
}

module.exports = {
    createApplicationController,
    getApplicationsController,
    updateStatusController,
    deleteApplicationController
};