# PRD: Hirelane MVP - AI-Powered Job Application Pipeline

## Problem Statement

Job seekers spend excessive time on each application:
- Manually adapting their CV to match each job posting's requirements
- Writing unique cover letters from scratch for each position
- Tracking multiple applications across different platforms

This repetitive work creates friction and reduces the number of quality applications candidates can submit. A typical candidate might apply to 5-10 jobs per week, each taking 20-30 minutes of manual adaptation work.

## Solution

**Hirelane** is a SaaS platform that automates the job application workflow for job seekers. Users can:

1. Upload their base CV (PDF) or enter details via a form
2. Paste a job posting URL or job description text
3. Let AI automatically generate a tailored CV and cover letter
4. Edit both documents in-app if needed
5. Download as PDF and LaTeX
6. Eventually track all applications in one place (Phase 2)

**Freemium Business Model:**
- Free users: 3 applications/month
- Paid users: Unlimited applications/month
- Hard quota blocking for free tier

This dramatically reduces friction per application (from 20-30 min to 2-3 min), allowing candidates to apply more strategically and increase their success rate.

---

## User Stories

### **Landing Page & Authentication**
1. As a job seeker, I want to land on a clear homepage explaining what Hirelane does, so that I understand the value before committing
2. As a job seeker, I want to see pricing tiers (free vs paid), so that I understand the costs upfront
3. As a job seeker, I want to see key features listed, so that I know exactly what problems Hirelane solves
4. As a new user, I want to sign up with email/password, so that I can create an account quickly
5. As a new user, I want to sign up with Google OAuth, so that I don't need to remember another password
6. As a returning user, I want to log in to my account, so that I can access my saved data
7. As a logged-in user, I want to see my current application quota, so that I know how many applications I have left

### **CV Management**
8. As a job seeker, I want to upload my CV as a PDF, so that the system can extract my qualifications
9. As a job seeker, I want to fill out a form with my resume details if PDF extraction fails, so that I don't lose data
10. As a job seeker, I want my CV data to be stored in my account, so that I don't have to re-upload every time
11. As a job seeker, I want to update my CV details at any time, so that my profile stays current
12. As a job seeker, I want validation of my CV data (e.g., email format, dates), so that I catch errors early

### **Job Input & Parsing**
13. As a job seeker, I want to paste a job posting URL, so that the system can automatically extract job details
14. As a job seeker, I want the system to try scraping the URL intelligently, so that I don't have to manually copy text
15. As a job seeker, I want a fallback option to paste the job description manually if scraping fails, so that I'm not blocked
16. As a job seeker, I want to review and edit job details before generation, so that the AI has accurate information
17. As a job seeker, I want to see a preview of extracted job details, so that I can verify correctness before proceeding

### **Document Generation**
18. As a job seeker, I want the system to generate a CV tailored to the job posting, so that my qualifications match the job requirements
19. As a job seeker, I want the system to generate a unique cover letter for the job, so that I appear genuinely interested
20. As a job seeker, I want cover letter generation to reference specific job details and company name, so that it feels personalized
21. As a job seeker, I want generated documents in LaTeX format, so that I have professional, compilable source files
22. As a job seeker, I want generated documents compiled to PDF automatically, so that I have ready-to-submit PDFs

### **Document Editing**
23. As a job seeker, I want to edit the adapted CV in an in-app LaTeX editor before downloading, so that I can tweak the content if needed
24. As a job seeker, I want to edit the generated cover letter in-app, so that I can adjust tone or add personal touches
25. As a job seeker, I want live LaTeX preview while editing, so that I can see how the document looks as I make changes (stretch goal)
26. As a job seeker, I want syntax highlighting in the LaTeX editor, so that the code is readable (stretch goal)
27. As a job seeker, I want to revert to the AI-generated version if my edits go wrong, so that I don't lose the original

### **Downloads & Export**
28. As a job seeker, I want to download the adapted CV as PDF, so that I can submit it immediately
29. As a job seeker, I want to download the adapted CV as .tex file, so that I can edit it further in my own LaTeX editor
30. As a job seeker, I want to download the cover letter as PDF, so that I can attach it to my application
31. As a job seeker, I want to download the cover letter as .tex file, so that I have the source for future editing
32. As a job seeker, I want both documents in a single download (zip), so that I don't have to download separately (nice-to-have)

### **Quota Management**
33. As a free user, I want to see how many applications I have left (e.g., 2/3), so that I know when I'll hit my limit
34. As a free user, I want to be blocked from creating a 4th application when I've used all 3 slots, so that I understand the business model
35. As a free user, I want a clear upgrade prompt when I hit my quota, so that I know how to get unlimited access
36. As a paid user, I want unlimited applications, so that I can apply to as many jobs as I want
37. As a paid user, I want my quota never to decrease, so that I have peace of mind

