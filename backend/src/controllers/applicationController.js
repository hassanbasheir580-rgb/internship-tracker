const { createApplication, getApplications, updateStatus, deleteApplication } = require("../models/applicationModel");

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

async function updateStatusController(req, res) {

    try {

        const id = req.params.id;
        const newStatus = req.body.status;
        await updateStatus(id, newStatus);

        res.status(200).json({ message: "Status updated successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Failed to update status" });

    }

}

async function deleteApplicationController(req, res){
    
    try {

        const id = req.params.id;
        await deleteApplication(id)

        res.status(200).json({ message : "Application deleted successfully" })

    } catch (error) {

        console.error(error);
        res.status(500).json({ error : "Failed to delete application" })

    }

}

module.exports = {
    createApplicationController,
    getApplicationsController,
    updateStatusController,
    deleteApplicationController
};