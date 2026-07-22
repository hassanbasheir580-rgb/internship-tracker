# API Design

## Overview

The Internship Tracker backend exposes a RESTful API that allows the frontend to create, retrieve, update, and delete internship applications.

All API responses are returned in JSON format.

Base URL:

```
/api
```

---

# Internship Endpoints

## Get All Applications

GET

```
/api/internships
```

Description:

Returns all internship applications.

---

## Get Single Application

GET

```
/api/internships/:id
```

Description:

Returns a single internship application by its ID.

---

## Create Application

POST

```
/api/internships
```

Description:

Creates a new internship application.

Request Body

```json
{
  "company": "Google",
  "position": "Software Engineering Intern",
  "location": "Kuala Lumpur",
  "status": "Applied",
  "date_applied": "2026-07-22",
  "application_deadline": "2026-08-10",
  "interview_date": null,
  "job_url": "https://careers.google.com",
  "notes": "Applied through careers page."
}
```

---

## Update Application

PUT

```
/api/internships/:id
```

Description:

Updates an existing internship application.

---

## Delete Application

DELETE

```
/api/internships/:id
```

Description:

Deletes an internship application.

---

# Response Format

Successful responses

```json
{
  "success": true,
  "data": {}
}
```

Error responses

```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Future Endpoints

Future versions of the application may include:

- Authentication
- User management
- Resume upload
- File attachments
- Notifications
- Dashboard analytics