# Plan: Hirelane MVP - AI-Powered Job Application Pipeline

> Source PRD: `PRD_MVP.md`

## Architectural Decisions

Durable decisions that apply across all phases:

- **Routes:** `/` (public landing), `/auth/*` (signup/login), `/dashboard/*` (wizard & application orchestration), `/api/*` (backend API routes)
- **Schema:** User (id, email, passwordHash, subscriptionTier, createdAt, updatedAt), CV (id, userId, extractedData JSON, lastUpdated), Application (id, userId, jobUrl, jobDescription, adaptedCVLaTeX, coverLetterLaTeX, createdAt), QuotaUsage (id, userId, applicationsUsedThisMonth, subscriptionTier, monthYear)
- **Module Structure:** Six bounded contexts in `src/modules/` — **auth** (signup/login), **cv** (extraction & storage), **job** (scraping & parsing), **document-generation** (Claude API + LaTeX compilation), **application** (orchestration), **quota** (enforcement)
- **Clean Architecture Applied:** Each module follows domain/infrastructure/presentation layers with Result<T> pattern for all use cases; no exceptions propagated to UI
- **Auth Strategy:** Email/password with bcrypt hashing, JWT tokens in httpOnly cookies; OAuth (Google) deferred to Phase 14
- **External Services:** Anthropic Claude API (document generation), Cheerio/Puppeteer (job scraping), pdfjs-dist (PDF text extraction), pdflatex (LaTeX → PDF compilation)
- **Screaming Architecture:** Module structure immediately reveals business domains; no global `/hooks/`, `/components/`, `/models/` folders outside modules
- **Testing:** Unit tests (domain/usecases), integration tests (API routes, repositories); TDD approach with test-first where feasible

---

## Phase 1: Project Setup & Database Schema

**User stories**: Foundation work (not mapped to PRD stories yet)

### What to build

Initialize the Hirelane project with:
1. Prisma ORM configured with PostgreSQL
2. Database schema for User, CV, Application, QuotaUsage entities
3. Module folder structure in `src/modules/` (all six bounded contexts created as empty directories)
4. Seed database with test data (1-2 test users with different subscription tiers)
5. Environment variable setup (.env.example, .env.local with test DB connection)
6. Build pipeline validation (TypeScript, Biome linting, type-check passing)

### Acceptance criteria

- [x] Prisma is installed and `prisma/schema.prisma` defines all four main entities (User, CV, Application, QuotaUsage)
- [ ] `npx prisma migrate dev` runs successfully and creates tables in test PostgreSQL database ⚠️ Requires package installation fix
- [x] Module structure exists: `src/modules/{auth,cv,job,document-generation,application,quota}` (each with domain/infrastructure/presentation subdirs)
- [x] Test seed data: 2 users (1 free, 1 paid), 1 CV, 1 Application, 1 QuotaUsage record
- [x] `.env.example` documents all required environment variables
- [ ] `pnpm run build` and `pnpm run lint` pass without errors ⚠️ Requires package installation fix
- [x] TypeScript strict mode is enabled in `tsconfig.json`

---

## Phase 2: Landing Page (Public Marketing)

**User stories**: 1, 2, 3

### What to build

A static, public-facing landing page that requires no authentication. The page should:
1. Clearly explain what Hirelane does (problem & solution)
2. List key features (CV adaptation, cover letter generation, download as PDF/LaTeX, quota tracking)
3. Display pricing tiers (Free: 3 apps/month, Paid: unlimited)
4. Include a "Sign Up" button linking to the signup form
5. Use Tailwind CSS for responsive, clean design
6. Be server-rendered (Next.js App Router)

### Acceptance criteria

- [ ] Landing page is served at `/` and visually renders without errors
- [ ] Page includes a clear value proposition (problem statement + solution)
- [ ] Features section lists at least 5 key features with descriptions
- [ ] Pricing section clearly shows Free (3 apps/month) vs Paid (unlimited) tiers
- [ ] "Sign Up" button links to `/auth/signup`
- [ ] Page is mobile-responsive (tested with viewport < 640px)
- [ ] Page loads with no console errors or TypeScript warnings

---

## Phase 3: Sign Up Flow (Email/Password)

**User stories**: 4, 7 (partial: signup creates user with initial quota visibility)

### What to build

