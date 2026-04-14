# React Club App

Small demo application (Vite + React) implementing two user stories: "Book a Class" and "Report an Issue". The app uses local JSON mock data and mobile-first fullscreen modal flows for booking and reporting.

## Features
- Book a class with DNI validation (mocked).
- Report an issue: DNI verification → issue form → confirmation.
- All data stored in local JSON files under `src/data/`.

## Tech stack
- Vite
- React (functional components + hooks)
- Plain CSS (variables) — see `src/styles.css`

## Quick start
1. Install dependencies:

   `npm install`

2. Start development server:

   `npm run dev`

Open the app in your browser (Vite will show the URL). Test flows on a mobile-sized viewport for the fullscreen modal experience.

## How to test the user flows
- Booking: click a class' **Book** button → enter a valid DNI → confirm booking.
- Reporting: click **Report an Issue** → enter a valid DNI → fill the issue form → submit.

Sample valid DNIs (from `src/data/validDnis.json`): `A1234567B`, `B7654321C`.

## Important files
- Main layout and flows: [src/components/MainLayout.jsx](src/components/MainLayout.jsx#L1)
- Modal component: [src/components/Modal.jsx](src/components/Modal.jsx#L1)
- DNI form: [src/components/DniForm.jsx](src/components/DniForm.jsx#L1)
- Issue form: [src/components/IssueForm.jsx](src/components/IssueForm.jsx#L1)
- Styles: [src/styles.css](src/styles.css#L1)
- Mock data: [src/data/classes.json](src/data/classes.json#L1), [src/data/validDnis.json](src/data/validDnis.json#L1), [src/data/issues.json](src/data/issues.json#L1)

## Notes & limitations
- This is a static demo — no backend or persistent storage. All changes are in-memory.
- Mock data is edited directly in `src/data/` for testing.

## Deliverables checklist
- Source code — this repo
- Stylebook: `STYLEBOOK.md`
- Component map and screenshots — to be generated and added to `/artifacts` (not yet included)
- ZIP package (exclude `node_modules`) — to be created on finalization

## Suggested commit messages
- `feat: add modal booking and report flows`
- `style: polish modal styles and form layout`
- `docs: add README and usage instructions`

---
If you want, I can now generate the component map (Mermaid) and produce the screenshots for the flows.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
