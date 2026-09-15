# Avnez

Avnez is an AI teammate platform for businesses. The first specialized teammate will support real estate sales teams.

## Development

```bash
npm run dev
```

Open http://localhost:3000 in a browser.

## Authentication and database setup

Copy `.env.example` to `.env.local` and provide a PostgreSQL connection string and a long random `NEXTAUTH_SECRET`.

```bash
copy .env.example .env.local
npx prisma migrate dev --name init
```

The authentication routes are `/sign-in`, `/sign-up`, and the protected application area is `/app`.

## Structure

- `app/`: App Router pages, layouts, and global styles
- `components/`: Reusable UI components
- `lib/`: Shared utilities and application services
- `types/`: Shared TypeScript types
- `public/`: Static assets