A complete signup flow:
1. **Domain:** Create `signup.usecase.ts` in `auth` module that validates email format, password strength, checks for duplicate email, hashes password with bcrypt, creates User entity
2. **Infrastructure:** Create `prisma.user.repository.ts` implementing `UserRepository` abstract class; handle DB errors and map to domain errors
3. **API Route:** POST `/api/auth/signup` that calls signup use case, returns JWT token in httpOnly cookie on success
4. **Presentation:** Signup form component with email/password fields, validation feedback, error messages, loading state; on success redirects to `/dashboard` where quota is visible
5. **Error Handling:** Duplicate email error, weak password error, DB connectivity error, validation errors with user-facing messages

### Acceptance criteria

- [ ] Signup form renders at `/auth/signup` with email and password inputs
- [ ] Form validates email format (basic check) and shows error if invalid
- [ ] Form validates password strength (min 8 chars, mix of uppercase/lowercase/numbers) and shows error
- [ ] Submitting form calls POST `/api/auth/signup` with email/password
- [ ] On success: User is created in database, JWT token is set in httpOnly cookie, user is redirected to `/dashboard`
- [ ] On duplicate email: Form shows error "Email already registered"
- [ ] On password weakness: Form shows error "Password must contain at least 8 characters, uppercase, lowercase, and numbers"
- [ ] On DB error: Form shows error "An error occurred. Please try again."
- [ ] Signup use case is tested (happy path + error cases)
- [ ] No sensitive data (passwords, tokens) logged to console

---

## Phase 4: Login Flow

**User stories**: 6, 7 (partial: login displays remaining quota)

### What to build

A complete login flow:
1. **Domain:** Create `login.usecase.ts` in `auth` module that validates credentials against stored user, verifies password hash, validates that user exists
2. **Infrastructure:** Extend `UserRepository` with `findByEmail()` method; handle user-not-found and password-mismatch errors
3. **API Route:** POST `/api/auth/login` that calls login use case, returns JWT in httpOnly cookie on success
4. **Presentation:** Login form with email/password fields, validation, error messages; on success redirects to `/dashboard` with quota display
5. **Error Handling:** Invalid email/password, account not found, DB connectivity error with clear feedback

### Acceptance criteria

- [ ] Login form renders at `/auth/login` with email and password inputs
- [ ] Submitting form calls POST `/api/auth/login` with email/password
- [ ] On success: JWT token is set in httpOnly cookie, user is redirected to `/dashboard`, quota is visible (e.g., "3/3 applications")
- [ ] On invalid credentials: Form shows error "Invalid email or password"
- [ ] On account not found: Form shows error "Account not found"
- [ ] On DB error: Form shows error "An error occurred. Please try again."
- [ ] Login use case is tested (happy path + error cases)
- [ ] Quota display shows correct free tier (3/3) or paid tier (unlimited)
- [ ] httpOnly cookie is set; token is not exposed in JS

---

## Phase 5: CV Upload & Extraction (Happy Path + Fallback Trigger)

**User stories**: 8, 10, 9 (partial: trigger form fallback on extraction failure)

### What to build

Complete CV upload and extraction flow:
1. **Domain:** Create `CVData` entity (name, email, phone, skills, experience, education); `upload-and-extract-cv.usecase.ts` that orchestrates PDF extraction and stores CV data
2. **Infrastructure:** Create `cv.repository.ts` implementing `CVRepository` abstract class with `save()` and `getByCVId()` methods; `pdf-extractor.service.ts` using pdfjs-dist to extract text from PDF
3. **API Route:** POST `/api/cv/upload` accepting multipart/form-data (PDF file), extracting text, validating it contains resume-like content, saving to DB; returns extracted CV data or error
4. **Presentation:** File upload component with drag-drop or file picker, shows extraction progress, displays extracted data preview; **on extraction failure**: shows form fallback with manual entry fields
5. **Error Handling:** PDF corrupted/unreadable, file too large (> 10MB), file not PDF, PDF is image-only (no text layer), DB save failure

### Acceptance criteria

- [ ] Upload component is accessible in wizard Step 1, accepts PDF files via file picker or drag-drop
- [ ] On valid PDF: File is uploaded, text is extracted, extracted data is shown to user (name, email, phone, skills, experience, education)
- [ ] Extracted data is stored in database under authenticated user's account
- [ ] On PDF extraction failure (corrupted, image-only, etc.): Form fallback is shown with manual entry fields instead of blocking user
- [ ] File size validation: Files > 10MB show error "File too large. Maximum 10 MB."
- [ ] File format validation: Non-PDF files show error "Please upload a PDF file."
- [ ] DB save failure shows error "Could not save CV data. Please try again."
- [ ] Upload use case is tested (happy path + all error cases)
- [ ] Extracted CV data includes at least: name, email, phone, skills summary, experience, education

