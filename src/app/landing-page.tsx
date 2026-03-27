import Link from 'next/link'

/**
 * Landing page component showcasing Hirelane's value proposition,
 * features, and pricing tiers for potential users.
 */
export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-surface/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-content font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">Hirelane</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground-muted hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-foreground-muted hover:text-foreground transition-colors">Pricing</a>
              <Link
                href="/auth/signup"
                className="bg-primary text-primary-content px-6 py-2 rounded-btn font-semibold hover:bg-primary-hover transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                  AI-Powered Job Applications
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground-muted bg-clip-text text-transparent">
                  Land Your Dream Job with
                  <span className="text-primary block">Tailored Applications</span>
                </h1>
                <p className="text-xl mb-8 text-foreground-muted leading-relaxed">
                  Stop sending generic CVs. Hirelane uses AI to automatically adapt your resume and 
                  generate personalized cover letters for every job application.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center bg-primary text-primary-content px-8 py-4 rounded-btn font-semibold hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/25"
                  >
                    Start Free Trial
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button className="inline-flex items-center justify-center border-2 border-border text-foreground px-8 py-4 rounded-btn font-semibold hover:bg-surface-hover transition-colors">
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 5a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                    Watch Demo
                  </button>
                </div>
                <div className="flex items-center gap-6 text-sm text-foreground-muted">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Free 7-day trial
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    No credit card required
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-border">
                  {/* Mock CV Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
                      <div>
                        <div className="h-4 bg-foreground/80 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-foreground/40 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-foreground/60 rounded w-full"></div>
                      <div className="h-3 bg-primary/60 rounded w-3/4"></div>
                      <div className="h-3 bg-foreground/40 rounded w-5/6"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-2 bg-foreground/50 rounded w-16"></div>
                        <div className="h-2 bg-foreground/30 rounded w-full"></div>
                        <div className="h-2 bg-foreground/30 rounded w-3/4"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-foreground/50 rounded w-20"></div>
                        <div className="h-2 bg-foreground/30 rounded w-full"></div>
                        <div className="h-2 bg-foreground/30 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Magic Indicator */}
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                    ✨ AI Optimized
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-success/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">3x</div>
                <div className="text-foreground-muted">More Interview Calls</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">90%</div>
                <div className="text-foreground-muted">Time Saved</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-foreground-muted">Successful Applications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Job Applications Are Broken
              </h2>
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Traditional job hunting is a time-consuming, inefficient process that doesn't showcase your best fit for each role.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-card p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-3">Hours of Manual Work</h3>
                <p className="text-foreground-muted">
                  Customizing your CV for each job takes 2-3 hours of tedious copying, pasting, and reformatting.
                </p>
              </div>
              
              <div className="bg-background rounded-card p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-3">Generic Applications</h3>
                <p className="text-foreground-muted">
                  One-size-fits-all resumes fail to highlight the specific skills and experience each employer wants.
                </p>
              </div>
              
              <div className="bg-background rounded-card p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-3">Cover Letter Struggle</h3>
                <p className="text-foreground-muted">
                  Writing compelling, personalized cover letters is challenging and repetitive for every application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Hirelane Changes Everything
              </h2>
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Our AI-powered platform automates the entire application process, giving you more time to focus on what matters.
              </p>
            </div>

            {/* Feature 1 - CV Adaptation */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Smart Analysis
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  AI-Powered CV Adaptation
                </h3>
                <p className="text-lg text-foreground-muted mb-6 leading-relaxed">
                  Our AI analyzes job descriptions and automatically highlights your most relevant 
                  experience, skills, and achievements for each position. No more manual tweaking.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Keyword optimization for ATS systems</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Skill matching with job requirements</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Experience prioritization by relevance</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-border">
                  <div className="space-y-4">
                    {/* Before/After Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background rounded-lg p-4 border border-border">
                        <div className="text-xs text-foreground-muted mb-2">BEFORE</div>
                        <div className="space-y-2">
                          <div className="h-2 bg-foreground/20 rounded w-full"></div>
                          <div className="h-2 bg-foreground/20 rounded w-3/4"></div>
                          <div className="h-2 bg-foreground/20 rounded w-5/6"></div>
                        </div>
                      </div>
                      <div className="bg-background rounded-lg p-4 border border-primary">
                        <div className="text-xs text-primary mb-2">AFTER</div>
                        <div className="space-y-2">
                          <div className="h-2 bg-primary rounded w-full"></div>
                          <div className="h-2 bg-primary/70 rounded w-5/6"></div>
                          <div className="h-2 bg-primary/50 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-primary text-primary-content p-2 rounded-lg shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Feature 2 - Cover Letters */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="lg:order-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-info/10 text-info text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-info rounded-full mr-2"></span>
                  Personalization
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Compelling Cover Letters
                </h3>
                <p className="text-lg text-foreground-muted mb-6 leading-relaxed">
                  Generate personalized cover letters that speak directly to the company's needs and culture. 
                  Each letter is crafted to show why you're the perfect fit.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Company-specific messaging</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Professional tone matching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Value proposition alignment</span>
                  </li>
                </ul>
              </div>
              <div className="lg:order-1 relative">
                <div className="bg-gradient-to-br from-info/5 to-info/10 rounded-2xl p-8 border border-border">
                  <div className="bg-background rounded-lg p-6 border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-info/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <span className="font-medium">Cover Letter</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-foreground/60 rounded w-full"></div>
                      <div className="h-2 bg-info/60 rounded w-4/5"></div>
                      <div className="h-2 bg-foreground/40 rounded w-full"></div>
                      <div className="h-2 bg-foreground/40 rounded w-3/5"></div>
                      <div className="h-2 bg-info/60 rounded w-4/5"></div>
                      <div className="h-2 bg-foreground/40 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Process Flow */}
            <div className="bg-gradient-to-r from-surface to-primary/5 rounded-2xl p-8 lg:p-12 border border-border">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Simple 5-Step Process</h3>
                <p className="text-lg text-foreground-muted">From upload to application in minutes, not hours</p>
              </div>
              
              <div className="grid md:grid-cols-5 gap-8">
                {[
                  { icon: "📄", title: "Upload CV", desc: "Upload your master CV in PDF format" },
                  { icon: "🔗", title: "Paste Job URL", desc: "Add the job posting link you're interested in" },
                  { icon: "🤖", title: "AI Processing", desc: "Our AI analyzes and adapts your application" },
                  { icon: "✏️", title: "Review & Edit", desc: "Make any final tweaks to perfection" },
                  { icon: "📨", title: "Apply!", desc: "Download and submit with confidence" }
                ].map((step, index) => (
                  <div key={index} className="text-center relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      {step.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-foreground-muted">{step.desc}</p>
                    {index < 4 && (
                      <div className="hidden md:block absolute top-8 left-full w-full">
                        <svg className="w-6 h-6 text-primary/30 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Choose the plan that fits your job search needs. Upgrade or downgrade anytime.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <div className="relative bg-background border-2 border-border rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Free Starter</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-foreground">$0</span>
                    <span className="text-foreground-muted ml-2">/month</span>
                  </div>
                  <p className="text-foreground-muted">Perfect for trying out Hirelane</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "3 applications per month",
                    "AI-powered CV adaptation",
                    "Personalized cover letters", 
                    "PDF & LaTeX export",
                    "Job URL scraping",
                    "Basic application tracking"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/auth/signup"
                  className="block w-full text-center bg-surface border-2 border-border text-foreground py-4 rounded-btn font-semibold hover:bg-surface-hover hover:border-primary/30 transition-all"
                >
                  Start Free
                </Link>
              </div>

              {/* Paid Tier */}
              <div className="relative bg-gradient-to-br from-primary to-primary-hover text-primary-content rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-warning text-warning-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    ⭐ Most Popular
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold">$9.99</span>
                    <span className="text-primary-content/80 ml-2">/month</span>
                  </div>
                  <p className="text-primary-content/90">For serious job seekers</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited applications",
                    "Priority AI processing",
                    "Advanced CV templates",
                    "Premium LaTeX templates",
                    "Email support",
                    "Application analytics",
                    "Everything in Free"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-primary-content">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/auth/signup"
                  className="block w-full text-center bg-white text-primary py-4 rounded-btn font-semibold hover:bg-white/90 transition-all shadow-md"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-foreground-muted mb-4">
                All plans include a 7-day free trial. No credit card required to start.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-foreground-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Money-back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Social Proof Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
              Loved by Job Seekers Worldwide
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-warning">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-foreground-muted mb-4">
                  "Hirelane saved me hours of work. I got 3 interview calls in my first week of using it!"
                </p>
                <div className="font-semibold text-foreground">Sarah Chen</div>
                <div className="text-sm text-foreground-muted">Software Engineer</div>
              </div>
              
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-warning">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-foreground-muted mb-4">
                  "The AI-generated cover letters are incredibly personalized. It's like having a professional writer on my team."
                </p>
                <div className="font-semibold text-foreground">Marcus Johnson</div>
                <div className="text-sm text-foreground-muted">Marketing Manager</div>
              </div>
              
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-warning">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-foreground-muted mb-4">
                  "Finally landed my dream job! The tailored applications made all the difference."
                </p>
                <div className="font-semibold text-foreground">Emily Rodriguez</div>
                <div className="text-sm text-foreground-muted">Product Designer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-hover text-primary-content relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:75px_75px]" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-xl mb-8 text-primary-content/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of professionals who have improved their application success rate with Hirelane. 
              Start your free trial today and land your dream job faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-btn font-semibold text-lg hover:bg-white/90 transition-all shadow-lg"
              >
                Get Started Free
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <div className="text-primary-content/80 text-sm">
                No credit card required • 7-day free trial
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-primary-content/70">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Setup in 2 minutes
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                24/7 support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-primary-content font-bold text-xl">H</span>
                  </div>
                  <span className="text-2xl font-bold">Hirelane</span>
                </div>
                <p className="text-background/80 mb-6 max-w-md">
                  AI-powered job application automation for the modern professional. 
                  Land more interviews with tailored CVs and personalized cover letters.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-background/60 hover:text-background transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-background/60 hover:text-background transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-3 text-sm text-background/80">
                  <li><a href="#features" className="hover:text-background transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-background transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Demo</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-3 text-sm text-background/80">
                  <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
                  <li><a href="/contact" className="hover:text-background transition-colors">Contact</a></li>
                  <li><a href="/privacy" className="hover:text-background transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-background transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-background/20 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/60">
                <div>© 2024 Hirelane. All rights reserved.</div>
                <div className="mt-4 md:mt-0">
                  Made with ❤️ for job seekers everywhere
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}