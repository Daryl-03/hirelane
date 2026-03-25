# Hirelane MVP - Implementation Slices

This document contains 12 vertically-sliced GitHub issues for implementing the Hirelane MVP. Create these issues in GitHub in the order listed (dependency order).

---

## Slice 1: Database Schema + Project Setup

**Type:** AFK
**Blocked by:** None
**User stories:** All (foundational infrastructure)

### What to build

Set up the foundational database schema and project configuration for Hirelane. This includes creating Prisma models for User, CV, Application, and QuotaUsage tables, configuring environment variables, and ensuring database connectivity.

This is the first slice and should be completed before most other work can begin.

### Acceptance criteria

- [ ] Prisma schema defined with User, CV, Application, QuotaUsage models
- [ ] Database migrations created and tested locally
- [ ] Environment variables (.env.local) configured for database connection
- [ ] TypeScript strict mode enabled and compiles without errors
- [ ] Can connect to local/remote PostgreSQL database successfully
- [ ] Prisma client can be imported and used in API routes
- [ ] Basic seed data script for local development (optional users for testing)

---

## Slice 11: Landing Page (Hero + Features + Pricing)

**Type:** HITL
**Blocked by:** None
**User stories:** 1, 2, 3

### What to build

Design and build the public-facing landing page that introduces Hirelane to job seekers. This page should communicate the value proposition, key features, pricing tiers, and include CTAs to sign up or log in.

This can be built in parallel with Slice 1 (Database) since they don't depend on each other.

### Acceptance criteria

- [ ] Hero section with compelling headline and value proposition
- [ ] "Sign Up" CTA button prominently displayed
- [ ] Features list explaining key capabilities (CV adaptation, job scraping, document generation)
- [ ] Pricing section showing Free (3 apps/month) vs Paid (unlimited) tiers
- [ ] Navigation links to sign up / log in
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Styling with Tailwind CSS matches professional SaaS aesthetic
- [ ] Sign Up button links to /auth/signup route (Slice 2)
- [ ] Log In button links to /auth/login route (Slice 2)

---

## Slice 2: Email/Password Authentication

**Type:** AFK
**Blocked by:** Slice 1
**User stories:** 4, 5, 6, 7

### What to build

Implement user signup and login via email/password. Users can create an account, log in, receive authentication tokens, and maintain sessions.

### Acceptance criteria

- [ ] POST /api/auth/register endpoint: accepts email + password, validates, hashes password, creates User in DB
- [ ] POST /api/auth/login endpoint: validates email/password, returns JWT token (or session cookie)
- [ ] Password validation: min 8 chars, complexity requirements documented
- [ ] Email validation: RFC 5322 compliant format check
- [ ] Duplicate email check: reject registration if email already exists
- [ ] JWT tokens stored in httpOnly cookies or returned to client
- [ ] POST /api/auth/logout endpoint: clears session/token
- [ ] GET /api/auth/me endpoint: returns current user (protected route)
- [ ] Login form UI: email input, password input, submit button
- [ ] Sign up form UI: email input, password input, password confirm, submit button
- [ ] Form validation errors displayed to user
- [ ] After login, redirect to wizard (Slice 10) or dashboard
- [ ] After logout, redirect to landing page (Slice 11)

---

## Slice 3: Google OAuth Integration

**Type:** AFK
**Blocked by:** Slice 2
**User stories:** 5

### What to build

Integrate Google Sign-In (OAuth 2.0) as an alternative authentication method. Users can create accounts and log in using their Google credentials.

### Acceptance criteria

- [ ] Google OAuth app created and credentials configured in .env
- [ ] GET /api/auth/google endpoint: initiates OAuth flow
- [ ] POST /api/auth/google/callback endpoint: handles OAuth callback, exchanges code for token
- [ ] User lookup/creation: if user exists, log in; if new, create user and log in
- [ ] JWT token returned on successful OAuth login
- [ ] "Sign in with Google" button on login form
- [ ] "Sign up with Google" button on signup form
- [ ] Graceful error handling if OAuth fails (show error message)
- [ ] User profile data (email, name) extracted from Google ID token and stored in DB

---

## Slice 4: CV Import (PDF + Form Fallback)

