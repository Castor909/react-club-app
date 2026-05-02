# React Club App - Phase 3

This is my Phase 3 submission for the React application assignment.

The app implements all six user stories with complete CRUD workflows:

1. **Book a class** (POST) – Browse classes, verify DNI, book with confirmation
2. **Report an issue** (POST) – Staff report facility issues with form validation
3. **Browse coaches** (GET) – View list and detail pages with error/retry handling
4. **Browse venues** (GET) – View list and detail pages with error/retry handling
5. **Update a coach profile** (PATCH) – Inline edit form on detail page with validation
6. **Delete a venue** (DELETE) – Venue-level confirmation flow with redirect back to the list

All write operations include loading states, success/error feedback, and client-side validation.

## Tech

- React + Vite
- react-router-dom
- CSS

## What is implemented

- Routing between pages
- API integration with fetch for read endpoints
- Loading states
- Error states with retry
- Controlled forms with validation
- Pending/disabled submit states for write flows
- Success and error feedback for write flows
- Component hierarchy map for the final assignment

## API endpoints used

- GET `/api/v1/people/coaches`
- GET `/api/v1/people/coaches/{public_id}`
- PATCH `/api/v1/people/coaches/{public_id}` – Update coach profile
- DELETE `/api/v1/people/coaches/{public_id}` – Remove a coach
- GET `/api/v1/inventory/venues`
- GET `/api/v1/inventory/venues/{public_id}`
- PATCH `/api/v1/inventory/venues/{public_id}` – Update venue details
- DELETE `/api/v1/inventory/venues/{public_id}` – Remove a venue

## Optional mutation endpoints

The home flows (book + issue) can POST to configurable endpoints when the backend is ready:

- `VITE_PHASE3_BOOKING_PATH` (default: `/classes/bookings`) – POST booking request
- `VITE_PHASE3_ISSUE_PATH` (default: `/issues`) – POST issue report
- `VITE_PHASE3_USE_MOCK_MUTATIONS` (default: `true`) – Fall back to local mock if backend unavailable

## HTTP Verb Coverage

- **GET**: Stories 3 (Browse coaches) and 4 (Browse venues)
- **POST**: Stories 1 (Book class) and 2 (Report issue)
- **PATCH**: Story 5 (Update coach profile)
- **DELETE**: Story 6 (Delete venue)

## Run

Install dependencies:

```bash
npm install
```

Set API URL in environment file (example):

```bash
VITE_API_BASE_URL=http://localhost:8001/api/v1
```

Optional mutation settings:

```bash
VITE_PHASE3_BOOKING_PATH=/classes/bookings
VITE_PHASE3_ISSUE_PATH=/issues
VITE_PHASE3_USE_MOCK_MUTATIONS=true
```

Start app:

```bash
npm run dev
```

## Scripts

- npm run dev
- npm run lint
- npm run build

## Docker

Build and run the frontend container from the `docker/` folder:

```bash
docker compose -f docker/docker-compose.yml build
docker compose -f docker/docker-compose.yml up
```

Open the app at `http://localhost:8080`.

The container uses a multi-stage build:

1. A Node.js build stage installs dependencies and runs `npm run build`.
2. An nginx:alpine stage serves the generated static files.
3. The nginx config falls back to `index.html` so React Router routes keep working.

## Verification

1. Open `/coaches` and `/venues` from the top navigation.
2. Open one item in each list and confirm detail routes work.
3. Confirm loading text appears while waiting for API data.
4. Stop the API and confirm error plus retry behavior.
5. Open a coach detail page and verify the edit form matches the backend fields and saves successfully.
6. Open a venue detail page and verify edit and delete actions work with confirmation and redirect.
7. Open the home page and verify the booking and issue-report modals show loading, validation, and success states.
8. Run lint and build checks before submission.

## Routes

- /
- /coaches
- /coaches/:publicId
- /venues
- /venues/:publicId

## Rubric coverage

- User stories and mock-ups: six stories documented for Phase 3.
- Updated component map: route and component hierarchy documented in `chm.md`.
- Forms and state management: controlled booking and issue forms.
- API integration (fetch): list + detail GET endpoints for coaches and venues.
- API mutations: home write flows attempt POST with fallback behavior, and detail pages use PATCH/DELETE against the real backend.
- Asynchronous UI states: loading and error with retry.
- UI feedback and error handling: loading, success, disabled submit, and validation states.
- Routing: multiple views with list and detail navigation.
- Component expansion: new reusable components added for the new stories.
- Code quality and best practices: smaller components, semantic structure, and shared fetch logic.

## Scope note

- Stories 1 and 2 remain local-first flows with optional API POSTs.
- Stories 3 and 4 are read flows backed by the API, with additional mutation actions on the detail pages.
- Stories 5 and 6 are aligned to the real `sportsclub` backend: coach PATCH and venue PATCH/DELETE.

## Notes

- The app is still compatible with the read-only backend used in Phase 2.
- The final deliverables also include `assignment_phase_3.md`, `chm.md`, and the Phase 3 user-story planning file under `user-stories/`.
