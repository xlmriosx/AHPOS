# Examples — List

| Field               | Value                                         |
|---------------------|-----------------------------------------------|
| **Endpoint**        | `GET /api/examples`                           |
| **Implementation**  | `src/routes/examples.ts`                      |
| **Consumed by**     | `ExampleList` component                       |
| **Status**          | Active                                        |
| **Last updated**    | 2026-07-05                                    |

## Purpose

Returns a paginated list of example resources.

## Request

- **Method:** GET
- **Path params:** none
- **Query params:**
  - `page` (int, default `1`) — page number
  - `limit` (int, default `20`, max `100`) — items per page
  - `search` (string, optional) — text filter
- **Headers:** `Authorization: Bearer <token>`
- **Body:** none

## Responses

### 200 OK

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example One",
      "status": "active",
      "created_at": "2026-07-05T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "total_pages": 3
  }
}
```

| Field               | Type     | Description                        |
|---------------------|----------|------------------------------------|
| `data`              | array    | List of example objects            |
| `data[].id`         | UUID     | Unique identifier                  |
| `data[].name`       | string   | Display name                       |
| `data[].status`     | string   | One of: `active`, `archived`       |
| `data[].created_at` | ISO 8601 | Creation timestamp                 |
| `pagination.page`   | int      | Current page                       |
| `pagination.limit`  | int      | Items per page                     |
| `pagination.total`  | int      | Total matching items               |
| `pagination.total_pages` | int | Total pages                        |

### 401 Unauthorized

```json
{
  "error": "unauthorized",
  "detail": "Invalid or expired token"
}
```

### 500 Internal Server Error

```json
{
  "error": "internal_error",
  "detail": "An unexpected error occurred"
}
```

## Notes for the frontend

- The `search` param performs a case-insensitive partial match on `name`.
- Maximum `limit` is capped at 100 server-side; values above are silently
  reduced.
- Empty results return `200` with an empty `data` array, not `404`.

## Pending / out of scope

- Sorting is not yet supported.
- Filtering by `status` is planned for a future release.