**Type:** AFK
**Blocked by:** Slice 1, Slice 2
**User stories:** 8, 9, 10, 11, 12

### What to build

Allow users to upload a PDF CV or fill out a form with resume data. System extracts text from PDFs, stores CV data, and falls back to form if parsing fails or is incomplete.

### Acceptance criteria

- [ ] POST /api/cv/upload endpoint: accepts PDF file, validates format, stores temporarily
- [ ] PDF parsing logic: uses pdfjs-dist or pdf-parse to extract text
- [ ] CV data extraction: parses name, email, phone, skills, experience, education from extracted text
- [ ] Extracted data stored in CV table with user_id reference
- [ ] POST /api/cv/form endpoint: accepts form submission (name, email, phone, skills, experience, education)
- [ ] Form validation: name + email required, all fields have reasonable length limits
- [ ] GET /api/cv endpoint: returns stored CV data for user
- [ ] PATCH /api/cv endpoint: allows user to update CV data
- [ ] PDF parsing failure handling: if extraction fails, show message "Couldn't extract CV. Please fill the form."
- [ ] Form UI with input fields for all resume sections
- [ ] Form inputs pre-populated if extraction succeeded (user can edit/confirm)
- [ ] Tailwind-styled form with clear labels and placeholder text
- [ ] Form validation errors displayed inline

---

## Slice 5: Job Input (URL Scraping + Manual Fallback)

**Type:** AFK
**Blocked by:** Slice 1, Slice 2
**User stories:** 13, 14, 15, 16, 17

### What to build

Allow users to input a job posting via URL (with auto-scraping) or manual text/form entry. System attempts to scrape job details and falls back to manual input if scraping fails.

### Acceptance criteria

- [ ] POST /api/job/scrape endpoint: accepts job URL, attempts to scrape using Cheerio
- [ ] Scraping logic: extracts job title, company, job description, requirements, salary (if available)
- [ ] Timeout handling: scraping must complete within 5 seconds or fail over to manual entry
- [ ] Scraping failure handling: if scraping fails or URL is invalid, show form for manual entry
- [ ] POST /api/job/form endpoint: accepts manual job submission (title, company, description, requirements)
- [ ] Form validation: title + description required, reasonable length limits
- [ ] Job detail preview: after scraping or form submission, show extracted details for user review
- [ ] Edit job details UI: user can refine job title, company, description before generation
- [ ] URL input field with placeholder
- [ ] Fallback: "Couldn't fetch job details" message with option to paste text or use form
- [ ] Text paste option: large textarea for job description text input
- [ ] Form UI with fields for job title, company, description, requirements
- [ ] Tailwind-styled inputs with clear labels

---

## Slice 6: Claude API Integration (Generate CV + Cover Letter)

**Type:** AFK
**Blocked by:** Slice 4, Slice 5
**User stories:** 18, 19, 20, 21

### What to build

Integrate Anthropic's Claude API to generate a tailored CV and cover letter based on user's base CV and job posting. System generates LaTeX-formatted documents.

### Acceptance criteria

- [ ] Claude API key configured in .env
- [ ] POST /api/application/generate endpoint: accepts user CV data + job details
- [ ] Prompt 1: "Adapt this CV to match this job posting, highlight relevant skills and experience"
- [ ] Prompt 2: "Generate a personalized cover letter for this job posting, referencing company and role"
- [ ] Claude API calls return LaTeX-formatted CV and cover letter
- [ ] LaTeX output is valid (basic syntax validation)
- [ ] Generated documents stored in Application table (applicant_cv_latex, cover_letter_latex)
- [ ] Error handling: if API call fails, return error message to user with retry option
- [ ] API rate limiting: max 10 generations/hour per user (log rate limit hits)
- [ ] Request timeout: 30 seconds max for Claude API response
- [ ] Token usage tracked (for cost monitoring)

---

## Slice 7: LaTeX Compilation + PDF Download

**Type:** AFK
**Blocked by:** Slice 6
**User stories:** 22, 28, 29, 30, 31

### What to build

Compile LaTeX source to PDF on the server and provide download endpoints for both PDF and .tex formats. Support downloading adapted CV and cover letter in both formats.

