const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
    createUser,
    findUserByEmail,
    findUserByVerificationToken,
    verifyUser,
} = require("../models/userModel");

const {
    sendVerificationEmail,
} = require("../services/emailService");


async function registerController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await findUserByEmail(normalizedEmail);

        if (existingUser) {
            return res.status(409).json({
                error: "An account with this email already exists.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        // Generate a secure random verification token
        const verificationToken = crypto
            .randomBytes(32)
            .toString("hex");

        // Store only the hash in the database
        const verificationTokenHash = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

        // Verification link expires after 1 hour
        const verificationTokenExpires =
            new Date(Date.now() + 60 * 60 * 1000);

        const user = await createUser(
            normalizedEmail,
            passwordHash,
            verificationTokenHash,
            verificationTokenExpires
        );

        await sendVerificationEmail(
            normalizedEmail,
            verificationToken
        );

        res.status(201).json({
            message:
                "Account created successfully. Please check your email to verify your account.",
            user: {
                id: user.id,
                email: user.email,
                is_verified: user.is_verified,
            },
        });

    } catch (err) {
        console.error("Registration error:", err);

        res.status(500).json({
            error: "Failed to create account.",
        });
    }
}


async function verifyEmailController(req, res) {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                error: "Verification token is required.",
            });
        }

        // Hash the token from the URL so we can compare
        // it with the hash stored in PostgreSQL.
        const verificationTokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await findUserByVerificationToken(
            verificationTokenHash
        );

        if (!user) {
            return res.status(400).json({
                error: "Verification link is invalid or has expired.",
            });
        }

        await verifyUser(user.id);

        res.status(200).json({
            message: "Email verified successfully.",
        });

    } catch (err) {
        console.error("Email verification error:", err);

        res.status(500).json({
            error: "Failed to verify email.",
        });
    }
}


async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await findUserByEmail(normalizedEmail);

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                error: "Invalid email or password.",
            });
        }

        // Correct password, but email hasn't been verified.
        if (!user.is_verified) {
            return res.status(403).json({
                error: "Please verify your email before logging in.",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                email: user.email,
                is_verified: user.is_verified,
            },
        });

    } catch (err) {
        console.error("Login error:", err);

        res.status(500).json({
            error: "Failed to log in.",
        });
    }
}


module.exports = {
    registerController,
    loginController,
    verifyEmailController,
};