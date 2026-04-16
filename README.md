# React Club App - Phase 2

React application built with Vite for the Athletics Sports Club assignment. This phase keeps the original booking and issue-report flows and adds read-only API views with routing, loading states, and error handling.

## Implemented user stories

1. Book a class (legacy phase 1 flow)
2. Report an issue (legacy phase 1 flow)
3. Browse coaches (API list and detail)
4. View venue information (API list and detail)

## Stack

- Vite
- React
- react-router-dom
- Plain CSS

## API requirements

Run the Sportsclub API backend locally (Docker Compose) and set the frontend base URL.

### Expected endpoints

- `/api/v1/people/coaches`
- `/api/v1/people/coaches/{public_id}`
- `/api/v1/inventory/venues`
- `/api/v1/inventory/venues/{public_id}`

## Frontend setup

1. Install dependencies:

```bash
npm install
```

2. Set API base URL (optional if using default `http://localhost:8000/api/v1`):

```bash
echo "VITE_API_BASE_URL=http://localhost:8000/api/v1" > .env.local
```

3. Start dev server:

```bash
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`

## Routes

- `/` -> MainLayout (phase 1 legacy)
- `/coaches` -> Coaches list
- `/coaches/:publicId` -> Coach detail
- `/venues` -> Venues list
- `/venues/:publicId` -> Venue detail

## Quick verification checklist

1. Open `/coaches` and `/venues` from navigation.
2. Open one item from each list to reach detail routes.
3. Confirm loading state appears while waiting for API.
4. Stop backend and confirm error state + retry button appear.
5. Run `npm run lint` and `npm run build`.