### Acceptance criteria

- [ ] Server-side LaTeX compilation: use pdflatex or xelatex via CLI
- [ ] GET /api/application/:id/document/cv/pdf endpoint: compiles LaTeX to PDF, serves file download
- [ ] GET /api/application/:id/document/cv/tex endpoint: returns raw .tex file for download
- [ ] GET /api/application/:id/document/cover-letter/pdf endpoint: compiles LaTeX to PDF, serves download
- [ ] GET /api/application/:id/document/cover-letter/tex endpoint: returns raw .tex file for download
- [ ] Compilation error handling: if pdflatex fails, return error message to user
- [ ] PDF serving: content-disposition header set to attachment (forces download, not inline viewing)
- [ ] File naming: downloaded files named sensibly (e.g., adapted-cv.pdf, cover-letter.tex)
- [ ] Compilation caching: don't recompile same LaTeX if already compiled (store hash)
- [ ] Timeout: compilation must complete within 10 seconds or return error
- [ ] Security: ensure malicious LaTeX input doesn't escape (basic sanitization)

---

## Slice 8: In-App LaTeX Editor

**Type:** AFK
**Blocked by:** Slice 7
**User stories:** 23, 24, 27

### What to build

Provide an in-app text editor where users can view and edit generated LaTeX before download. Allow users to revert to AI-generated version.

### Acceptance criteria

- [ ] LaTeX editor UI: monospace textarea component for LaTeX editing
- [ ] PATCH /api/application/:id/document endpoint: accepts edited LaTeX, updates in DB
- [ ] Live character count or line count displayed
- [ ] "Reset to original" button: reverts edited LaTeX to AI-generated version
- [ ] Basic syntax styling: comments (%) highlighted another color (optional for MVP)
- [ ] Copy to clipboard button for LaTeX source (nice-to-have)
- [ ] Editor supports Ctrl+Z undo (browser default)
- [ ] Tab key inserts spaces (not focus change)
- [ ] Tailwind styling: dark background, light text, readable
- [ ] Save indicator: shows "Saved" after edit is persisted
- [ ] Side-by-side preview (optional for MVP): show PDF preview as user edits (stretch goal)

---

## Slice 9: Quota System (Enforcement + Display)

**Type:** AFK
**Blocked by:** Slice 1, Slice 2
**User stories:** 33, 34, 35, 36, 37

### What to build

Implement quota tracking and enforcement. Free users get 3 applications/month, paid users get unlimited. Hard block free users at their quota limit.

### Acceptance criteria

- [ ] QuotaUsage table created in DB (user_id, month_year, applied_count, subscription_tier)
- [ ] GET /api/quota endpoint: returns user's remaining quota (e.g., "2 of 3 left")
- [ ] Quota check function: checkQuota(userId) returns true if user can create new application
- [ ] Free users (subscription_tier='free') limited to 3 applications per calendar month
- [ ] Paid users (subscription_tier='paid') have unlimited applications
- [ ] Hard block: POST /api/application/create returns 403 if free user exceeds quota
- [ ] Monthly reset: quota resets on the 1st of each month
- [ ] Quota display UI: show "X of 3 applications used" for free users
- [ ] Paywall message: "You've used your 3 free applications. Upgrade to Hirelane Pro to continue."
- [ ] Upgrade button links to payment flow (stub for MVP, full Stripe integration in Phase 2)
- [ ] Quota display updated after each application creation

---

## Slice 10: Application Wizard (Multi-Step Flow)

**Type:** AFK
**Blocked by:** Slice 2, Slice 4, Slice 5, Slice 6, Slice 9
**User stories:** 38, 39, 40, 41, 42, 43

### What to build

Bring all core modules together into a cohesive multi-step wizard. Guide users through CV upload → job input → generation → editing → download, with linear navigation and clear progress indicators.

### Acceptance criteria

