# React Club App - Phase 2

This is my Phase 2 submission for the React application assignment.

The app keeps the two stories from Phase 1 and adds two new API-based stories:

1. Browse coaches (list + detail)
2. View venues (list + detail)

## Tech

- React + Vite
- react-router-dom
- CSS

## What is implemented

- Routing between pages
- API integration with fetch (GET only)
- Loading states
- Error states with retry
- At least 3 new functional components for the new stories

## API endpoints used

- /api/v1/people/coaches
- /api/v1/people/coaches/{public_id}
- /api/v1/inventory/venues
- /api/v1/inventory/venues/{public_id}

## Run

Install dependencies:

```bash
npm install
```

Set API URL in environment file (example):

```bash
VITE_API_BASE_URL=http://localhost:8001/api/v1
```

Start app:

```bash
npm run dev
```

## Scripts

- npm run dev
- npm run lint
- npm run build

## Routes

- /
- /coaches
- /coaches/:publicId
- /venues
- /venues/:publicId

## How to verify (for grading)

1. Open /coaches and /venues from the top navigation.
2. Open one item in each list and confirm detail routes work.
3. Confirm loading text appears while waiting for API data.
4. Stop the API and confirm error + retry behavior.
5. Run lint/build checks before submission.

## Rubric coverage

- API integration (fetch): list + detail GET endpoints for coaches and venues.
- Asynchronous UI states: loading and error with retry.
- Routing: multiple views with list and detail navigation.
- Component expansion: new reusable components added for the new stories.

## Scope note

- Stories 3 and 4 are fully API-based in Phase 2.
- Stories 1 and 2 are kept from Phase 1 flow.
- Write operations are explicitly deferred to Phase 3.

## Notes

- Phase 2 is focused on read operations, so new API stories are GET-only.
- Write operations (create/update/delete) are planned for the next phase.
