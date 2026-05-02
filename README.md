# Banking App

This repository contains a **runnable banking prototype** built as a clean, interview-style full-stack application:

- **Backend**: Spring Boot 3 REST API + JPA + H2 (development)
- **Frontend**: React 18 + Vite + Redux Toolkit (`createAsyncThunk`)

**Repository**: [theankitamahajan/banking-demo](https://github.com/theankitamahajan/banking-demo)

Architecture notes and evolution records are available in `docs/architecture/`.

## Repository Layout

```bash
.
├── banking-backend/          # Spring Boot 3 REST API + JPA
├── banking-frontend/         # React 18 + Vite + Redux Toolkit
├── docs/architecture/        # Architecture decision records
├── docker-compose.yml        # Legacy MediTrack stack
├── k8s-manifests/            # Legacy Kubernetes manifests
├── .gitmodules               # Legacy submodules
└── README.md
Prerequisites

Java 17+
Maven 3.9+
Node.js 18+ and npm

Run Locally
1. Backend (Spring Boot)
Bashcd banking-backend
mvn spring-boot:run

API Base URL: http://localhost:8080
H2 Console: http://localhost:8080/h2-console

Example Endpoints:

GET    /api/accounts
POST   /api/accounts
GET    /api/accounts/{id}
POST   /api/transfers
GET    /api/transactions/{accountId}

2. Frontend (React)
Bashcd banking-frontend
npm install
npm run dev -- --host localhost --port 5173
Open http://localhost:5173
The frontend calls the backend at http://localhost:8080/api. You can update the base URL in banking-frontend/src/api/client.js if needed.
CORS
The backend is configured to accept requests from the frontend (http://localhost:5173) in com.meditrack.banking.config.WebConfig.

Legacy Components (Optional)
This repository was previously used for a microservices project called MediTrack. The following are kept for historical reference only:

docker-compose.yml + Git submodules
k8s-manifests/

To run the old stack (if needed):
Bashgit submodule update --init --recursive
docker compose up --build