---

## Phase 6: CV Form & Updates

**User stories**: 9, 11, 12

### What to build

Complete manual CV entry and update flow:
1. **Domain:** Extend `CVData` entity with validation (email format, required fields); `submit-cv-form.usecase.ts` and `update-cv.usecase.ts` for form submission and updates
2. **Infrastructure:** Extend `CVRepository` with `updateByCVId()` method; validate input before DB save
3. **API Routes:** POST `/api/cv/form` (initial form submission), PATCH `/api/cv` (updates to existing CV)
4. **Presentation:** Form component with fields: Name, Email, Phone, Skills (textarea), Experience (textarea), Education (textarea); shows validation errors inline; "Update" button allows users to refresh CV anytime
5. **Error Handling:** Missing required fields, invalid email format, invalid date format (if included), DB save/update failures

### Acceptance criteria

- [ ] CV form is shown as fallback after upload failure, and also is accessible anytime from dashboard for updates
- [ ] Form has required fields: Name, Email, Phone, Skills, Experience, Education
- [ ] Email field validates email format and shows error "Please enter a valid email."
- [ ] Required fields show error "This field is required" if left blank
- [ ] Form submit calls POST `/api/cv/form` (new CV) or PATCH `/api/cv` (update)
- [ ] On success: CV data is stored/updated, form confirmation shown, user can proceed to next step
- [ ] On validation error: Inline error messages show above each invalid field
- [ ] On DB error: Form shows error "Could not save CV. Please try again."
- [ ] CV can be updated multiple times; latest version is always used for document generation
- [ ] Update use case is tested (happy path + validation errors)

---

## Phase 7: Job URL Scraping (Happy Path + Fallback Trigger)

**User stories**: 13, 14, 16, 15 (partial: trigger manual fallback on scrape failure)

### What to build

Complete job scraping and parsing flow:
1. **Domain:** Create `JobDescription` entity (title, company, requirements, salary, seniority, etc.); `scrape-job-from-url.usecase.ts` orchestrates scraping and parsing
2. **Infrastructure:** Create `job.repository.ts` implementing `JobRepository` abstract class; `web-scraper.service.ts` using Cheerio (and Puppeteer if needed for JS-heavy sites) with 5-second timeout
3. **API Route:** POST `/api/job/scrape` accepting jobUrl, attempts scrape, returns extracted job details or error triggering fallback
4. **Presentation:** Job URL input field with "Scrape Job" button, shows loading spinner with timeout message; **on scrape failure**: shows fallback form with manual textarea for job description paste or form fields
5. **Error Handling:** URL timeout (5s limit), invalid URL, 404/unreachable, scraping returns no content, URL blocklist (e.g., job boards blocking bots)

### Acceptance criteria

- [ ] Job input component is accessible in wizard Step 2 with URL field
- [ ] User can paste job URL (e.g., LinkedIn, Indeed, etc.)
- [ ] On valid scrape: Job title, company, requirements are extracted and displayed to user
- [ ] Scraping has 5-second timeout; if exceeded, shows message "Could not fetch job details. Please enter manually."
- [ ] On invalid URL: Shows error "Please enter a valid URL (e.g., https://example.com/job/123)"
- [ ] On 404/unreachable: Shows error "Could not reach URL. Please try again or enter manually."
- [ ] On scrape failure or timeout: Form fallback is shown with manual entry method
- [ ] Scrape use case is tested (happy path + timeout, 404, invalid URL)
- [ ] Extracted job includes at least: title, company, requirements/description

---

## Phase 8: Job Manual Entry & Preview

**User stories**: 15, 17

### What to build

Manual job entry and preview flow:
1. **Domain:** Extend `scrape-job-from-url.usecase.ts` with fallback parsing; `parse-job-manual.usecase.ts` for form/text input
2. **Infrastructure:** Extend `JobRepository` with `save()` method for storing parsed job details
3. **API Routes:** POST `/api/job/parse` accepting either (a) plain text job description paste or (b) form field submission, parses into `JobDescription` object
4. **Presentation:** Fallback form with textarea for pasting job description text, OR form fields (title, company, requirements, salary, etc.); after submission, shows preview of extracted job details before user clicks "Next"
5. **Error Handling:** Empty input, incomplete job details, parsing failures

