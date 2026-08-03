const express = require("express");

const {
    registerController,
    loginController,
    verifyEmailController,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/verify-email", verifyEmailController);

module.exports = router;