### **Wizard Flow & UX**
38. As a user, I want a clear multi-step wizard (Step 1 → 2 → 3...), so that the process feels manageable
39. As a user, I want to see which step I'm on, so that I understand my progress
40. As a user, I want Next/Previous buttons to navigate linearly, so that I can't accidentally skip steps
41. As a user, I want helpful validation errors if I skip a required field, so that I don't proceed with incomplete data
42. As a user, I want a success screen after download, so that I see confirmation the process completed
43. As a user, I want to start a new application after finishing one, so that I can chain applications without navigation friction

### **Error Handling**
44. As a user, I want clear error messages if PDF parsing fails, so that I know what went wrong (e.g., "PDF is corrupted")
45. As a user, I want helpful guidance if job scraping fails, so that I understand my fallback options
46. As a user, I want the system to gracefully handle network errors during generation, so that I'm not left hanging
47. As a user, I want to retry failed operations easily, so that I don't lose my progress

---

## Implementation Decisions

### **Architecture**
- **Pattern:** Clean Architecture + Domain-Driven Design (DDD) with Screaming Architecture
- **Structure:** Business-first module organization in `src/modules/`, each a bounded context with its own domain/infrastructure/presentation layers
- **Framework:** Next.js 16.2.1 with App Router, Server Components by default
- **Styling:** Tailwind CSS + custom components (no external UI library for MVP to keep it lean)
- **Language:** TypeScript strict mode

### **Module Design**
Six core modules will be created, each following Clean Architecture principles:

1. **Auth Module** (`auth/`)
   - Handles user signup, login, session management
   - Supports email/password + Google OAuth
   - Manages JWT or session tokens
   - Deep, stable interface: minimal changes after launch

2. **CV Module** (`cv/`)
   - Parses PDF uploads using a PDF parsing library (e.g., pdf-parse, pdfjs-dist)
   - Falls back to form input for missing/incorrect fields
   - Stores CV data in user account
   - Deep interface: `loadCVFromPDF()`, `storeCVData()`, `getCVData()`

3. **Job Module** (`job/`)
   - Scrapes job posting URLs using web scraping (e.g., Cheerio, Puppeteer for dynamic content)
   - Falls back to manual text input + form for unscrapeable URLs
   - Parses job details (title, company, requirements, salary, etc.)
   - Deep interface: `scrapeJobFromURL()`, `parseJobText()`, `parseJobForm()`

4. **Document Generation Module** (`document-generation/`)
   - Integrates with Claude API for CV adaptation and cover letter generation
   - Generates LaTeX source for both documents
   - Compiles LaTeX to PDF server-side using pdflatex/xelatex
   - Deep interface: `generateAdaptedCV()`, `generateCoverLetter()`, `compileToPDF()`

5. **Application Module** (`application/`)
   - Orchestrates the entire pipeline: takes user CV + job details → generates documents → stores results
   - Coordinates between CV, Job, and Document Generation modules
   - Manages document storage (LaTeX only, PDF compiled on-the-fly)
   - Deep interface: `createApplication()`, `editApplicationNotes()`, `getApplications()`

6. **Quota Module** (`quota/`)
   - Tracks free vs paid usage quotas
   - Enforces hard limits (3 applications/month for free)
   - Checks quota before allowing application creation
   - Very stable: simple business logic
   - Deep interface: `checkQuota()`, `useQuotaSlot()`, `getRemainingQuota()`

### **Data Model**
- **User:** id, email, passwordHash, oauthProvider, subscriptionTier, createdAt, updatedAt
- **CV:** id, userId, pdfPath, extractedData (JSON), lastUpdated
- **Application:** id, userId, jobUrl, jobTitle, company, jobDescription, adaptedCVLaTeX, coverLetterLaTeX, createdAt, status
- **QuotaUsage:** id, userId, applicationsUsedThisMonth, subscriptionTier, monthYear

### **Authentication**
- Email/password: bcrypt hashing, JWT tokens, httpOnly cookies
- OAuth: Google Sign-In via NextAuth.js or similar
- Session management: Simple JWT or NextAuth.js session store

### **PDF Parsing & Compilation**
- **PDF Parse:** Use `pdf-parse` or `pdfjs-dist` for text extraction from PDFs
- **LaTeX Compilation:** Use `latex` CLI via Node.js child process, or containerize with Docker for reliability
- **Fallback:** If compilation fails, show error to user with LaTeX source as download option