### Acceptance criteria

- [ ] Fallback job form is shown as option after scrape fails or on manual preference
- [ ] User can either (a) paste job description text in textarea or (b) fill out form fields (title, company, requirements, seniority, salary)
- [ ] Form validates that at least job title and requirements are filled; shows error "Title and requirements are required."
- [ ] Submitting calls POST `/api/job/parse`
- [ ] On success: Preview of extracted job details is shown (title, company, requirements, salary if available)
- [ ] User can review preview and click "Next" to proceed to generation, or "Back" to re-edit
- [ ] On parsing error (e.g., text too short): Shows error "Could not parse job details. Please provide more information."
- [ ] Parse use case is tested (happy path + validation)

---

## Phase 9: Document Generation (Claude API + LaTeX Compilation)

**User stories**: 18, 19, 20, 21, 22

### What to build

End-to-end document generation and compilation:
1. **Domain:** Create `generate-adapted-cv.usecase.ts` and `generate-cover-letter.usecase.ts` that orchestrate Claude API calls; `compile-latex-to-pdf.usecase.ts` compiles LaTeX to PDF server-side
2. **Infrastructure:** Create `document-generation.repository.ts` and `claude-api.service.ts` wrapping Anthropic Claude API with error handling; `latex-compiler.service.ts` executing pdflatex via child process with timeout
3. **API Route:** POST `/api/application/create` receiving user CV + job details, calls both use cases, returns both LaTeX sources plus compiled PDFs
4. **Presentation:** Show loading spinner during generation ("Generating your personalized documents..."), display generated LaTeX and compiled PDFs; allow user to proceed to edit or download
5. **Error Handling:** Claude API timeout/rate-limit/failure, LaTeX compilation timeout/error, invalid LaTeX output, network connectivity

### Acceptance criteria

- [ ] POST `/api/application/create` accepts user CV + job details (jobDescription, jobTitle, company)
- [ ] On submit: Shows loading spinner with message "Generating your personalized documents... (3-10 seconds)"
- [ ] Claude API is called with prompts to generate (a) adapted CV tailored to job posting (b) personalized cover letter referencing company/job title
- [ ] Generated LaTeX for both documents is returned and stored in Application record
- [ ] LaTeX is compiled to PDF server-side using pdflatex; if compilation fails, falls back to serving .tex file with warning message
- [ ] On success: Both adapted CV (LaTeX + PDF) and cover letter (LaTeX + PDF) are displayed to user
- [ ] On Claude API timeout (> 30s): Shows error "Generation took too long. Please try again."
- [ ] On Claude API rate-limit: Shows error "Request limit reached. Please try again in a few moments."
- [ ] On LaTeX compilation failure: Shows .tex file and message "PDF compilation failed. You can download the LaTeX file and compile locally, or manually edit the LaTeX above."
- [ ] On network error: Shows error "Network error. Please try again."
- [ ] Generation use cases are tested (happy path + API timeout, rate-limit, compilation failure)
- [ ] Adapted CV references job-specific keywords from job description
- [ ] Cover letter includes company name and job title personalization

---

## Phase 10: In-App LaTeX Editor & Revert

**User stories**: 23, 24, 25 (stretch goal: live preview), 26 (stretch goal: syntax highlighting), 27

### What to build

In-app editing flow for both adapted CV and cover letter:
1. **Domain:** Create `edit-document.usecase.ts` and `revert-document.usecase.ts` (update Application record with edited LaTeX, or restore AI-generated version)
2. **Infrastructure:** Extend `ApplicationRepository` with `updateDocuments()` and store original AI-generated LaTeX separately for revert capability
3. **Presentation:** Step 4 of wizard shows two tabs (adapted CV | cover letter), each with textarea editor (monospace font, basic styling); "Revert" button restores AI version; "Save Changes" button saves edits
4. **Error Handling:** LaTeX syntax errors (warn but allow save), revert failure, save failure

### Acceptance criteria

