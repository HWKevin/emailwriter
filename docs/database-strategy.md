# ZenryPro Database Strategy

## Phase 1: Shared Supabase, Isolated Product Schemas

Use one Supabase Postgres database for the ZenryPro tool matrix, with each product writing to its own PostgreSQL schema:

- `promptgenius`
- `coverletter`
- `emailwriter`

This project is configured to use the `emailwriter` schema through Prisma multi-schema support. Its tables are:

- `emailwriter.users`
- `emailwriter.usage_logs`
- `emailwriter.settings`

Before the first `prisma db push`, create the schema in Supabase SQL editor:

```sql
CREATE SCHEMA IF NOT EXISTS emailwriter;
```

The same pattern can be applied to other tools with their own schema names.

## Phase 2: Shared Account Layer

After the three product schemas are stable, move identity into a shared account schema:

- `zenrypro.users`
- `zenrypro.accounts`
- `zenrypro.sessions`
- `zenrypro.verification_tokens`

Each product should then reference the shared user id from its own product tables instead of owning a separate user table.

## Phase 3: Unified Quota, Subscription, and History

Add shared commercial tables for the whole tool matrix:

- `zenrypro.subscriptions`
- `zenrypro.tool_entitlements`
- `zenrypro.tool_usage_quotas`
- `zenrypro.billing_events`

Keep generated content and product-specific history in each product schema, but use shared user, quota, and billing records to control access across ZenryPro.
