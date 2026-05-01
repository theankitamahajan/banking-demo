#  Banking app

This repository has two overlapping purposes:
 **A runnable banking prototype** (`banking-backend/`, `banking-frontend/`) intended as an interview-style layered Spring Boot REST API paired with a React + Redux Toolkit (RTK Query-style thunks via `createAsyncThunk`) UI.


- [theankitamahajan/banking-demo](https://github.com/theankitamahajan/banking-demo) — snapshot focused on hosting the banking app (may omit GitHub Actions depending on repo setup).

Architecture notes for evolving toward production live under `docs/architecture/`.

## Repository layout

```
.
├── banking-backend/        # Spring Boot 3 REST API + JPA + H2 (dev DB)
├── banking-frontend/       # React 18 + Vite + Redux Toolkit + axios
├── docker-compose.yml      # Legacy MediTrack local topology (requires submodules)
├── k8s-manifests/          # Legacy AKS-style deployments
├── docs/architecture/      # Day-by-day architectural evolution docs
├── .gitmodules             # MediTrack submodule pointers (frontend/middleware/services/infra)
└── README.md               # You are here
```

## Legacy root Node artifacts (`package.json`, `commands.txt`)

The repo root still contains historic Maverics scaffold files (`package.json`, `package-lock.json`, `commands.txt`) that target an older Firebase experiment layout (for example referencing `backend/node/database_test.js` paths that may not exist in this tree).

These files are **not** part of the `banking-backend/` + `banking-frontend/` quickstart documented above. Prefer the banking folders for new work unless you intentionally revive the MediTrack submodule stack via `docker-compose.yml`.

## Prerequisites

- Java **17**
- Maven **3.9+**
- Node.js **18+** and npm

## Run locally (recommended path — banking prototype)

### 1) Backend (Spring Boot)

```bash
cd banking-backend
mvn spring-boot:run
```

- API base URL: `http://localhost:8080`
- H2 console: `http://localhost:8080/h2-console`

**Example endpoints:**

- `GET    /api/accounts`
- `POST   /api/accounts`
- `GET    /api/accounts/{id}`
- `POST   /api/transfers`
- `GET    /api/transactions/{accountId}`

### 2) Frontend (React + Redux)

```bash
cd banking-frontend
npm install
npm run dev -- --host localhost --port 5173
```

Open `http://localhost:5173/`.

The frontend calls the backend at `http://localhost:8080/api` (`banking-frontend/src/api/client.js`). If you proxy through another host/port, update `baseURL`.

## CORS

`banking-backend` allows browser calls from `http://localhost:5173` (`com.meditrack.banking.config.WebConfig`).

## Legacy MediTrack local stack (`docker-compose.yml`)

Microservice source folders are modeled as Git submodules in `.gitmodules` (paths like `microservices/auth-service`). To materialize those directories locally:

```bash
git submodule update --init --recursive
docker compose config
docker compose up --build
```

If submodules fail to populate (credentials / access), Compose paths like `./microservices/auth-service` will not build until those repos are reachable.

## Kubernetes manifests (`k8s-manifests/`)

These manifests reference Azure Container Registry image names (`mavericacrtest.azurecr.io/*`) and secrets (`app-secrets`). Treat them as **environment-specific examples**, not turnkey production configuration.

## What this banking prototype intentionally does NOT include yet

- Real authentication / authorization (`/api/**` is open in this sample)
- Postgres + migrations (H2 only)
- Exactly-once money movement semantics, idempotent transfers, reconciliation, strong audit/event sourcing
- Container images + CI/CD workflows (optional follow-up)

## License

Legacy README referenced MIT — confirm `LICENSE` in this repo before redistributing.
