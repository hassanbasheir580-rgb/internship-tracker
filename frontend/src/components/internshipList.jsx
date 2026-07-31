import { deleteApplication, updateStatus } from "../services/applicationService";

function InternshipList({ applications, fetchApplications, searchValue, setSearchValue }) {
    return (
        <div className="application-list">
            <h2>Internship Applications</h2>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

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

                        <div className="application-actions">
                            <select className={`status ${app.status.toLowerCase()}`} value={app.status} onChange={async (e) => {
                                await updateStatus(
                                    app.id,
                                    e.target.value
                                );
                                await fetchApplications(); // Fetch the updated list of applications
                            }}>
                                <option value=" Saved">Saved</option>
                                <option value=" Applied">Applied</option>
                                <option value=" Interviewing">Interviewing</option>
                                <option value=" Accepted">Accepted</option>
                                <option value=" Rejected">Rejected</option>
                            </select>

                            <a
                                className="link"
                                href={app.application_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit
                            </a>

                            <button
                                type="button"
                                className="delete-button" onClick={async () => {
                                    await deleteApplication(app.id);
                                    await fetchApplications();
                                }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default InternshipList;