# Meditrack Day 1 - Baseline and Target Architecture

## Baseline (Current State in This Repository)
 
This repository is currently an orchestration shell: 

- Root-level `docker-compose.yml` coordinates multiple services.
- `k8s-manifests/` defines AKS deployment resources.
- GitHub Actions workflows build/push images and deploy manifests.
- Service code (`auth-service`, `medication-service`, `reminder-service`, `caretaker-service`, `middleware`, `frontend`) is referenced as submodules in `.gitmodules`, but those directories are not present in this repo snapshot.
   
### Immediate Risks

1. Limited local testability because business logic is not versioned in this repository.
2. Inconsistent naming (`partner-service` vs `caretaker-service`) across docs/manifests can cause deployment and ownership confusion.
3. Runtime configuration is spread across Compose, K8s manifests, and CI workflows without a single source of truth.
4. No explicit reliability patterns (timeouts/retries/circuit breaker) visible at gateway/service boundaries.
5. No explicit audit/event model yet for fintech-style payment and compliance workflows.

## Target (Fintech-Style Evolution)

### Domain-Oriented Service Boundaries

- `identity-service` (AuthN/AuthZ, session, RBAC)
- `patient-profile-service` (patient demographics, preferences)
- `medication-service` (catalog, dosage schedules, adherence records)
- `prescription-service` (prescription lifecycle, refill eligibility)
- `payment-service` (payment intents, transactions, idempotency keys)
- `notification-service` (email/SMS/push, templates, retries)
- `audit-compliance-service` (immutable audit log, retention policies)
- `api-gateway` (rate limiting, auth propagation, routing, request shaping)

### Data Ownership

Each service owns its database schema and write path. Cross-service updates are handled by events.

### Integration Style

- Synchronous path: external clients -> API gateway -> domain service
- Asynchronous path: domain events over message bus (Kafka or managed queue)
- Reliability pattern: outbox + idempotent consumers for at-least-once delivery

### Observability and Security Baseline

- Structured logs with correlation ID per request
- RED metrics (rate, errors, duration) per service
- Traces across gateway and downstream services
- JWT with short expiration + refresh flow
- Secrets via Kubernetes Secrets/managed secret store
- Audit trail for sensitive operations (prescription changes, payment actions, role changes)

## Day 1 Refactoring Scope (Safe and Small)

1. Document canonical service contracts and naming.
2. Add architecture records (this doc) to establish common language and decision history.
3. Prepare extraction plan without changing runtime behavior yet.

## Decision Record (Day 1)

- Decision: use evolutionary migration from current service shell to bounded-context microservices.
- Why: avoids risky rewrite while creating a senior-level path for scale, reliability, and compliance.
- Consequence: temporary complexity during migration (dual contracts and compatibility concerns).
