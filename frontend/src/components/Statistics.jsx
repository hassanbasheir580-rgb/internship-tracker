import react from "react";

function Statistics({ applications }) {
    
    const totalApplications = applications.length;
    const savedApplications = applications.filter((application) => application.status === "Saved").length;
    const appliedApplications = applications.filter((application) => application.status === "Applied").length;
    const interviewApplications = applications.filter((application) => application.status === "Interview").length;
    const acceptedApplications = applications.filter((application) => application.status === "Accepted").length;
    const rejectedApplications = applications.filter((application) => application.status === "Rejected").length;

    return (
        <div className="statistics-cards"> 
            <div className="statistics-card">
                <p>Total Applications <br /> {totalApplications}</p>
            </div>
            <div className="statistics-card">
                <p>Saved Applications <br /> {savedApplications}</p>
            </div>
            <div className="statistics-card">
                <p>Applied Applications <br /> {appliedApplications}</p>
            </div>
            <div className="statistics-card">
                <p>Interview Applications <br /> {interviewApplications}</p>
            </div>
            <div className="statistics-card">
                <p>Accepted Applications <br /> {acceptedApplications}</p>
            </div>
            <div className="statistics-card">
                <p>Rejected Applications <br /> {rejectedApplications}</p>
            </div>
        </div>
    );

}

export default Statistics;