- [ ] Editor shows as Step 4 in wizard; user sees textarea with LaTeX source code
- [ ] Editor has monospace font and syntax-friendly styling
- [ ] "Revert" button is available; clicking it restores original AI-generated LaTeX with confirmation dialog "Discard changes and use AI-generated version?"
- [ ] On revert: Original LaTeX is restored, no data loss
- [ ] "Save Changes" button calls PATCH `/api/application/:id` to update edited LaTeX in database
- [ ] On save: Confirmation message "Changes saved."
- [ ] On LaTeX syntax error detected: Warn user but allow save (they can fix locally)
- [ ] On save failure: Shows error "Could not save changes. Please try again."
- [ ] User can edit both adapted CV and cover letter separately
- [ ] Edit and revert use cases are tested (happy path + errors)
- [ ] Original AI-generated LaTeX is preserved in database for revert (not overwritten)

---

## Phase 11: Download & Export

**User stories**: 28, 29, 30, 31

### What to build

Download flow for both LaTeX and PDF formats:
1. **Domain:** Create `download-document.usecase.ts` that retrieves document from Application, verifies ownership, returns file
2. **Infrastructure:** Extend `ApplicationRepository` with `getByIdAndUserId()` (verify user owns application)
3. **API Routes:** GET `/api/application/:id/document/:type` where type ∈ {adapted-cv-pdf, adapted-cv-tex, cover-letter-pdf, cover-letter-tex} returns file as download
4. **Presentation:** Step 5 (Download) shows four buttons: "Download CV as PDF" | "Download CV as LaTeX" | "Download Letter as PDF" | "Download Letter as LaTeX"
5. **Error Handling:** Application not found, user not authorized, file generation failure, network error during serving

### Acceptance criteria

- [ ] Download step is shown after editing (Step 5)
- [ ] Four download buttons are available: CV PDF, CV .tex, Letter PDF, Letter .tex
- [ ] Clicking each button downloads the corresponding file with appropriate MIME type and filename (e.g., `adapted-cv.pdf`, `adapted-cv.tex`, `cover-letter.pdf`, `cover-letter.tex`)
- [ ] GET `/api/application/:id/document/:type` verifies user owns application; returns 403 if unauthorized
- [ ] On application not found: Returns 404 error "Application not found"
- [ ] On file generation failure: Returns 500 error "Could not generate file. Please try again."
- [ ] Files are served with correct Content-Disposition header (attachment) so browser downloads instead of displaying
- [ ] Download use case is tested (happy path + not found, unauthorized)

---

## Phase 12: Quota System & Enforcement

**User stories**: 33, 34, 35, 36, 37

### What to build

Quota tracking and enforcement flow:
1. **Domain:** Create `check-quota.usecase.ts`, `use-quota-slot.usecase.ts`, `get-remaining-quota.usecase.ts` in quota module; validate user subscription tier and month boundaries
2. **Infrastructure:** Create `quota.repository.ts` implementing `QuotaRepository` abstract class with `checkQuota()`, `incrementUsage()`, `getRemainingQuota()` methods; handle concurrent quota updates safely
3. **API Routes:** GET `/api/user/quota` returns remaining quota; during POST `/api/application/create`, check quota before generation; if free user at 3/3, return error with paywall message
4. **Presentation:** Dashboard shows quota (e.g., "3 applications left this month"); when user tries to create 4th application, show modal "You've used 3/3 free applications. Upgrade to continue." with upgrade button
5. **Error Handling:** Concurrent quota consumption, quota check failures, month boundary switching, invalid subscription tier

### Acceptance criteria

- [ ] GET `/api/user/quota` returns { remaining: number, total: number, tier: "free" | "paid" }
- [ ] Free user sees quota display (e.g., "3/3 applications used")
- [ ] Paid user sees "Unlimited applications"
- [ ] Before POST `/api/application/create`: Check `check-quota.usecase.ts`
- [ ] If free user at 3/3: Return error { success: false, error: { code: "QUOTA_EXCEEDED", message: "You've used 3/3 free applications. Upgrade to continue." } }
- [ ] On quota exceeded: Modal shows paywall message with "Upgrade" button linking to payment page (stub for MVP)
- [ ] On successful application creation: `use-quota-slot.usecase.ts` decrements quota (only for free tier)
- [ ] Paid users bypass all quota checks; quota enforcement never blocks them
- [ ] Quota resets monthly on 1st of month (QuotaUsage.monthYear field tracks month)
- [ ] Concurrent requests don't allow overaging free user (use transaction or row-level lock)
- [ ] Quota use cases are tested (free user 3/3, paid user unlimited, concurrent requests)

