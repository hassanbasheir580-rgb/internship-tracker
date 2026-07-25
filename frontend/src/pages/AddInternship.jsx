import InternshipForm from "../components/InternshipForm";

function AddInternship() {

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">Add Internship</h1>
                <p className="subtitle">Fill out the form below to add a new internship application.</p>
                <InternshipForm />
            </div>
        </div>
    );
}

export default AddInternship;