### **Job Scraping**
- **URL Scraping:** Use Cheerio for static sites, Puppeteer for dynamic sites, with timeouts
- **Error Handling:** If scraping fails, prompt user to manually paste job description
- **Rate Limiting:** Implement delays to avoid blocking by job boards

### **LLM Provider**
- **Provider:** Anthropic Claude API (claude-3-5-sonnet or similar)
- **Prompts:**
  - CV adaptation: Take user CV + job description → generate tailored CV highlighting matching skills
  - Cover letter: Take user CV + job details → generate personalized cover letter
- **Cost Management:** Cache prompts using Claude's batch API or careful prompt design to minimize token usage

### **In-App LaTeX Editor**
- **Component:** Simple textarea with monospace font for now (MVP)
- **Future:** Monaco Editor or CodeMirror for syntax highlighting + live preview
- **Revert:** Store original AI-generated version to allow reset

### **File Storage**
- **LaTeX:** Store as text in database (small files, < 50KB typical)
- **PDFs:** Generate on-the-fly via pdflatex, serve as response downloads (no persistent storage to save disk space)
- **Uploaded PDFs:** Store temporarily during session, don't persist after user logs out

### **Payment/Subscription (Stub for MVP)**
- Implement quota enforcement logic
- Create mock payment flow or Stripe webhook setup
- Actual payment integration deferred to Phase 2 (when ready to go live)

### **Tech Stack**
- **Frontend:** React 19.2.4 + Next.js 16.2.1 (Server Components)
- **Styling:** Tailwind CSS 4 + custom components
- **Database:** PostgreSQL (via Prisma ORM)
- **PDF Parsing:** pdfjs-dist or pdf-parse
- **Form Validation:** Simple TypeScript validation (no external library needed)
- **Web Scraping:** Cheerio (for static) + Puppeteer (for dynamic, if needed)
- **LaTeX Compilation:** pdflatex via command line
- **Testing:** Vitest + React Testing Library (setup in Phase 1, tests added iteratively)

### **API Routes**
- `POST /api/auth/register` → Sign up
- `POST /api/auth/login` → Login
- `POST /api/auth/logout` → Logout
- `GET /api/user/quota` → Check remaining quota
- `POST /api/cv/upload` → Upload CV PDF
- `POST /api/cv/form` → Submit CV via form
- `GET /api/cv` → Get stored CV data
- `POST /api/job/scrape` → Scrape job from URL
- `POST /api/job/parse` → Parse job description text
- `POST /api/application/create` → Create new application (calls Claude, compiles PDFs)
- `GET /api/application/list` → List user's applications (Phase 2)
- `PATCH /api/application/:id` → Edit application notes
- `GET /api/application/:id/document` → Download PDF/LaTeX

---

## Testing Decisions

### **What Makes a Good Test**
- Tests external behavior and contracts, not implementation details
- Focuses on happy path + clear error cases
- Mocks external dependencies (Claude API, file system)
- Tests are independent and can run in any order
- Each test is descriptive and documents expected behavior

### **Modules to Test (MVP Priority)**

1. **CV Module** - High Priority
   - Unit tests: PDF parsing with real + corrupted PDFs
   - Form validation: Required fields, email format, date ranges
   - Test prior art: Similar validation tests in codebase (if any)

2. **Job Module** - High Priority
   - Integration tests: Scraping test URLs (mock responses)
   - Form validation: Job title required, requirements parsing
   - Error handling: Timeout + invalid URLs
   - Test prior art: Job posting fixtures

3. **Document Generation Module** - Integration Tests
   - Mock Claude API calls (record real responses, replay in tests)
   - Verify LaTeX output is valid (basic syntax check)
   - PDF compilation: Test with sample LaTeX (may skip in CI if pdflatex unavailable)
   - Test prior art: API integration patterns in codebase

4. **Quota Module** - Unit Tests
   - Check quota enforcement: Allow 3 apps for free user
   - Reject 4th application
   - Allow unlimited for paid user
   - Test prior art: Business logic tests

5. **Application Module** - Integration Tests
   - End-to-end: Mock CV + Job → generates docs → stores in DB
   - Quota checked before creation
   - Can't exceed quota

6. **Auth Module** - Integration Tests
   - Email/password signup + login
   - Token generation + validation
   - OAuth mock integration
   - Session persistence

### **Out-of-Scope Testing (Phase 2)**
- E2E tests (Cypress/Playwright) - deferred
- Performance testing - deferred
- Load testing - deferred
- Security testing (SQL injection, XSS, etc.) - add as product matures

