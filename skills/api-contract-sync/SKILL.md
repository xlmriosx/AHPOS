---
name: api-contract-sync
description: >
  Keeps docs/contracts/ in sync with the backend API every time an endpoint is
  created, modified, or removed. Use this whenever a router, route handler,
  request/response schema, or status code changes, or when explicitly asked to
  update/generate/check API contract documentation.
license: MIT
---

# API Contract Sync

Keeps `docs/contracts/` as the human-readable source of truth between frontend
and backend about the shape of each endpoint. The code (routers / schemas /
controllers) is the *executable* source of truth; this directory is the
*readable* source of truth that frontend developers consult without having to
read backend code.

**Hard rule: no endpoint change is considered complete until the corresponding
contract has been created, updated, or deleted in the same changeset.**

---

## When this skill applies

- A new endpoint is added (new router/controller or new route within an
  existing one).
- The contract of an existing endpoint changes: path, method, parameters, body,
  query params, request/response schema, status codes, required headers, error
  behavior.
- An endpoint is removed or deprecated.
- The user explicitly asks to "update / generate / review the contracts" or
  "API documentation".

Does **not** apply to purely internal changes that do not alter what the
frontend sees on the wire (e.g. refactors of service layers or storage layers
that do not touch the schema or observable behavior).

---

## Procedure

### 1. Identify the affected contract file

Each endpoint has its own file in `docs/contracts/`, named
`<resource>-<action>.md` (e.g. `users-create.md`, `orders-list.md`).
If the file does not exist, this is a new endpoint — create the file.

### 2. New endpoint → create `docs/contracts/<name>.md`

Use this minimum structure:

```markdown
# <Resource> — <Action>

| Field               | Value                                         |
|---------------------|-----------------------------------------------|
| **Endpoint**        | `METHOD /path/:param`                         |
| **Implementation**  | `path/to/handler.ext`                         |
| **Consumed by**     | Frontend component / page / service           |
| **Status**          | Active · Deprecated                           |
| **Last updated**    | YYYY-MM-DD                                    |

## Purpose

One to three lines explaining what this endpoint does.

## Request

- **Method:** GET / POST / PUT / PATCH / DELETE
- **Path params:** `id` (UUID) — description
- **Query params:** `page` (int, default 1), `limit` (int, default 20)
- **Headers:** `Authorization: Bearer <token>`
- **Body / Schema:**

```json
{
  "field": "value",
  "nested": { "key": "value" }
}
```

- **Constraints:** max file size, accepted formats, length limits, etc.

## Responses

### 200 OK

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "field": "value"
}
```

| Field   | Type   | Description          |
|---------|--------|----------------------|
| `id`    | UUID   | Resource identifier  |
| `field` | string | Description of field |

### 400 Bad Request

```json
{
  "error": "validation_error",
  "detail": "field is required"
}
```

### 401 Unauthorized / 403 Forbidden / 404 Not Found / 500 Internal Server Error

(document each relevant status code)

## Notes for the frontend

Any non-obvious aspect of the schema that consumers need to know:
- Fields that are internal keys, not URLs
- Authentication requirements or lack thereof
- Absence of pagination
- Rate limiting
- etc.

## Pending / out of scope

What this version explicitly does not cover.
```

### 3. Endpoint modified → update the existing file

- Reflect the new request/response shape, status code, or behavior.
- Update the "Last updated" date (use the actual current date, do not invent).
- If the change breaks compatibility with the current frontend, say so
  explicitly in a note at the top of the file:
  `> ⚠️ **Breaking change:** description of what changed and how consumers must adapt.`

### 4. Endpoint removed → delete the contract file

Do not leave it "marked as deleted" indefinitely — git history already serves
that purpose.

### 5. Update the index

Add, edit, or remove the corresponding row in the endpoint table in
`docs/contracts/README.md`.

### 6. Verify consistency with the actual code

Before writing anything, read the router/controller and the schemas/types/DTOs
involved (do not assume from memory) so the contract describes the *actual*
behavior, not an aspirational one.

---

## Style

- Contracts are written in **English** (or match the project's documentation
  language).
- JSON examples should be **concrete and minimal** — use realistic sample values
  (`"id": "550e8400-e29b-41d4-a716-446655440000"`), not abstract placeholders
  (`"id": "<string>"`).
- Do not explain internal implementation details (that lives in the code or
  `ARCHITECTURE.md`); the contract describes only what is observable from
  outside the backend.

---

## Customization for your project

When adopting this skill, adjust the following to match your stack:

| Setting                 | Default                | Example overrides                     |
|-------------------------|------------------------|---------------------------------------|
| Contracts directory     | `docs/contracts/`      | `docs/api/`, `api-contracts/`         |
| File naming convention  | `<resource>-<action>`  | `<module>/<action>`, kebab-case, etc. |
| Index file              | `docs/contracts/README.md` | `docs/API_INDEX.md`              |
| Documentation language  | English                | Spanish, Portuguese, etc.             |
| Schema source           | Routers + type files   | FastAPI/Pydantic, Express/Zod, NestJS/DTO, Spring/OpenAPI, etc. |
| Auth header convention  | `Authorization: Bearer` | API keys, session cookies, etc.     |
