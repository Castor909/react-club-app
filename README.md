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

## Manual Verification

Use this checklist to verify the app manually before submission. Each step should end in a visible success state, a clear error state, or the expected navigation.

### Setup

1. Start the frontend with `npm run dev`.
2. Make sure the API URL is configured in `.env` or environment variables.
3. Open the app in the browser and confirm the header navigation is visible.

### Read flows

1. Open `/coaches` and confirm the coach list loads.
2. Open a coach detail page and confirm the profile data loads.
3. Open `/venues` and confirm the venue list loads.
4. Open a venue detail page and confirm the venue data loads.
5. Stop the backend API and confirm the list/detail pages show a friendly error message plus retry action.

### Story 5: Update a coach profile

1. Open a coach detail page.
2. Click `Edit Profile`.
3. Confirm the form fields match the backend coach schema: first name, last name, email, phone, date of birth, address public ID, and certification.
4. Change one or more fields.
5. Submit the form.
6. Confirm the submit button is disabled while saving.
7. Confirm a success banner appears after the update.
8. Confirm the detail view shows the updated values.

### Story 6: Delete a venue

1. Open a venue detail page.
2. Click `Delete Venue`.
3. Confirm the browser confirmation dialog appears.
4. Accept the deletion.
5. Confirm the delete button is disabled while the request is in progress.
6. Confirm the app redirects back to `/venues` after success.
7. If the backend rejects the request, confirm a friendly error message is displayed.

### Story 1: Book a class

1. Open the home page.
2. Start a booking flow from a class card.
3. Enter a valid DNI.
4. Confirm the submit button is disabled while the request is processing.
5. Confirm the success confirmation appears after booking.

### Story 2: Report an issue

1. Open the home page.
2. Start the issue report flow.
3. Verify the DNI modal appears before the form.
4. Fill in the issue form and submit it.
5. Confirm validation errors appear for missing or invalid fields.
6. Confirm the submit button is disabled while the request is processing.
7. Confirm the success confirmation appears after submission.

### Final checks

1. Run `npm run lint` and confirm there are no lint errors.
2. Run `npm run build` and confirm the production build succeeds.
3. Optionally run the Docker build in `docker/docker-compose.yml` and confirm the app serves from Nginx.

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
