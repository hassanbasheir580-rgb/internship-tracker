import { createApplication } from "../services/applicationService";
import { useState } from "react";

function InternshipForm({ fetchApplications }) {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");

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
            location: "",
            status: "Saved",
            application_url: "",
            deadline: "",
            notes: ""
        };

        try {
            const response = await createApplication(application);
            console.log(response);
            await fetchApplications();

            window.location.reload(); // Refresh the page to show the updated list of applications

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

            <button type="submit">
                Save Internship
            </button>
        </form>
    );
}

export default InternshipForm;