- [ ] /dashboard/wizard route created
- [ ] Step 1: CV Upload/Form - user selects PDF upload or form entry (Slice 4)
- [ ] Step 2: Job Input - user pastes URL or job text (Slice 5)
- [ ] Step 3: Review - display scraped/entered job details, allow edits
- [ ] Step 4: Generate - call Claude API, show loading spinner (Slice 6)
- [ ] Step 5: Edit - LaTeX editor for both CV and cover letter (Slice 8)
- [ ] Step 6: Download - display download buttons for both docs in both formats (Slice 7)
- [ ] Step indicator: "Step X of 6" displayed at top
- [ ] Next button: validates step and advances to next
- [ ] Previous button: goes back to previous step (data persisted)
- [ ] Linear flow: no skipping ahead, all required fields must be filled
- [ ] Progress bar showing completion %
- [ ] Success screen after download: "Your documents are ready! Start another application?"
- [ ] "Create Another Application" button resets wizard and starts Step 1 again
- [ ] "Done" button returns to home/landing page
- [ ] Loading states: show spinners during API calls, disable buttons while loading
- [ ] Error handling: if any step fails, show error and allow retry
- [ ] Quota check before Step 4 (generation): if free user at quota, show paywall before generation
- [ ] Responsive design: works on mobile, tablet, desktop

---

## Slice 12: Error Handling & Validation (Module-Wide)

**Type:** AFK
**Blocked by:** Slice 4, Slice 5, Slice 6, Slice 7
**User stories:** 44, 45, 46, 47

### What to build

Implement comprehensive error handling, validation, and user-friendly error messages across all modules. Handle edge cases like PDF corruption, scraping failures, API timeouts, and network errors gracefully.

### Acceptance criteria

- [ ] CV Parsing Errors:
  - [ ] "Couldn't extract CV data. Please fill the form manually." (PDF corrupted/image-only)
  - [ ] Suggested flow: form appears as fallback
- [ ] Job Scraping Errors:
  - [ ] "Couldn't fetch job details from that URL. Please paste the job description below or use the form."
  - [ ] Fallback: textarea for manual paste + form option
- [ ] Network Errors:
  - [ ] "Connection error. Please check your internet and try again."
  - [ ] Retry button available
- [ ] Claude API Errors:
  - [ ] "Generation failed. Please try again in a moment."
  - [ ] Retry button available
  - [ ] Rate limit error: "You've been rate limited. Please wait before trying again."
- [ ] LaTeX Compilation Errors:
  - [ ] "PDF compilation failed. Here's your LaTeX source to download directly."
  - [ ] Show LaTeX output only, let user import to Overleaf or local editor
- [ ] Form Validation:
  - [ ] Required field indicator (*)
  - [ ] Inline validation messages: "Email is required" / "Invalid email format"
  - [ ] On submit, highlight all invalid fields
  - [ ] Error messages in red, guiding language (not just "error")
- [ ] Timeout Handling:
  - [ ] Job scraping: 5 second timeout, fallback to manual entry
  - [ ] Claude API: 30 second timeout, show error with retry
  - [ ] LaTeX compilation: 10 second timeout, show error + LaTeX fallback
- [ ] Success Messages:
  - [ ] "CV uploaded successfully" (after Slice 4)
  - [ ] "Job details confirmed" (after Slice 5)
  - [ ] "Documents generated!" (after Slice 6)
  - [ ] "Ready to download" (at Slice 7)
- [ ] Toast notifications or in-page alerts for all feedback
- [ ] Logging: server-side logging of all errors (for monitoring)
- [ ] User-facing error messages: no technical jargon, suggest next steps

---

## Creation Instructions

1. Create Slice 1 (Database)
2. Create Slice 11 (Landing Page) — can be created at same time
3. Create Slice 2 (Email/Password Auth) — links to Slice 1
4. Create Slice 3 (Google OAuth) — links to Slice 2
5. Create Slice 4 (CV Import) — links to Slice 1, 2
6. Create Slice 5 (Job Scraping) — links to Slice 1, 2
7. Create Slice 6 (Claude API) — links to Slice 4, 5
8. Create Slice 7 (PDF Compilation) — links to Slice 6
9. Create Slice 8 (LaTeX Editor) — links to Slice 7
10. Create Slice 9 (Quota) — links to Slice 1, 2
11. Create Slice 10 (Wizard) — links to Slice 2, 4, 5, 6, 9
12. Create Slice 12 (Error Handling) — links to Slice 4, 5, 6, 7

---
