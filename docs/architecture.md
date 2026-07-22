# System Architecture

## Overview

The Internship Tracker is a full-stack web application designed to help students manage and monitor their internship applications. The application follows a client-server architecture, where the frontend communicates with the backend through a REST API, and the backend manages all interactions with the database.

---

## Technology Stack

### Frontend

- React
- React Router
- CSS
- Axios

**Responsibilities**

- Display the user interface
- Manage application state
- Send API requests
- Display internship data

---

### Backend

- Node.js
- Express.js

**Responsibilities**

- Process client requests
- Validate incoming data
- Handle business logic
- Communicate with the database
- Return API responses

---

### Database

- SQLite

**Responsibilities**

- Store internship applications
- Store user information (future)
- Store application notes
- Persist application data

---

## System Architecture Diagram

```text
+----------------------+
|      React App       |
|      (Frontend)      |
+----------+-----------+
           |
           | HTTP Requests (REST API)
           |
+----------v-----------+
|   Express Backend    |
|    (Node.js API)     |
+----------+-----------+
           |
           | SQL Queries
           |
+----------v-----------+
|    SQLite Database   |
+----------------------+
```

---

## Project Structure

```text
internship-tracker/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── database/
│   └── package.json
│
├── docs/
│
└── README.md
```

---

## Data Flow

1. The user performs an action in the React application.
2. The frontend sends an HTTP request to the Express backend.
3. The backend validates and processes the request.
4. The backend interacts with the SQLite database.
5. The database returns the requested data.
6. The backend sends a JSON response to the frontend.
7. The frontend updates the user interface.

---

## Design Principles

- Separation of concerns
- Modular architecture
- Reusable components
- RESTful API design
- Maintainable and scalable code