# Office of the CEO

A responsive, dark-mode enterprise intranet prototype built with React, TypeScript, Vite, Tailwind CSS, Lucide React, React Router, FastAPI, and SQLite.

The experience is designed for the full workforce. It brings together company vision, strategy, roadmaps, policies, updates, events, major projects, leadership information, and employee questions in one navigable interface.

## Run locally

Prerequisites:

- Node.js 18.18 or newer
- npm 9 or newer
- Python 3.11 or newer

Install dependencies and start the local web and API development servers:

```bash
npm install
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
npm run dev
```

Vite serves the site at `http://localhost:5173` and proxies `/api` requests to FastAPI at `http://localhost:8000`. FastAPI creates and seeds the embedded SQLite database at `backend/data/policies.db` the first time it starts.

The API follows an OpenAPI-first contract generated from typed FastAPI models:

- API documentation: `http://localhost:8000/docs`
- OpenAPI 3 schema: `http://localhost:8000/openapi.json`
- Policy endpoint: `http://localhost:8000/api/policies`

Use `npm run dev:web` or `npm run dev:api` to run either service independently.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
.venv/bin/python -m compileall backend
```

The production build is written to `dist/`.

## Content replacement

Most sample copy and structured records live in `src/data/content.ts`. Policy register records are stored separately in SQLite and seeded from `backend/database.py`. Update the content file to replace:

- the vision statement and CEO message;
- navigation cards and recent updates;
- strategic pillars and roadmap milestones;
- policy, event, project, team, and resource records;
- FAQs and global-search entries.

The generated hero landscape is stored at `public/assets/vision-mountain.png`. Replace that file with another approved wide-format image while keeping the filename, or update its references in the presentation components and stylesheet.

## Prototype functionality

Implemented in the frontend:

- all 11 navigation destinations and active navigation states;
- responsive desktop, tablet, and mobile layouts;
- global search across sample pages, updates, policies, and resources;
- policy search and category filters;
- update filters and expandable update details;
- event save-state interactions for the current browser session;
- readable CEO message and clearly labeled video placeholder;
- floating and full-page Ask the CEO forms with demo-only confirmation;
- accessible focus states, semantic landmarks, keyboard navigation, and reduced-motion support.

Requires backend or platform integration before production use:

- authentication and employee profile data;
- notification delivery and read state;
- persistent search indexing and authoritative content sources;
- policy/document links and permissions;
- video hosting and playback;
- event/calendar integration;
- question transmission, storage, moderation, privacy controls, and response workflow;
- content management, analytics, auditing, and production hosting.

No form in this prototype transmits or stores information.
