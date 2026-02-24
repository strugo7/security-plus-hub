# Vibe Coding – Secure & Scalable Development Guide

> A practical reference for building production-ready applications with AI-assisted coding.
> For each principle, a ready-to-use prompt is provided to paste directly into your vibe coding session.

---

## 🔐 PART 1 – Secure Code Principles

---

### 1. Never Trust AI-Generated Code Blindly

Always review generated code, especially around authentication, database queries, and file handling. LLMs can produce subtle security flaws.

**🤖 Prompt:**
```
Review the code you just generated and identify any potential security vulnerabilities.
Focus specifically on: authentication logic, database queries, file handling, and any
user-facing inputs. List each issue found and provide a fixed version.
```

---

### 2. Secrets Management

Never hardcode API keys, passwords, or tokens. Use environment variables from day one.

**🤖 Prompt:**
```
Refactor this code so that all sensitive values (API keys, database credentials, tokens,
passwords) are loaded from environment variables using a .env file. Add a .env.example
file with placeholder values, and make sure .env is listed in .gitignore. Use the dotenv
package where needed.
```

---

### 3. Input Validation & Sanitization

Every entry point — forms, API params, URL params — must be validated and sanitized.

**🤖 Prompt:**
```
Add comprehensive input validation and sanitization to all user-facing inputs in this code.
For each field, validate the type, length, and format. Sanitize inputs to prevent XSS and
SQL injection attacks. Use [zod / joi / express-validator] for validation. Return clear,
safe error messages without exposing internal details.
```

---

### 4. Principle of Least Privilege

Only request the minimum permissions needed — for database roles, API scopes, and IAM policies.

**🤖 Prompt:**
```
Review all permission levels, database roles, and API scopes used in this code. Apply the
principle of least privilege — remove any admin-level access that isn't strictly required,
and replace it with scoped, minimal permissions. Document what each permission is needed for.
```

---

### 5. Dependency Awareness

Packages pulled in by AI can be outdated, unmaintained, or malicious.

**🤖 Prompt:**
```
List all the external packages you used or suggested in this project. For each one, explain:
what it does, why it's needed, and whether there's a more lightweight or better-maintained
alternative. Flag any packages that are not widely adopted or have known vulnerabilities.
```

---

### 6. Prompt with a Security Mindset

The most powerful lever — be explicit about security requirements in every prompt.

**🤖 Prompt:**
```
Build a secure [feature name] that includes:
- Input validation and sanitization
- Protection against [SQL injection / XSS / CSRF] as relevant
- Proper error handling without leaking internal details
- Rate limiting on sensitive endpoints
- Secure defaults throughout
Follow OWASP Top 10 best practices.
```

---

### 7. Authentication & Authorization Separation

Authentication = who you are. Authorization = what you're allowed to do. Treat them independently.

**🤖 Prompt:**
```
Implement authentication and authorization as two separate layers in this application.
Authentication should use [JWT / session-based auth] with bcrypt password hashing.
Authorization should use role-based access control (RBAC) — define at least 3 roles and
enforce permission checks server-side on every protected route. Never rely on client-side
checks alone.
```

---

### 8. Error Handling Without Information Leakage

Show generic messages to users, log details on the server only.

**🤖 Prompt:**
```
Refactor all error handling in this codebase so that:
1. Users receive generic, safe error messages (no stack traces, no DB errors, no internal paths)
2. Full error details are logged server-side with a unique error ID
3. The client only receives the error ID and a user-friendly message
Use a centralized error handler middleware.
```

---

### 9. HTTPS & Secure Headers

Apply security headers and enforce HTTPS even in early-stage projects.

**🤖 Prompt:**
```
Add the following security headers to this Express/Node.js app using the helmet package:
Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security,
and Referrer-Policy. Also enforce HTTPS by redirecting all HTTP traffic. Configure CORS to
allow only trusted origins.
```

---

### 10. Shift-Left Security Reviews

Run a security review after every major feature, not just before deployment.

**🤖 Prompt:**
```
Act as a senior security engineer and perform a full security review of the following code.
Check for: OWASP Top 10 vulnerabilities, insecure dependencies, missing authentication/
authorization checks, improper error handling, hardcoded secrets, and any other security
risks. For each issue found, provide: severity level, description, and recommended fix.
```

---

## ⚡ PART 2 – Scalable Code Principles

---

### 1. Design Stateless Services

No session data stored in memory. Any instance should be able to handle any request.

**🤖 Prompt:**
```
Refactor this service to be completely stateless. Move all session and state data to an
external Redis store. Ensure that no in-memory state is shared between requests, so the
service can be horizontally scaled behind a load balancer without issues.
```

---

### 2. Database Optimization

Add indexes, avoid N+1 queries, and use connection pooling.

**🤖 Prompt:**
```
Optimize the database layer of this application for production scale:
1. Add indexes on all frequently queried columns
2. Identify and fix any N+1 query problems using eager loading or batching
3. Configure connection pooling with a max pool size appropriate for the expected load
4. Add query logging in development to detect slow queries
Use [Prisma / Sequelize / Mongoose / raw SQL] as applicable.
```

