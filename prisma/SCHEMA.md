# Database Schema

## User
- `id` — unique identifier (cuid)
- `email` — unique, used for login
- `passwordHash` — bcrypt hash (nullable for OAuth users)
- `name`, `avatarUrl` — from OAuth or registration
- `isAdmin` — set via ADMIN_EMAILS env var
- `dailyQuota` — default 10
- `usedToday` — resets when `resetDate` passes
- `resetDate` — sliding window, set to now+24h on reset

## UsageLog
- `userId` — FK to User (cascade delete)
- `prompt` — truncated generation prompt
- `emailGoal`, `recipient` — email context
- `modelUsed` — AI model name
- Indexed on `[userId, createdAt DESC]`

## Setting
- Key-value store for runtime config
