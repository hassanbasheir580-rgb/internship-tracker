import { useState, useEffect } from "react";
import InternshipForm from "../components/InternshipForm";
import InternshipList from "../components/InternshipList";
import { getApplications } from "../services/applicationService";
import { Link } from "react-router-dom";

function Home() {
    const [applications, setApplications] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const filteredApplications = applications.filter((app) => {

        return app.company.toLowerCase().includes(searchValue.toLowerCase());

    })

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

                <div className="button-group">

                    <Link to="/add" className="button">
                        Add Internship
                    </Link>

                    <Link to="/stats" className="button">
                        View Statistics
                    </Link>

                </div>

                <InternshipList
                    applications={filteredApplications}
                    fetchApplications={fetchApplications}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />

            </div>
        </div>
    );
}

export default Home;