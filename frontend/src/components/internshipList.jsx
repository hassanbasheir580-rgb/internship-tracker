function InternshipList({ applications }) {
    return (
        <div className="application-list">
            <h2>Internship Applications</h2>

            {applications.length === 0 ? (
                <p>No applications yet.</p>
            ) : (
                applications.map((app) => (
                    <div key={app.id} className="application-item">
                        <div>
                            <h3>{app.company}</h3>
                            <p>{app.role}</p>
                        </div>

                        <span className="status">
                            {app.status}
                        </span>
                    </div>
                ))
            )}
        </div>
    );
}

export default InternshipList;