---

## Phase 13: Multi-Step Wizard UX & Success Screen

**User stories**: 38, 39, 40, 41, 42, 43

### What to build

Complete multi-step wizard orchestration and UX:
1. **Domain:** Create `create-application.usecase.ts` that chains all steps (CV → Job → Generate Docs → Edit → Download)
2. **Presentation:** Wizard component with linear flow: Step 1 (CV upload/form) → Step 2 (Job URL/manual) → Step 3 (Review job details) → Step 4 (Edit LaTeX) → Step 5 (Download); breadcrumb showing current step; Next/Previous/Finish buttons
3. **UX Features:**
   - Display progress (e.g., "Step 3 of 5")
   - Prevent skipping steps (Next button disabled until current step valid)
   - Inline validation errors for each step
   - Success screen after download with quota remaining display and "Create Another Application" button
4. **State Management:** Store wizard state in URL (e.g., `/dashboard/wizard?step=3`) or React context; persist partially-filled application during session
5. **Error Handling:** Validation errors on each step, navigation errors, state loss errors

### Acceptance criteria

- [ ] Wizard rendered at `/dashboard/wizard` with Step 1 showing CV upload
- [ ] Wizard displays progress (e.g., "Step 2 of 5: Select Job")
- [ ] Breadcrumb shows all steps with current step highlighted
- [ ] Previous button is disabled on Step 1
- [ ] Next button is disabled until current step is completed with valid data
- [ ] Validation errors show inline below failing fields with red text
- [ ] User can navigate back and forward through wizard without losing data
- [ ] On Step 5 (Download): After user downloads documents, success screen shows "Application created! You have X applications left this month."
- [ ] Success screen has "Create Another Application" button that resets wizard to Step 1
- [ ] Success screen has "Go to Dashboard" button (deferred to Phase 2)
- [ ] Wizard survives page refresh (state persisted in URL or context)
- [ ] Wizard orchestration is tested (happy path through all 5 steps)

---

## Phase 14: Google OAuth (Optional/Stretch)

**User stories**: 5

### What to build

Google OAuth signup/login flow:
1. **Domain:** Extend `signup.usecase.ts` and `login.usecase.ts` to handle OAuth identity (oauthProvider, oauthId fields on User)
2. **Infrastructure:** Integrate Google Sign-In library (e.g., NextAuth.js or Google OAuth 2.0 directly); handle OAuth token exchange and user creation
3. **API Route:** POST `/api/auth/oauth/google/callback` exchanging OAuth code for token, creating/fetching user, issuing JWT
4. **Presentation:** "Sign In with Google" button on both signup and login pages (alongside email/password option)
5. **Error Handling:** OAuth token expiration, user already signed up with email, account linking conflicts

### Acceptance criteria

- [ ] "Sign In with Google" button is shown on `/auth/signup` and `/auth/login`
- [ ] Clicking button opens Google OAuth consent screen
- [ ] On consent: User is created if new, or logged in if existing; JWT token is issued and user redirected to `/dashboard`
- [ ] Google OAuth users can also log in with their email/password if they add one later (account linking, or deferred)
- [ ] On OAuth error: Shows error "Google sign-in failed. Please try again."
- [ ] User record stores oauthProvider (google) and oauthId (Google sub) for identity verification
- [ ] OAuth use cases are tested (happy path, token exchange, new vs existing user)

---

## Success Criteria (MVP Complete)

All 13 phases (or 14 with OAuth) deliver a **fully functional, demoable product**:

- [ ] Users can sign up, log in, and see their quota
- [ ] Users can upload CV (PDF or form) with extraction and fallback
- [ ] Users can input job posting (URL scrape or manual) with fallback
- [ ] Users can generate tailored CV + cover letter via Claude API
- [ ] Users can edit generated documents in-app
- [ ] Users can download documents as PDF and LaTeX
- [ ] Free users are blocked at 3 applications/month with upgrade prompt
- [ ] Paid users have unlimited applications
- [ ] Wizard UX guides users through all steps with validation and error handling
- [ ] All modules follow Clean Architecture with Result<T> pattern
- [ ] Error handling is comprehensive and user-facing messages are clear
- [ ] Codebase is tested (unit + integration tests per module)
- [ ] TypeScript strict mode, Biome linting, and type-check all pass
