import React, { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Download,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  Server,
  ShieldCheck,
  Terminal,
  X,
  Zap,
} from 'lucide-react'
import './styles.css'

const skillGroups = [
  { icon: Code2, label: 'Languages & frameworks', skills: ['Java', 'Spring Boot', 'Python', 'Node.js', 'NestJS', 'TypeScript', 'Next.js', 'JAX-RS'] },
  { icon: Server, label: 'Architecture & systems', skills: ['Microservices', 'REST APIs', 'Distributed Systems', 'Local-first', 'AI workflows'] },
  { icon: Database, label: 'Data & persistence', skills: ['PostgreSQL', 'SQLite', 'MongoDB', 'Prisma ORM', 'Neon DB'] },
  { icon: Zap, label: 'Cloud & delivery', skills: ['AWS', 'Docker', 'Kubernetes', 'Kafka', 'Jenkins', 'GitHub Actions', 'Splunk', 'Selenium'] },
]

const projects = [
  {
    number: '01',
    title: 'Gated Community Operations',
    description: 'Community operations for admins, guards, and residents — identity, visitors, and maintenance in one role-aware system.',
    detail: 'Owned identity, visitor, and maintenance flows with RBAC, seeded demo data, documented APIs, and Selenium UI coverage. An optional local LLM assistant can suggest maintenance advice; it is not the core product.',
    tags: ['RBAC', 'Selenium', 'REST APIs'],
    accent: 'blue',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'ML-IMS',
    description: 'Microbiology lab inventory: sample intake through auditable stock movements for lab teams.',
    detail: 'Built check-in/out workflows, dashboards, and RBAC with Next.js, Express/TypeScript, Prisma, SQLite/PostgreSQL, Docker, Vitest, and GitHub Actions.',
    tags: ['Next.js', 'Prisma', 'Docker'],
    accent: 'cyan',
    icon: Database,
  },
  {
    number: '03',
    title: 'Campaign Ops Platform',
    description: 'GOTV and fundraising operations platform with APIs and access control so teams can move quickly.',
    detail: 'Designed fundraising and GOTV APIs with JWT authentication, granular RBAC, seeded organization data, and an end-to-end SDLC pipeline spanning QA and deployment.',
    tags: ['TypeScript', 'JWT', 'CI/CD'],
    accent: 'violet',
    icon: Globe2,
  },
]

