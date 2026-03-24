# 🏠 TechKraft - Real Estate Listing Platform

A high-performance, premium real estate listing application built for property brokers. Features include advanced searching, filtering, and role-aware admin functionality.

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) (optional, for containerized execution)

### Installation
```bash
# Clone the repository
# git clone <repo_url>
# cd TechKraft_Frontend

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the development server
npm run dev
```
The application will be available at `http://localhost:5173`.

### Port Availability
- **Frontend:** `5173`
- **Expected API Backend:** `3000` (configurable in `src/lib/axios.ts`)

---

## 🏗 Architecture & Tech Stack

This project follows a modular architecture and clean separation of concerns.

- **Stack:** React 19 + TypeScript + Vite
- **Routing:** [TanStack Router](https://tanstack.com/router) (File-based, Type-safe searching)
- **State/API:** [TanStack Query](https://tanstack.com/query) (Caching & Invalidation)
- **Styling:** Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com/)
- **Validation:** Zod (Search params & schemas)
- **Testing:** Vitest + React Testing Library

### Project Structure
```text
src/
├── core/
│   ├── Auth/             # Authentication & Login logic
│   └── Property/         # Property listings, details, and search
│       ├── components/   # UI components
│       ├── schema/       # Type-safe interfaces
│       └── service/      # API queries and hooks
├── lib/                  # Shared utilities (Axios, Auth store)
├── routes/               # Type-safe file-based routing
└── components/ui/        # Reusable primitive UI components
```

---

## ✅ Assessment Requirement Checklist

- **[x] Property Search Page with Filters (1.b.i):** Dynamic filtering by price, beds, baths, and property type.
- **[x] Results List & Detail Page (1.b.ii):** Responsive grid of listings with single-property detail views.
- **[x] Role-aware behavior (3.b):** Exclusive metadata (Sq Feet, Year Built) visible only to **Admin** users.
- **[x] Pagination (4.a):** Scalable offset-based pagination synced with URL state.
- **[x] URL-friendly search (4.b):** Zod-validated query parameters for shareable search results (e.g., `?minPrice=500000&beds=3`).
- **[x] Unit Testing (5.a):** Comprehensive tests for core components using Vitest.
- **[x] Docker support:** Multi-stage Dockerized deployment scripts included.

---

## 🧪 Testing

The project uses **Vitest** for unit and integration testing.

```bash
# Run all tests
npm run test

# Run tests in UI mode
# npx vitest --ui
```

---

## 🛡 Authentication & Admin Role

To test admin-only features, use the **Admin Login** page. The application uses a simple ID-based flag to simulate administrative roles.

- **Admin Logic:** If a user ID is present in the `auth` state, the user is considered an admin (`src/lib/auth.ts`).
- **Endpoint:** `/login`

---

## 🐳 Docker Deployment

The project includes a ready-to-use Docker environment.

```bash
# Build & run using Docker
docker build -t techkraft-frontend .
docker run -p 5173:5173 techkraft-frontend
```
