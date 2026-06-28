# Banking App
 
A clean, interview-quality full-stack banking prototype demonstrating modern development practices.

**Repository:** [theankitamahajan/banking-demo](https://github.com/theankitamahajan/banking-demo)

## Tech Stack
    
- **Backend:** Spring Boot 3 REST API + JPA + H2 (development database)
- **Frontend:** React 18 + Vite + Redux Toolkit (`createAsyncThunk`)
- **Architecture Notes:** See `docs/architecture/` for design decisions

## Repository Layout

```
.
├── banking-backend/          # Spring Boot 3 REST API + JPA
├── banking-frontend/         # React 18 + Vite + Redux Toolkit
├── docs/architecture/        # Architecture decision records
└── README.md
```

## Prerequisites

- Java 17 or higher
- Maven 3.9 or higher
- Node.js 18+ with npm

## Running Locally

### Backend (Spring Boot)

```bash
cd banking-backend
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

**Useful endpoints:**
- API documentation: http://localhost:8080/api
- H2 Console (dev database): http://localhost:8080/h2-console

**Available API endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/accounts` | List all accounts |
| POST   | `/api/accounts` | Create a new account |
| GET    | `/api/accounts/{id}` | Get account details |
| POST   | `/api/transfers` | Initiate a transfer |
| GET    | `/api/transactions/{accountId}` | Get transaction history |

### Frontend (React)

```bash
cd banking-frontend
npm install
npm run dev -- --host localhost --port 5173
```

Open **http://localhost:5173** in your browser.

The frontend is configured to call the backend at `http://localhost:8080/api`. To change this, update the base URL in `banking-frontend/src/api/client.js`.

## CORS Configuration

Cross-Origin Resource Sharing is configured in the Spring Boot backend to accept requests from the frontend at `http://localhost:5173`. This is set in the backend's web configuration.

If you're running the frontend on a different port, update the CORS configuration in the backend accordingly.

## Project Structure

### Backend (`banking-backend/`)

- **Controllers:** REST endpoints for account and transaction management
- **Services:** Business logic for banking operations
- **Repositories:** JPA data access layer
- **Models:** Domain entities (Account, Transaction, Transfer, etc.)
- **Config:** Application configuration (CORS, security, etc.)

### Frontend (`banking-frontend/`)

- **Pages:** React components for major views
- **Components:** Reusable UI components
- **Store:** Redux Toolkit state management
- **api/:** HTTP client and API integration
- **styles/:** Component and global styling

## Development Workflow

1. Start the backend first (it needs to be running for the frontend to work)
2. Start the frontend and open http://localhost:5173
3. Use the H2 Console at http://localhost:8080/h2-console for direct database inspection (optional)