---

### 3. Async & Non-Blocking Code

All I/O operations must be asynchronous to prevent blocking the event loop.

**🤖 Prompt:**
```
Review this code and ensure that all I/O operations — database calls, file reads, external
API calls, and any other async work — are handled with proper async/await patterns.
Identify and fix any blocking operations that could bottleneck the event loop under load.
Add timeout handling for all external calls.
```

---

### 4. Rate Limiting & Throttling

Protect your API from traffic spikes, abuse, and DDoS attempts.

**🤖 Prompt:**
```
Add rate limiting to this API using express-rate-limit (or equivalent).
Apply the following rules:
- Global limit: [X] requests per minute per IP
- Stricter limit on auth endpoints: [Y] requests per 15 minutes
- Return a 429 status with a Retry-After header when the limit is exceeded
- Log all rate-limit violations for monitoring
```

---

### 5. Caching Strategy

Reduce database load by caching read-heavy, relatively static data.

**🤖 Prompt:**
```
Implement a Redis caching layer for the following endpoints/data: [list them].
For each cached resource:
- Set an appropriate TTL based on how frequently the data changes
- Add cache invalidation logic when the underlying data is updated
- Add a cache-miss fallback that fetches from the database and repopulates the cache
Use the cache-aside pattern.
```

---

### 6. Queue Heavy Tasks

Offload time-consuming tasks to a background job queue to keep the API responsive.

**🤖 Prompt:**
```
Refactor the following heavy operations to run as background jobs using BullMQ (or
RabbitMQ): [list operations e.g. email sending, image processing, report generation].
The API should immediately return a job ID and status endpoint. Implement:
- Job retry logic with exponential backoff
- Job failure handling and dead-letter queue
- A status endpoint to poll job progress
```

---

### 7. Horizontal Scalability Mindset

Build so you can run multiple instances behind a load balancer.

**🤖 Prompt:**
```
Containerize this application with Docker for horizontal scaling.
Create:
1. A production-ready Dockerfile with multi-stage build
2. A docker-compose.yml that runs the app, Redis, and database
3. A health check endpoint at /health that returns app status
4. Ensure the app reads all config from environment variables with no hardcoded values
The goal is to be able to spin up multiple app instances behind a load balancer.
```

---

### 8. Graceful Error Handling Under Load

Circuit breakers and retry logic to prevent cascading failures.

**🤖 Prompt:**
```
Add resilience patterns to all external service calls in this codebase:
1. Implement retry logic with exponential backoff and jitter (max 3 retries)
2. Add circuit breaker logic so that a failing external service doesn't cascade
3. Add timeout limits to all outbound HTTP calls
4. Ensure the application degrades gracefully — return partial data or a fallback
   response rather than crashing when a downstream service is unavailable
```

---

### 9. Monitor & Observe Early

You can't scale what you can't measure.

**🤖 Prompt:**
```
Add observability to this application:
1. Structured logging (JSON format) with request ID, timestamp, level, and context
   using [Winston / Pino]
2. A /metrics endpoint exposing Prometheus-compatible metrics: request count,
   response duration, error rate, and memory usage
3. Request tracing middleware that assigns a unique ID to every incoming request
   and attaches it to all logs within that request's lifecycle
```

---

### 10. Load Test Before You Need To

Discover your limits before real traffic does.

**🤖 Prompt:**
```
Write a k6 load test script for this API that simulates the following scenarios:
1. Steady load: 50 concurrent users for 2 minutes
2. Spike test: ramp from 10 to 500 users in 30 seconds
3. Stress test: gradually increase to find the breaking point

Test the following critical endpoints: [list endpoints].
Include checks for: response time < 500ms, error rate < 1%, and correct status codes.
Output a summary report with p95 and p99 latency metrics.
```

---

## 🧠 Master Prompt – Use at Project Kickoff

> Paste this at the very beginning of any new vibe coding session:

```
Before writing any code for this project, apply the following non-negotiable standards:

SECURITY:
- No hardcoded secrets — use environment variables only
- Validate and sanitize all user inputs
- Apply least privilege to all permissions and database roles
- Separate authentication and authorization layers
- Use secure HTTP headers (via helmet) and enforce HTTPS
- Handle errors without leaking internal details

SCALABILITY:
- All services must be stateless
- All I/O must be async/non-blocking
- Add database indexes and connection pooling
- Cache read-heavy endpoints with Redis
- Offload heavy tasks to a background queue
- Containerize with Docker and expose a /health endpoint

GENERAL:
- Write clean, modular code with separation of concerns
- Add JSDoc/TSDoc comments to all functions
- Structure the project for horizontal scaling from day one

Confirm you understand these requirements before proceeding.
```

---

*Last updated: February 2026 | Built for Vibe Coding Workflows*
