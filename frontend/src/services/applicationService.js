const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

async function createApplication(application) {
    const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(application),
    });

    return response.json();
}

async function getApplications() {
    const response = await fetch(`${API_URL}/applications`, {
        headers: getAuthHeaders(),
    });

    return response.json();
}

async function updateStatus(id, newStatus) {
    const response = await fetch(`${API_URL}/applications/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
    });

    return response.json();
}

async function deleteApplication(id) {
    const response = await fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    return response.json();
}

export {
    createApplication,
    getApplications,
    updateStatus,
    deleteApplication,
};