# Database Schema

## Overview

The Internship Tracker uses a relational database to store internship applications and related information. The initial version of the application is designed for a single user managing their own internship search.

---

# Internship Table

| Column | Data Type | Description |
|----------|-----------|-------------|
| id | INTEGER | Primary key |
| company | TEXT | Company name |
| position | TEXT | Internship position |
| location | TEXT | Internship location |
| status | TEXT | Current application status |
| date_applied | DATE | Date the application was submitted |
| application_deadline | DATE | Application closing date |
| interview_date | DATE | Scheduled interview date (optional) |
| job_url | TEXT | Link to the original job posting |
| notes | TEXT | Personal notes |

---

# Primary Key

- id

Each internship record is uniquely identified by its id.

---

# Application Status

The status field can contain the following values:

- Saved
- Applied
- Online Assessment
- Interview Scheduled
- Offer Received
- Accepted
- Rejected

---

# Future Expansion

Future versions of the application may include:

- User accounts
- Multiple users
- Resume management
- Cover letter management
- Email reminders
- Calendar integration