import { updateStatus } from "../services/applicationService";

function InternshipList({ applications, fetchApplications }) {
    return (
        <div className="application-list">
            <h2>Internship Applications</h2>

            {applications.length === 0 ? (
                <div className="text-center">
                    <div>No applications yet.</div>
                </div>
            ) : (
                applications.map((app) => (
                    <div key={app.id} className="application-item">
                        <div>
                            <h3>{app.company}</h3>
                            <p>{app.role}</p>
                        </div>

                        <select className={`status ${app.status.toLowerCase()}`} value={app.status} onChange={async (e) => {
                            await updateStatus(
                                app.id,
                                e.target.value
                            );
                            await fetchApplications(); // Fetch the updated list of applications
                        }}>
                            <option value="Saved">Saved</option>
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                ))
            )}
        </div>
    );
}

export default InternshipList;