const timeline = [
  { date: 'Jun 2026 — Present', role: 'Independent Product Engineer', company: 'Personal product development · Remote', text: 'Building AI-assisted MVP products while directing architecture, security, testing, product decisions, and end-to-end SDLC workflows.', current: true },
  { date: 'Jul 2023 — Jun 2025', role: 'Backend Engineer', company: 'Bank of America', text: 'Architected scalable REST APIs for mobile, web, payment, and merchant platforms, strengthening authentication with OAuth2 and Spring Security.' },
  { date: 'May 2022 — Jun 2023', role: 'Java Backend Engineer', company: 'Visa', text: 'Optimized Visa Tokenization Service processing 15M+ monthly transactions; cut bug-resolution time by 25% and deployment cycles by 50%.' },
  { date: 'Dec 2019 — Feb 2022', role: 'Java Software Engineer', company: 'Federal Reserve Bank', text: 'Delivered 99.8% identity verification success, 40% fewer security vulnerabilities, 30% faster APIs, and 85% automated test coverage.' },
  { date: 'Jul 2018 — Nov 2019', role: 'Java Software Engineer', company: 'Apple', text: 'Improved AppleCare Connect warranty sales by 15%, data-processing performance by 25%, and re-architected services for 5,000 concurrent transactions.' },
  { date: 'Sep 2016 — Jun 2018', role: 'Java Software Engineer', company: 'U.S. Bank', text: 'Built metadata-driven UI generation, REST APIs, KYC workflows, and Drools-based business rules for dynamic compliance configurations.' },
  { date: 'Oct 2009 — Jul 2016', role: 'Application Analyst', company: 'Symantec Corporation (HPE)', text: 'Supported e-commerce systems processing 50,000+ daily transactions, improved JMS reliability by 98%, and resolved 98% of audit issues.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [formStatus, setFormStatus] = useState('idle')
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    if (selectedProject) {
      previousFocusRef.current = document.activeElement
      requestAnimationFrame(() => modalRef.current?.focus())
    } else {
      previousFocusRef.current?.focus?.()
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedProject])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSelectedProject(null)
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])')
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!formspreeId) {
      setFormStatus('missing')
      return
    }

    setFormStatus('sending')
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) {
        setFormStatus('error')
        return
      }
      form.reset()
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="site-shell">
      <div className="noise" />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#main-content" onClick={() => scrollTo('main-content')}>
          <span className="brand-mark">MR</span>
          <span>Murali<span className="brand-dot">.</span></span>
        </a>
        <nav id="primary-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <button onClick={() => scrollTo('expertise')}>Expertise</button>
          <button onClick={() => scrollTo('projects')}>Projects</button>
          <button onClick={() => scrollTo('experience')}>Experience</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
        <button className="header-cta" onClick={() => scrollTo('contact')}>Let's talk <ArrowUpRight size={16} /></button>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="main-content">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> Available for select engagements <span className="eyebrow-line" /></div>
            <h1>Sr Java Backend<br /><span className="gradient-text">Engineer</span></h1>
            <p className="hero-lede">Building high-reliability enterprise platforms, distributed microservices, and AI-assisted products.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo('contact')}>Discuss your platform <ArrowUpRight size={17} /></button>
              <button className="button button-ghost" onClick={() => scrollTo('projects')}>View projects <MoveUpRight size={17} /></button>
              <a className="button button-ghost" href="/Murali_Rayala_Sr_Java_Backend_Engineer.pdf" download>Download resume <Download size={16} /></a>
            </div>
            <div className="hero-meta"><MapPin size={15} /> San Francisco Bay Area / Burlingame, CA <span>•</span> 15+ years in the craft</div>
          </div>
          <div className="hero-visual" aria-label="Developer profile visualization">
            <div className="orb orb-one" /><div className="orb orb-two" />
            <div className="terminal-card">
              <div className="terminal-bar"><span /><span /><span /><small>murali@platform ~</small></div>
              <div className="terminal-body">
                <div><span className="code-muted">01</span> <span className="code-key">const</span> <span className="code-blue">engineer</span> <span className="code-white">= {'{'}</span></div>
                <div><span className="code-muted">02</span> &nbsp; <span className="code-blue">focus</span><span className="code-white">:</span> <span className="code-green">'reliability'</span><span className="code-white">,</span></div>
                <div><span className="code-muted">03</span> &nbsp; <span className="code-blue">impact</span><span className="code-white">:</span> <span className="code-green">'at scale'</span><span className="code-white">,</span></div>
                <div><span className="code-muted">04</span> &nbsp; <span className="code-blue">curiosity</span><span className="code-white">:</span> <span className="code-green">true</span></div>
                <div><span className="code-muted">05</span> <span className="code-white">{'}'}</span></div>
                <div className="terminal-prompt"><span>➜</span> shipping systems that last<span className="cursor" /></div>
              </div>
            </div>
            <div className="float-badge badge-one"><span className="badge-icon"><Check size={13} /></span><span><strong>99.8%</strong><small>verification success</small></span></div>
            <div className="float-badge badge-two"><span className="badge-icon cyan"><Zap size={13} /></span><span><strong>50%</strong><small>faster deployments</small></span></div>
          </div>
        </section>

        <section className="metrics-band">
          <div className="section-wrap metrics-grid">
            <div><strong>15<span>+</span></strong><small>Years experience</small></div>
            <div><strong>15<span>M+</span></strong><small>Monthly transactions</small></div>
            <div><strong>99.8<span>%</span></strong><small>Identity verification</small></div>
            <div><strong>50<span>%</span></strong><small>Faster deployments</small></div>
          </div>
        </section>

        <section id="expertise" className="section-wrap content-section">
          <div className="section-heading"><div><span className="section-kicker">01 / CAPABILITIES</span><h2>Systems thinker.<br /><em>Delivery minded.</em></h2></div><p>I turn complex requirements into calm, observable systems — from first architectural decision through reliable production delivery.</p></div>
          <div className="skills-grid">{skillGroups.map(({ icon: Icon, label, skills }) => <div className="skill-card" key={label}><div className="skill-icon"><Icon size={19} /></div><h3>{label}</h3><div className="pill-wrap">{skills.map(skill => <span className="pill" key={skill}>{skill}</span>)}</div></div>)}</div>
        </section>

        <section id="projects" className="section-wrap content-section projects-section">
          <div className="section-heading"><div><span className="section-kicker">02 / SELECTED WORK</span><h2>Built for the<br /><em>real world.</em></h2></div><p>Products and platforms where thoughtful architecture meets the pace of real teams, users, and constraints.</p></div>
          <div className="projects-grid">{projects.map(project => { const Icon = project.icon; const openProject = () => { previousFocusRef.current = document.activeElement; setSelectedProject(project) }; return <article className={`project-card ${project.accent}`} key={project.title} role="button" tabIndex="0" aria-label={`Open case study: ${project.title}`} onClick={openProject} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject() } }}><div className="project-top"><span className="project-number">{project.number}</span><span className="project-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span></div><div className="project-illustration" aria-hidden="true"><Icon size={38} strokeWidth={1.4} /><div className="illustration-lines" /></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="learn-more">Explore case study <ArrowUpRight size={14} aria-hidden="true" /></span></article> })}</div>
        </section>

        <section id="experience" className="section-wrap content-section experience-section">
          <div className="section-heading"><div><span className="section-kicker">03 / EXPERIENCE</span><h2>A track record of<br /><em>lasting impact.</em></h2></div><p>15+ years partnering with teams at the intersection of backend engineering, platform thinking, and product outcomes.</p></div>
          <div className="timeline">{timeline.map(item => <div className={`timeline-item ${item.current ? 'current' : ''}`} key={`${item.company}-${item.date}`}><div className="timeline-marker">{item.current && <span />}</div><div className="timeline-date">{item.date}</div><div className="timeline-content"><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.text}</p></div></div>)}</div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-wrap contact-inner">
            <div className="contact-copy"><span className="section-kicker">04 / CONTACT</span><h2>Have a hard problem<br />worth <em>solving?</em></h2><p>Tell me a little about what you're building. I’ll get back to you within 2–3 business days.</p><div className="contact-links"><a href="mailto:murali.rayala@gmail.com"><Mail size={17} aria-hidden="true" /> murali.rayala@gmail.com</a><a href="https://www.linkedin.com/in/murali-rayala" target="_blank" rel="noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn</a><a href="https://github.com/raorayala" target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> GitHub</a></div></div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">Name<input id="contact-name" required autoComplete="name" name="name" placeholder="Your name…" /></label>
              <label htmlFor="contact-email">Email<input id="contact-email" required autoComplete="email" type="email" name="email" placeholder="you@company.com…" spellCheck="false" /></label>
              <label htmlFor="contact-message">Message<textarea id="contact-message" required name="message" rows="4" placeholder="What are you working on?…" /></label>
              <input type="hidden" name="_subject" value="Portfolio contact" />
              <button className="button button-primary" type="submit" disabled={formStatus === 'sending'}>
                {formStatus === 'success' ? <>Message sent <Check size={17} aria-hidden="true" /></> : formStatus === 'sending' ? <>Sending…</> : <>Send message <ArrowUpRight size={17} aria-hidden="true" /></>}
              </button>
              {formStatus === 'success' && <span className="form-success" role="status" aria-live="polite">Thanks — I’ll get back to you within 2–3 business days.</span>}
              {formStatus === 'error' && <span className="form-error" role="status" aria-live="polite">Something went wrong. Email murali.rayala@gmail.com instead.</span>}
              {formStatus === 'missing' && <span className="form-error" role="status" aria-live="polite">Contact form is not configured yet. Use the email link for now.</span>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="brand" href="#main-content"><span className="brand-mark">MR</span><span>Murali<span className="brand-dot">.</span></span></a><span>© 2026 Murali Rayala</span><span className="footer-note"><Terminal size={14} aria-hidden="true" /> Built with intention</span></footer>

      {selectedProject && <div className="modal-backdrop" onClick={() => setSelectedProject(null)}><div className={`project-modal ${selectedProject.accent}`} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" tabIndex="-1" onClick={event => event.stopPropagation()}><button className="modal-close" aria-label="Close project details" onClick={() => setSelectedProject(null)}><X size={20} aria-hidden="true" /></button><span className="section-kicker">CASE STUDY / {selectedProject.number}</span><h2 id="project-dialog-title">{selectedProject.title}</h2><p>{selectedProject.detail}</p><div className="modal-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="button button-primary" onClick={() => setSelectedProject(null)}>Back to projects <ArrowUpRight size={16} aria-hidden="true" /></button></div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
