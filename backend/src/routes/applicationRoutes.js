const express = require("express");

const router = express.Router();

const {
    createApplicationController,
    getApplicationsController,
    updateStatusController
} = require("../controllers/applicationController");

router.post("/", createApplicationController);
router.get("/", getApplicationsController);
router.put("/:id", updateStatusController);

module.exports = router;