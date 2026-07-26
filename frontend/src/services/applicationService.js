async function createApplication(application) {
    const response = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
    });

    return response.json();
}

async function getApplications() {
    const response = await fetch("http://localhost:5000/applications");

    return response.json();
}

async function updateStatus(id, newStatus) {

    const response = await fetch(`http://localhost:5000/applications/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ status: newStatus })
    });

    return response.json();
}

export { createApplication, getApplications, updateStatus };