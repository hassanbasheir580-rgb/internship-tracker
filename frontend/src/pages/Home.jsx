import { useState, useEffect } from "react";
import InternshipForm from "../components/InternshipForm";
import InternshipList from "../components/InternshipList";
import { getApplications } from "../services/applicationService";

function Home() {
    const [applications, setApplications] = useState([]);

const fetchApplications = async () => {
    console.log("fetchApplications called");

    const data = await getApplications();

    console.log("Fetched:", data);

    setApplications(data);
};

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="container">
            <div className="card">

                <h1 className="title">
                    Internship Tracker
                </h1>

                <p className="subtitle">
                    Track all your internship applications
                </p>

                <InternshipForm fetchApplications={fetchApplications} />

                <InternshipList applications={applications} />

            </div>
        </div>
    );
}

export default Home;