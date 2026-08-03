const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail,
} = require("../models/userModel");

async function registerController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required.",
            });
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                error: "An account with this email already exists.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await createUser(email, passwordHash);

        res.status(201).json({
            message: "Account created successfully.",
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

async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required.",
            });
        }

        const user = await findUserByEmail(email);

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
};