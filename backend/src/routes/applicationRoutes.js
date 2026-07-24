const express = require("express");

const router = express.Router();

const {
    createApplicationController,
    getApplicationsController
} = require("../controllers/applicationController");

router.post("/", createApplicationController);
router.get("/", getApplicationsController);

module.exports = router;