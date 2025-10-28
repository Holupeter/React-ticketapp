<<<<<<< HEAD
# 🎟️ Multi-Framework Ticket Management Web App (React Version)

This repository contains the **React implementation** of the *Multi-Framework Ticket Management Web Application* — a full-featured front-end project designed to test and showcase cross-framework architecture, UI consistency, and component logic across **React**, **Vue**, and **Twig**.

---

## 📖 Overview

This application provides a **complete ticket management system** with:

- A welcoming **Landing Page** featuring SVG wave backgrounds and decorative elements.
- A **Secure Authentication** flow (Signup & Login) with validation, password strength rules, and password visibility toggles.
- A **Protected Dashboard** with ticket analytics and navigation to ticket operations.
- A full **CRUD Ticket Management Page** with filtering, validation, feedback, and hover states.
- **Per-User Data Isolation** — every user’s tickets are stored separately in `localStorage`.
- A fully **responsive layout** with identical design patterns across all frameworks.

---

## 🌍 Framework Switchboard

| Framework | Repository | README |
|------------|-------------|--------|
| 🟦 **React** | [This repo](#) | [React README (you’re here)](#) |
| 🟩 **Vue.js** | *(Coming soon)* | [Vue README →](#) |
| 🟫 **Twig** | *(Coming soon)* | [Twig README →](#) |

> Each framework re-implements the same layout, logic, and validation structure using its native architecture.

---

## 🧠 Core Features

### 1️⃣ Landing Page
- Responsive layout with **wavy SVG background** and decorative circles.
- Clear **Call-to-Action** buttons: “Login” and “Get Started”.
- Shared **Hero component** reused across all pages for consistent look and feel.
- Max container width: **1440px** centered on all devices.

### 2️⃣ Authentication System
- **Signup**
  - Valid email format only.
  - Strong password (min. 8 chars, includes letter, number, symbol).
  - Inline validation with descriptive error messages.
  - On successful signup → redirect to Login.

- **Login**
  - Accepts only existing, valid users (checked in `localStorage`).
  - Inline error handling.
  - If a user hasn’t signed up → modal pop-up prompting “Click Get Started to sign up.”
  - Includes **Show/Hide password** eye icon toggle.

- **Session Handling**
  - Session stored under `localStorage["ticketapp_session"]`.
  - Unauthorized users redirected to `/auth/login`.
  - Logout clears session and returns to landing.

### 3️⃣ Dashboard
- Displays **Total**, **Open**, and **Resolved** tickets.
- Clickable cards navigate to filtered tickets view.
- “Create Ticket” button takes user to the ticket form directly.
- Personalized **Welcome message**: `Welcome, user@example.com`
- Compact hero header reused from the Landing page.

### 4️⃣ Ticket Management (CRUD)
- **Create, View, Edit, Delete** tickets.
- **Validation Rules:**
  - `title` and `status` are required.
  - `status` limited to `"open"`, `"in_progress"`, `"closed"`.
  - Optional fields validated for type/length.
- **Feedback:**
  - Inline error messages and toast/snackbar notifications.
  - Confirmations for delete actions.
- **Filtering:**
  - Tickets filtered by status via `/tickets?filter=open|closed|all`.
  - Dashboard filter links automatically pass query parameters.

### 5️⃣ Data Isolation (Per User)
- Each user’s tickets are stored under a unique key:
- ticketapp_tickets_<sanitizedEmail>
Example: ticketapp_tickets_john_doe_gmail_com

- Ensures users cannot access or see each other’s tickets.

### 6️⃣ Error Handling
- Invalid form inputs → inline or toast message.
- Unauthorized route → redirect to login.
- Failed operation → “Please retry” toast.
- Clear and human-friendly messages:
- “Your session has expired — please log in again.”
- “Failed to load tickets. Please retry.”

### 7️⃣ Design & Accessibility
- Consistent visual design across all pages.
- Hover effects for interactive elements.
- Semantic HTML, visible focus states, and color-contrast compliance.
- Responsive layout for **mobile**, **tablet**, and **desktop**.

---

## 🏗️ Project Structure
src/
├─ assets/ # Shared SVGs, images, backgrounds
├─ components/ # Reusable UI components (Hero, Navbar, Footer, Modal, etc.)
├─ pages/ # Core screens: Landing, Login, Signup, Dashboard, Tickets
├─ services/ # Auth, storage, and utility logic
├─ utils/ # Validation helpers
├─ styles.css # Global styling, layout, animations, etc.
└─ App.jsx # Router + layout wrapper


---

## ⚙️ Setup & Installation

1️⃣ Clone the repo:
```bash
git clone https://github.com/<your-username>/ticketapp-react.git
cd ticketapp-react

2️⃣ Install dependencies:

npm install

3️⃣ Run locally:

npm start

4️⃣ Build for production:

npm run build

5️⃣ Lint & format (optional):

npm run lint

The app runs on http://localhost:3000 by default.

🪄 Technical Highlights

React Router v6 for routing and protected routes.

Lucide React icons for password toggle (eye/eye-off).

LocalStorage for persistent mock backend.

Toast & Modal components for non-blocking feedback.

Functional Components + Hooks (useState, useEffect, useMemo).

Adaptive grid system for cards and ticket lists.

🔐 LocalStorage Keys Summary
Key	Purpose
ticketapp_session	Stores current user session {token, email}
ticketapp_users	Stores all registered users [ { email, password } ]
ticketapp_tickets_<sanitizedEmail>	Stores all tickets for each individual user
👥 Example Test Users
Email	Password
demo@example.com
	Demo@123
admin@example.com
	Admin@2024

Passwords must include a letter, number, and symbol (minimum 8 characters).

🧩 Environment & Tools

Node.js v18+

npm v9+

React 18.x

lucide-react for icons

Vite / CRA build (depending on your setup)

🧪 Testing Scenarios

✅ Email validation — rejects invalid formats
✅ Password rule — rejects weak passwords
✅ Unauthorized route — redirects to /auth/login
✅ Per-user data — tickets not shared between accounts
✅ CRUD validation — title/status required
✅ Modal — shown for unregistered emails during login
✅ Eye icon toggle — show/hide password in Login & Signup




=======
# ticketapp-react
>>>>>>> 2626490ae5ab0b2129206b5feb431d3b22dc74bc
