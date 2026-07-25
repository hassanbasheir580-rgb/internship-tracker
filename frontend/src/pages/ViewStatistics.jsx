import { useState } from "react";
import { useEffect } from "react";
import Statistics from "../components/Statistics";
import { getApplications } from "../services/applicationService";

function ViewStatistics() {
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
                <h1 className="title">Statistics</h1>
                <Statistics applications={applications} />
            </div>
        </div>
    );
}

export default ViewStatistics;