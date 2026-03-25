import Link from 'next/link'

/**
 * Landing page component showcasing Hirelane's value proposition,
 * features, and pricing tiers for potential users.
 */
export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-primary text-primary-content">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stop Writing the Same CV for Every Job
            </h1>
            <p className="text-xl mb-8 text-primary-content/90">
              Hirelane automatically adapts your CV and generates personalized cover letters 
              for each job application using AI. Land more interviews with tailored documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/signup"
                className="bg-primary-content text-primary px-8 py-3 rounded-btn font-semibold hover:bg-primary-content/90 transition-colors"
              >
                Start Free Trial
              </Link>
              <button className="border-2 border-primary-content text-primary-content px-8 py-3 rounded-btn font-semibold hover:bg-primary-content/10 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              The Problem with Traditional Job Applications
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="font-semibold text-lg mb-2">Time-Consuming</h3>
                <p className="text-foreground-muted">
                  Manually customizing your CV for each job takes hours you don't have
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold text-lg mb-2">Generic Applications</h3>
                <p className="text-foreground-muted">
                  One-size-fits-all resumes don't highlight relevant skills for specific roles
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="font-semibold text-lg mb-2">Cover Letter Struggle</h3>
                <p className="text-foreground-muted">
                  Writing compelling, personalized cover letters is difficult and repetitive
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              How Hirelane Solves This
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Smart CV Adaptation</h3>
                    <p className="text-foreground-muted">
                      AI analyzes job descriptions and automatically highlights your most relevant 
                      experience and skills for each position.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Personalized Cover Letters</h3>
                    <p className="text-foreground-muted">
                      Generate compelling cover letters that speak directly to the company's 
                      needs and culture, based on the job posting.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Multiple Export Formats</h3>
                    <p className="text-foreground-muted">
                      Download your tailored documents as PDF for immediate use or LaTeX 
                      for further customization.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Automatic Job Scraping</h3>
                    <p className="text-foreground-muted">
                      Simply paste a job URL and our AI extracts all relevant information 
                      automatically - no manual copying required.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Application Tracking</h3>
                    <p className="text-foreground-muted">
                      Keep track of your applications and quota usage with a clean, 
                      intuitive dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-8 rounded-card">
                <h3 className="font-semibold text-lg mb-4">The Process</h3>
                <ol className="space-y-4 text-foreground-muted">
                  <li className="flex gap-3">
                    <span className="text-primary">1.</span>
                    Upload your master CV (PDF format)
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">2.</span>
                    Paste the job posting URL you want to apply for
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">3.</span>
                    AI adapts your CV and generates a cover letter
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">4.</span>
                    Review, edit if needed, then download as PDF/LaTeX
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">5.</span>
                    Apply with confidence - your documents are perfectly tailored
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Simple, Transparent Pricing
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Free Tier */}
              <div className="bg-background border-2 border-subtle rounded-card p-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Free</h3>
                  <div className="text-3xl font-bold text-primary mb-4">$0</div>
                  <p className="text-foreground-muted mb-6">Perfect for trying out Hirelane</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>3 applications per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>CV adaptation with AI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Cover letter generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>PDF & LaTeX export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Job URL scraping</span>
                  </li>
                </ul>
                <Link
                  href="/auth/signup"
                  className="block w-full text-center bg-surface-hover text-foreground py-3 rounded-btn font-semibold hover:bg-border-subtle transition-colors"
                >
                  Start Free
                </Link>
              </div>

              {/* Paid Tier */}
              <div className="bg-primary text-primary-content rounded-card p-8 relative">
                <div className="absolute top-0 right-4 bg-primary-content text-primary px-3 py-1 rounded-b-md text-sm font-semibold">
                  Popular
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Professional</h3>
                  <div className="text-3xl font-bold mb-1">$9.99</div>
                  <div className="text-sm opacity-90 mb-4">per month</div>
                  <p className="opacity-90 mb-6">For serious job seekers</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-300">✓</span>
                    <span>Unlimited applications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-300">✓</span>
                    <span>Priority AI processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-300">✓</span>
                    <span>Advanced LaTeX templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-300">✓</span>
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-300">✓</span>
                    <span>Everything in Free</span>
                  </li>
                </ul>
                <Link
                  href="/auth/signup"
                  className="block w-full text-center bg-primary-content text-primary py-3 rounded-btn font-semibold hover:bg-primary-content/90 transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
            <p className="text-center text-foreground-muted mt-6">
              All plans include a 7-day free trial. No credit card required to start.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have improved their application success rate with Hirelane.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-primary text-primary-content px-8 py-4 rounded-btn font-semibold text-lg hover:bg-primary-hover transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Hirelane</h3>
            <p className="text-background/80 mb-6">
              AI-powered job application automation for the modern professional.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <a href="/privacy" className="text-background/80 hover:text-background">Privacy Policy</a>
              <a href="/terms" className="text-background/80 hover:text-background">Terms of Service</a>
              <a href="/contact" className="text-background/80 hover:text-background">Contact</a>
            </div>
            <div className="mt-6 pt-6 border-t border-background/20 text-sm text-background/60">
              © 2024 Hirelane. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}