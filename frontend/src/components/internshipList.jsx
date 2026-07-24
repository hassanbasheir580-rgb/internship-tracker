function InternshipList({ applications }) {
    return (
        <div>
            <h2>Internship Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app.id}>
                        <strong>{app.company}</strong> - {app.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InternshipList;