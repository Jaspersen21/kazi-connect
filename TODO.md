# TODO - Connecting branch roadmap

- [x] Feature 1 — WhatsApp Sharing (frontend only): implement share button on job cards + job details; push to `Connecting`.
- [ ] Feature 2 — Job Filters (frontend + minor backend):
  - [ ] Backend: extend `/jobs` GET to accept optional `location`, `category`, `job_type` params and pass to `job_service.list_jobs` filtering.
  - [ ] Frontend: add `src/components/JobFilters.tsx` with 3 selects + clear button.
  - [ ] Frontend: wire filters into `JobsPage` and pass them to existing `useJobs`/`getJobs` params.
- [ ] Feature 3 — Seeker Profile (backend + frontend):
  - [x] Backend: add `profile.py` router, `profile_service.py`, and `schemas/profile.py`; store in separate `profiles` collection.
  - [x] Backend: register router in `backend/main.py`.
  - [x] Frontend: add `src/api/profile.ts` and `src/hooks/useProfile.ts` for GET/POST/PUT.
  - [x] Frontend: add `src/pages/ProfilePage.tsx` and route `/profile` (protected).

- [ ] Feature 4 — Employer Verification Badge:
  - [ ] Backend: ensure `verified` stored on employer register; denormalize employer verified to job documents (or lookup) and return `employer_verified` in job responses.
  - [ ] Frontend: show badge on job cards and job details.
- [ ] Feature 5 — SMS Notifications:
  - [ ] Backend: create `sms_service.py`, add config/env, call after application status update when accepted/rejected.
- [ ] Feature 6 — Landing Page:
  - [ ] Frontend: create `src/pages/Landing.tsx` and update `/` route to render Landing; ensure CTAs and live job count.

