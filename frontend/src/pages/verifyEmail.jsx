import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        async function verifyEmail() {
            const token = searchParams.get("token");

            if (!token) {
                setStatus("error");
                setMessage("Verification token is missing.");
                return;
            }

            try {
                const response = await fetch(
                    `${API_URL}/auth/verify-email?token=${encodeURIComponent(token)}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Email verification failed."
                    );
                }

                setStatus("success");
                setMessage("Your email has been verified successfully.");
            } catch (error) {
                setStatus("error");
                setMessage(error.message);
            }
        }

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Email Verification</h1>

                <p className="auth-subtitle">
                    {message}
                </p>

                {status === "success" && (
                    <p>
                        <Link to="/login">
                            Continue to Login
                        </Link>
                    </p>
                )}

                {status === "error" && (
                    <p>
                        <Link to="/register">
                            Back to Register
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;