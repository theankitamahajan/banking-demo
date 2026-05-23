# Day 1 Implementation Tasks

## Goal

Create a stable foundation before deep service extraction.

## Step-by-Step Tasks 

1. Standardize service naming:
   - Pick one canonical name: `caretaker-service` or `partner-service`.
   - Apply consistently across docs, manifests, and CI.
2. Introduce API contract stubs:
   - Add OpenAPI specs for `auth`, `medication`, `reminder`, and `caretaker`.
   - Include request/response examples and error model.    
3. Define cross-cutting headers:
   - `X-Request-Id`, `X-Idempotency-Key`, `X-User-Id`.
   - Add pass-through requirements at gateway/middleware.
4. Add reliability policy at gateway:
   - default timeout budget per upstream service.
   - retry policy for safe idempotent operations only.
5. Add audit event envelope schema:
   - actor, action, entityType, entityId, timestamp, traceId, metadata.

## Verification Checklist

- `docker compose config` validates compose syntax.
- `kubectl apply --dry-run=client -f k8s-manifests/` validates manifest syntax.
- Workflows still parse via `act` or GitHub UI checks.
- No runtime behavior change in Day 1 tasks; only architecture hardening and consistency.

## Suggested Commands

```bash
docker compose config
kubectl apply --dry-run=client -f k8s-manifests/
git status
```

## Professional Commit Messages

- `docs(architecture): add day-1 baseline assessment and target architecture`
- `docs(architecture): define day-1 implementation checklist for service hardening`
