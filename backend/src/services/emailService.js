const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail(to, verificationToken) {
    const frontendUrl =
        process.env.FRONTEND_URL || "http://localhost:5173";

    const verificationUrl =
        `${frontendUrl}/verify-email?token=${verificationToken}`;

    const { data, error } = await resend.emails.send({
        from: "Internship Tracker <onboarding@resend.dev>",
        to: [to],
        subject: "Verify your Internship Tracker account",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Verify your email</h2>

                <p>
                    Thanks for creating an Internship Tracker account.
                </p>

                <p>
                    Click the button below to verify your email address:
                </p>

                <a
                    href="${verificationUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #2563eb;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                    "
                >
                    Verify Email
                </a>

                <p style="margin-top: 24px;">
                    This verification link will expire in 1 hour.
                </p>
            </div>
        `,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

module.exports = {
    sendVerificationEmail,
};