const express = require("express");

const router = express.Router();

const {
    createApplicationController,
    getApplicationsController,
    updateStatusController,
    deleteApplicationController
} = require("../controllers/applicationController");

router.post("/", createApplicationController);
router.get("/", getApplicationsController);
router.put("/:id", updateStatusController);
router.delete("/:id", deleteApplicationController);

module.exports = router;