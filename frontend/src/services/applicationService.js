const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function createApplication(application) {
    const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
    });

    return response.json();
}

async function getApplications() {
    const response = await fetch(`${API_URL}/applications`);

    return response.json();
}

async function updateStatus(id, newStatus) {

    const response = await fetch(`${API_URL}/applications/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ status: newStatus })
    });

    return response.json();
}

async function deleteApplication(id) {

    const response = await fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        }
    });

    return response.json();
}

export { 
    createApplication, 
    getApplications, 
    updateStatus,
    deleteApplication
};