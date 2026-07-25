import { createApplication } from "../services/applicationService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InternshipForm() {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [application_url, setApplicationUrl] = useState("");
    const [deadline, setDeadline] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!company.trim() || !role.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        console.log("Submit button clicked!");

        const application = {
            company,
            role,
            location,
            status: "Saved",
            application_url,
            deadline,
            notes
        };

        try {
            const response = await createApplication(application);
            console.log(response);

            navigate("/"); // Navigate back to the home page after submission

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Company</label>
                <input
                    type="text"
                    placeholder="Google"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Role</label>
                <input
                    type="text"
                    placeholder="Software Engineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Location</label>
                <input
                    type="text"
                    placeholder="Malaysia, Cyberjaya"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Application URL</label>
                <input
                    type="text"
                    placeholder="https://example.com/apply"
                    value={application_url}
                    onChange={(e) => setApplicationUrl(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Deadline</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Notes</label>
                <div className="textarea">
                <textarea
                    placeholder="Add any notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                </div>
            </div>

            <button type="submit">
                Save Internship
            </button>
        </form>
    );
}

export default InternshipForm;