### **CI/CD**
- Run unit + integration tests on every push
- Linting with Biome (already configured)
- Type checking with TypeScript
- Skip PDF compilation tests in CI if pdflatex unavailable (add to .env.test)

---

## Out of Scope

### **Phase 2+ Features**
- Application tracking dashboard (view all past applications)
- Interview notes and feedback tracking
- Search/filter past applications
- Subscription billing portal (payment processing)
- Advanced customization (custom LaTeX templates, multiple CV styles)
- Cover letter regeneration without using a quota slot
- API for third-party integrations
- Mobile app
- Dark mode (UI will support it with Tailwind, but not primary focus)
- Testimonials or case studies on landing page

### **Technical Decisions Deferred**
- Database choice specifics (PostgreSQL assumed, Prisma schema finalized in Phase 1)
- Exact Claude API model version (will use latest stable)
- Self-hosted vs managed LaTeX compilation (will evaluate both, aim for containerized)
- Advanced error recovery (retry logic, dead letter queues)
- Analytics and usage tracking
- A/B testing infrastructure

---

## User Flows (MVP Happy Path)

### **Flow 1: First-Time User**
1. Land on homepage
2. Read features + pricing
3. Click "Sign Up"
4. Create account (email/password or Google OAuth)
5. Redirected to wizard
6. Step 1: Upload CV (PDF) or fill resume form
7. Data extracted + stored
8. Step 2: Paste job URL or job description
9. System attempts to scrape; if fails, shows form for manual entry
10. Step 3: Review job details, click "Next"
11. System generates adapted CV + cover letter (Claude API call)
12. Step 4: Edit generated LaTeX in-app editor if desired
13. Step 5: Download PDF + .tex for both documents
14. Success screen shows quota remaining (e.g., "2 applications left")
15. Option to "Create Another Application" or "Done"

### **Flow 2: Returning User (Free, Hit Quota)**
1. Log in
2. Start a new application
3. At quota enforcement, system blocks and shows paywall: "You've used 3/3 free applications. Upgrade to continue."
4. User either upgrades (Phase 2) or exits

### **Flow 3: Returning User (Paid)**
1. Log in
2. Create applications with unlimited quota
3. CV/job data persists across sessions

### **Error Case: PDF Parsing Fails**
1. User uploads PDF
2. Extraction fails (corrupted, image-only, etc.)
3. System shows: "Couldn't extract CV data. Please fill the form manually."
4. Form appears with fields: Name, Email, Phone, Skills, Experience, Education
5. User fills and continues

### **Error Case: Job Scraping Fails**
1. User pastes job URL
2. Scraping times out or URL returns 404
3. System shows: "Couldn't fetch job details. Please paste the job description below or fill the form."
4. User either pastes text or uses form editor
5. Continue to generation step

---

## Further Notes

### **Performance Considerations**
- PDF parsing can be slow for large files (> 10MB); add timeout/file size limit
- Claude API calls take 3-10 seconds; show loading spinner with progress message
- LaTeX compilation can take 2-5 seconds; server-side caching of compiled PDFs could be added later
- Consider implementing request queuing if traffic spikes

### **Security Considerations**
- Do not store raw API keys in frontend code; use backend environment variables
- LaTeX compilation: Sanitize inputs to prevent LaTeX injection attacks
- PDF upload: Validate file format, implement virus scanning for future (ClamAV or similar)
- Rate limit API endpoints (e.g., max 10 applications/hour per user)

### **Accessibility (MVP Scope)**
- Ensure form labels are properly associated with inputs
- Use semantic HTML (button, form, input elements)
- Color contrast meets WCAG AA standards
- Keyboard navigation supported (Tab, Enter, Escape)
- Alt text for images

### **Localization**
- MVP assumes English-only UI
- Claude API prompts assume English job descriptions (multi-language support Phase 2+)

### **Browser Support**
- Modern browsers (Chrome, Firefox, Safari, Edge from last 2 versions)
- Mobile-responsive using Tailwind (mobile UX not optimized for MVP)

### **Monitoring & Logging**
- Log API errors from Claude, scraping, PDF compilation
- Monitor API rate limits and quota usage
- Track failed job scrapings to identify broken URLs/patterns

---

## Success Metrics (Post-Launch)

- User acquisition and signup rate
- Monthly active users
- Average applications per user per month
- Free-to-paid conversion rate
- LaTeX editor usage (do users customize or leave generated docs as-is?)
- Job scraping success rate
- PDF compilation success rate
- Any errors or edge cases discovered in production
