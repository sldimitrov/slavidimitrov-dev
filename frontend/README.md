# slavidimitrov.dev — frontend

Frontend for my personal developer website. A React + TypeScript SPA that
consumes the Django REST Framework API in `../backend`.

## Tech stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript (strict mode)
- [MUI v6](https://mui.com/) for components and theming
- [TanStack Query v5](https://tanstack.com/query) for all server state
- [React Router v6](https://reactrouter.com/) for routing
- [Zustand](https://zustand-demo.pmnd.rs/) for client/UI state (theme mode, mobile nav)
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) for form validation
- [Axios](https://axios-http.com/) for the API client
- [react-markdown](https://github.com/remarkjs/react-markdown) + `remark-gfm` for rendering Markdown content

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The dev server runs at `http://localhost:5173` by default. It expects the
backend API to be reachable at the URL set in `VITE_API_BASE_URL`.

## Environment variables

| Variable            | Description                      | Default                        |
| ------------------- | -------------------------------- | ------------------------------ |
| `VITE_API_BASE_URL` | Base URL of the backend REST API | `http://localhost:8000/api/v1` |

Copy `.env.example` to `.env` and adjust as needed.

## Available scripts

| Script            | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR             |
| `npm run build`   | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally           |
| `npm run lint`    | Lint the codebase with ESLint                  |
| `npm run format`  | Format the codebase with Prettier              |

## Project structure

```
src/
├── api/          # Axios client + one file per resource (blog, projects, cv, contact)
├── hooks/        # TanStack Query hooks wrapping the api/ layer
├── store/        # Zustand stores for UI-only state
├── theme/        # MUI theme (light/dark) and ThemeProvider
├── router/       # createBrowserRouter config with lazy-loaded pages
├── layouts/      # Route layouts (Navbar + Outlet + Footer)
├── pages/        # Route-level page components, one folder per route
├── components/   # Shared and layout components
└── types/        # Shared TypeScript types for API response shapes
```

## Notes

- Server state (blog posts, projects, CV data) always goes through TanStack
  Query hooks in `hooks/` — components never call the API directly.
- Zustand is only used for local UI state (theme mode, mobile nav open/closed).
  It is not persisted to `localStorage`.
- Content (blog posts, projects, CV entries) is authored via the Django admin
  in the backend — there is no CMS/admin UI in this app.
- The "Download PDF" button on the CV page currently links to a stub
  (`/resume.pdf`) — add the actual file to `public/` or point it at a backend
  endpoint once one exists.
