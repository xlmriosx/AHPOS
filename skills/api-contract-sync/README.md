# API Contract Sync — README

## What is this?

A reusable agent skill that enforces keeping human-readable API contract
documentation in sync with your actual backend code. It works with **any**
backend framework (FastAPI, Express, NestJS, Spring Boot, Django, Rails, etc.)
and any frontend consumer.

## Quick start

1. Copy this `api-contract-sync/` folder into your project's skills directory
   (e.g. `.agents/skills/api-contract-sync/`).
2. Create `docs/contracts/` in your project root (or customize the path in
   `SKILL.md`).
3. Create `docs/contracts/README.md` as the endpoint index.
4. The skill will be triggered automatically when endpoints change.

## Directory structure

```
your-project/
├── docs/
│   └── contracts/
│       ├── README.md          ← Index of all endpoints
│       ├── users-create.md    ← POST /api/users
│       ├── users-list.md      ← GET /api/users
│       ├── users-get.md       ← GET /api/users/:id
│       └── orders-create.md   ← POST /api/orders
└── .agents/
    └── skills/
        └── api-contract-sync/
            ├── SKILL.md
            └── README.md
```

## Customization

Edit the "Customization for your project" table at the bottom of `SKILL.md` to
match your project's conventions.

## License

MIT
