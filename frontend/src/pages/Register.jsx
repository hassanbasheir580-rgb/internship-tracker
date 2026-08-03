import { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await register(email, password);

            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Create an account to start tracking your applications.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        required
                    />

                    {error && (
                        <p className="auth-error">{error}</p>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;