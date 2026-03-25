# Ubiquitous Language - Hirelane

## User & Subscription

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **User** | A job seeker who signs up for Hirelane | Job seeker, candidate, person |
| **Subscription Tier** | The pricing level a user is on: Free or Paid | Plan, account type, membership |
| **Free User** | A user on the Free tier with 3 applications/month quota | Freemium user |
| **Paid User** | A user on a Paid tier with unlimited applications/month | Premium user, subscriber |

## Application Lifecycle

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Application** | A user's complete record for a single job: CV, job posting, generated documents, and status | Job application, submission, entry |
| **Job Posting** | The job listing/advertisement a user wants to apply for | Job description, job listing, position, vacancy |
| **Job Description** | The text content or details extracted from a job posting (title, company, requirements, salary, etc.) | Job text, job content, posting content |
| **Quota** | Monthly limit on applications a user can create (3 for Free tier, unlimited for Paid) | Application limit, allowance, cap |
| **Use Quota Slot** | Consuming one application from a user's monthly quota when creating an **Application** | Decrement quota, use an application, burn a slot |

## Curriculum Vitae (Resume)

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **CV** | A user's curriculum vitae (résumé) with their work experience, skills, education, and contact info | Resume, résumé, profile, background |
| **Base CV** | The original CV a user uploads or enters via form before customization | Original CV, stored CV, user CV |
| **Adapted CV** | A CV tailored/customized to match a specific **Job Posting** using AI | Customized CV, tailored resume, job-specific CV |
| **CV Import** | The act of uploading a PDF or filling a form to provide CV data | CV upload, resume upload |
| **CV Extraction** | Automatically parsing text and structure from an uploaded PDF | PDF parsing, data extraction |

## Job Sourcing

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Job URL** | The web address of a job posting | URL, link, posting URL |
| **Job Scraping** | Automatically extracting job details from a job URL | Web scraping, data extraction, crawling |
| **Scraping Failure** | When the system cannot extract job details from a URL | Scraping error, extraction failure |
| **Job Fallback** | Manual entry of job details via form or text paste when scraping fails | Manual entry, form entry, text paste |

## Document Generation & Compilation

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Cover Letter** | A personalized letter written for a specific job application | Letter, motivation letter, cover note |
| **Document** | Either an **Adapted CV** or **Cover Letter** (or both) | File, output, generated content |
| **LaTeX** | A markup language used to format and generate professional documents | Tex, typesetting format |
| **Document Compilation** | Converting LaTeX source code to a PDF file on the server | PDF generation, PDF rendering, compilation |
| **Adapted Documents** | The **Adapted CV** and **Cover Letter** generated for a single **Application** | Generated documents, output files |
| **In-App Editor** | A text editor within Hirelane where users can edit LaTeX before download | LaTeX editor, code editor, document editor |

## Download & Export

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Download** | The user retrieving a document file (.tex or .pdf) from Hirelane | Export, save, get file |
| **.LaTeX Format** | Plain text LaTeX source file (.tex extension) | .tex file, LaTeX source, raw LaTeX |
| **.PDF Format** | Compiled PDF document ready for submission | PDF file, PDF version |

## Landing Page & Onboarding

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Landing Page** | The public homepage describing Hirelane's features, pricing, and value proposition | Home page, homepage, marketing page |
| **Sign Up** | The process of creating a new user account | Register, create account, join |
| **Log In** | The process of authenticating and starting a user session | Login, authenticate, sign in |

## Pricing & Monetization

| Term | Definition | Aliases to avoid |
|------|-----------|-----------------|
| **Freemium Model** | A business model offering basic features free (3 apps/month) and premium features paid (unlimited apps) | Free tier model, freemium pricing |
| **Quota Enforcement** | The system preventing free users from creating more than 3 **Applications** per month | Hard block, quota blocking, limit enforcement |
| **Paywall** | The message/screen shown when a free user hits their quota, prompting upgrade | Upgrade prompt, pricing screen |

## Key Relationships

- A **User** has one **Subscription Tier** (Free or Paid)
- A **Free User** is restricted by a **Quota** of 3 **Applications** per month
- A **Paid User** has unlimited **Applications**
- A **User** creates an **Application** by providing a **Base CV** and a **Job Posting**
- An **Application** contains an **Adapted CV** and a **Cover Letter**, both stored as **LaTeX**
- **Documents** are compiled to **.PDF Format** on-the-fly for download, or can be downloaded as **.LaTeX Format**
- A **Job Posting** is sourced via **Job Scraping** (URL) or **Job Fallback** (manual form/paste)
- Using a **Quota Slot** is required to create an **Application** (blocks **Free Users** at 3, never blocks **Paid Users**)

## Flagged Ambiguities

1. **"Application" overload:**
   - **Hirelane App** (the software product itself) — avoid calling it this in domain conversations
   - **Application** (a single user's job application record) — this is the canonical domain term
   - **Recommend:** Always say "Hirelane platform/product" for the software; "Application" for the job record.

2. **"Document" ambiguity:**
   - Can refer to either **Adapted CV** OR **Cover Letter** individually, or both together
   - **Recommend:** Always say "**Adapted CV**" and "**Cover Letter**" specifically; use "**Documents**" (plural) only when both are meant together.

3. **"Job" overload:**
   - **Job Posting** (the listing/advertisement)
   - **Job Description** (the content/details extracted)
   - **Job URL** (the web address)
   - **Recommend:** Be specific: "The **Job Posting** at this **URL**" has a **Job Description** containing "requirements and salary."

4. **"User" vs "Candidate" vs "Account":**
   - In this domain, we only have **Users** (job seekers)
   - Avoid: "candidate" (domain-specific jargon from recruiting, not our model), "account" (ambiguous)
   - **Recommend:** Always say "**User**" or "**Free User**" / "**Paid User**" for clarity.

## Example Dialogue

> **Dev:** "When a **Free User** creates a 4th **Application** in the same month, what happens?"
>
> **Domain Expert:** "The system should check their **Quota** before letting them proceed. If they've already used all 3 **Quota Slots**, they hit the **Paywall** and see an upgrade prompt."
>
> **Dev:** "So the **Quota** isn't about documents — it's about how many **Applications** they can create?"
>
> **Domain Expert:** "Exactly. Each **Application** uses one **Quota Slot**. The **Application** itself contains an **Adapted CV** and **Cover Letter**, but those don't count separately against the quota."
>
> **Dev:** "And a **Paid User** can create unlimited **Applications**, so their **Quota** is effectively infinite?"
>
> **Domain Expert:** "Right. **Paid Users** don't have quota enforcement at all. They upload their **Base CV**, grab a **Job Posting**, and the system generates **Documents** — as many times as they want."
>
> **Dev:** "What if we can't extract the **Job Description** from the **Job Posting URL**? Do we still consume a **Quota Slot**?"
>
> **Domain Expert:** "Good question. We try **Job Scraping**, and if that fails, we show a **Job Fallback** form. Once the **User** submits the form and we have a complete **Job Description**, *then* we use the **Quota Slot**. If they abandon the form, no quota is consumed."

---

I've written `UBIQUITOUS_LANGUAGE.md`. From this point forward I will use these terms consistently. If I drift from this language or you notice a term that should be added, let me know.

Key canonical terms for this project:
- **Application** = job application record (not the software itself)
- **Free User** / **Paid User** = subscription tiers (not "account" or "membership")
- **Job Posting** = the listing, **Job Description** = the content
- **Adapted CV** / **Cover Letter** = specific documents (not generic "document")
- **Quota** = monthly application limit with hard enforcement for free users