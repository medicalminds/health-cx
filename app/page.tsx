'use client';

import { FormEvent, useEffect, useState } from 'react';

type GenesysCommand = ((...args: unknown[]) => void) & {
  q?: unknown[][];
  t?: number;
  c?: {
    environment: string;
    deploymentId: string;
  };
};

declare global {
  interface Window {
    _genesysJs?: string;
    Genesys?: GenesysCommand;
  }
}

const services = [
  { name: 'Primary care', detail: 'Care for every stage of life', number: '01' },
  { name: 'Heart & vascular', detail: 'Advanced cardiac expertise', number: '02' },
  { name: 'Orthopedics', detail: 'Move better, recover stronger', number: '03' },
  { name: 'Women’s health', detail: 'Whole-person care for women', number: '04' },
  { name: 'Cancer care', detail: 'Expertise with compassion', number: '05' },
  { name: 'Pediatrics', detail: 'Healthy starts and growing families', number: '06' },
  { name: 'Neurology', detail: 'Specialized brain and spine care', number: '07' },
  { name: 'Behavioral health', detail: 'Support for mind and well-being', number: '08' },
];

const locations = [
  {
    name: 'Health CX Medical Center',
    type: 'Hospital & emergency care',
    address: '1800 Juniper Avenue, Aurora, CO',
    phone: '303-555-0100',
    image:
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1000&q=82',
    alt: 'Bright modern hospital building and entryway',
  },
  {
    name: 'Westfield Community Hospital',
    type: 'Hospital & birth center',
    address: '6200 Westfield Way, Wheat Ridge, CO',
    phone: '303-555-0188',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=82',
    alt: 'Quiet, welcoming hospital patient room',
  },
  {
    name: 'Foothills Specialty Center',
    type: 'Outpatient specialty care',
    address: '10450 Ridgeview Parkway, Lakewood, CO',
    phone: '303-555-0164',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=82',
    alt: 'Contemporary medical center exterior',
  },
];

const stories = [
  {
    category: 'Healthy living',
    title: 'Five simple ways to protect your heart at any age',
    read: '5 min read',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=82',
    alt: 'Stethoscope resting on a clinical desk',
  },
  {
    category: 'Patient story',
    title: 'Back on the trail after a total knee replacement',
    read: '4 min read',
    image:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=82',
    alt: 'A runner moving along an outdoor path',
  },
  {
    category: 'Health CX news',
    title: 'New outpatient center brings more care closer to home',
    read: '3 min read',
    image:
      'https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1000&q=82',
    alt: 'A welcoming, sunlit medical office',
  },
];

const navItems = [
  ['Find care', '#care'],
  ['Doctors', '#doctors'],
  ['Services', '#services'],
  ['Locations', '#locations'],
  ['Patients & visitors', '#patients'],
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [visitType, setVisitType] = useState('Primary care');
  const [appointmentStatus, setAppointmentStatus] = useState('');

  useEffect(() => {
    if (document.getElementById('northvale-genesys-messenger')) {
      return;
    }

    window._genesysJs = 'Genesys';

    const genesys: GenesysCommand =
      window.Genesys ??
      Object.assign(
        (...args: unknown[]) => {
          genesys.q = genesys.q ?? [];
          genesys.q.push(args);
        },
        {} as Pick<GenesysCommand, 'q' | 't' | 'c'>,
      );

    genesys.t = Date.now();
    genesys.c = {
      environment: 'prod-usw2',
      deploymentId: 'cdf63315-1820-4b2a-98a3-7b42b7daf2aa',
    };
    window.Genesys = genesys;

    const script = document.createElement('script');
    script.id = 'northvale-genesys-messenger';
    script.async = true;
    script.charset = 'utf-8';
    script.src =
      'https://apps.usw2.pure.cloud/genesys-bootstrap/genesys.min.js';
    document.head.appendChild(script);
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchInput.trim();

    if (!query) {
      setSearchStatus('Enter a doctor, service or location to begin your search.');
      return;
    }

    const match = services.find((service) =>
      service.name.toLowerCase().includes(query.toLowerCase()),
    );

    setSearchStatus(
      match
        ? `${match.name} is available across the Health CX network. Explore care options below or schedule an appointment.`
        : `We found care options related to “${query}.” Call 303-555-0100 for help choosing the right location.`,
    );
  }

  function handleAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppointmentStatus(
      `Online appointments are available for ${visitType.toLowerCase()}. You can continue through MyHealthCX or call 303-555-0142.`,
    );
  }

  return (
    <main>
      <div className="utility-bar">
        <div className="site-shell utility-inner">
          <p>
            If you are experiencing a medical emergency, call <a href="tel:911">911</a>.
          </p>
          <nav aria-label="Utility navigation">
            <a href="#locations">Locations</a>
            <a href="tel:+13035550100">303-555-0100</a>
            <a href="#portal">Patient portal</a>
          </nav>
        </div>
      </div>

      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="brand" href="#top" aria-label="Health CX Family Medicine home">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">
              Health CX <strong>Family Medicine</strong>
            </span>
          </a>
          <nav className="primary-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#appointment">
            Schedule an appointment
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <div className="site-shell">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMobileOpen(false)}>
                  {label}<span aria-hidden="true">→</span>
                </a>
              ))}
              <a href="#appointment" onClick={() => setMobileOpen(false)}>
                Schedule an appointment<span aria-hidden="true">→</span>
              </a>
            </div>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <div className="site-shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Trusted care, close to home</p>
            <h1>Health care that sees the whole you.</h1>
            <p className="hero-lede">
              From everyday wellness to advanced specialty care, Health CX Family Medicine
              brings expert teams and connected care to families across the Front Range.
            </p>
            <form className="care-search" onSubmit={handleSearch}>
              <label htmlFor="care-query">What can we help you find?</label>
              <div className="search-row">
                <input
                  id="care-query"
                  name="q"
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search doctors, services or locations"
                />
                <button type="submit">Search</button>
              </div>
              {searchStatus && <p className="search-status" role="status">{searchStatus}</p>}
            </form>
            <div className="hero-actions">
              <a className="button button-primary" href="#doctors">Find a doctor</a>
              <a className="button button-secondary" href="#locations">Find a location</a>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=88"
              alt="A physician speaking with a patient during a visit"
            />
            <div className="hero-note">
              <span className="hero-note-number">24/7</span>
              <span>Nurse advice when you need it</span>
              <a href="tel:+13035550100">Call 303-555-0100</a>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-access" id="care" aria-labelledby="quick-access-title">
        <div className="site-shell quick-card">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="quick-access-title">How can we help today?</h2>
          </div>
          <div className="quick-links">
            <a href="#appointment"><span>Book an appointment</span><b aria-hidden="true">→</b></a>
            <a href="#urgent"><span>Get care now</span><b aria-hidden="true">→</b></a>
            <a href="#portal"><span>Access MyHealthCX</span><b aria-hidden="true">→</b></a>
          </div>
        </div>
      </section>

      <section className="care-now section-pad" id="urgent">
        <div className="site-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Care when you need it</p>
              <h2>Choose the right care, right now.</h2>
            </div>
            <p>
              Not sure where to go? Our nurses can help you find the safest, most
              convenient option. Call <a href="tel:+13035550100">303-555-0100</a>.
            </p>
          </div>
          <div className="care-options">
            <article className="care-option emergency-option">
              <span className="care-kicker">Emergency</span>
              <h3>Life-threatening symptoms</h3>
              <p>For chest pain, severe bleeding, trouble breathing or stroke symptoms.</p>
              <a href="tel:911">Call 911 <span aria-hidden="true">→</span></a>
            </article>
            <article className="care-option">
              <span className="care-kicker">Walk-in care</span>
              <h3>Urgent care</h3>
              <p>Same-day care for minor injuries and illnesses. Open daily, 8 a.m.–8 p.m.</p>
              <div className="care-meta"><b>Next arrival</b><span>12 min</span></div>
              <a href="#locations">View urgent care locations <span aria-hidden="true">→</span></a>
            </article>
            <article className="care-option">
              <span className="care-kicker">From your home</span>
              <h3>Virtual care</h3>
              <p>Talk with a Health CX provider by video for common, non-emergency concerns.</p>
              <div className="care-meta"><b>Next visit</b><span>18 min</span></div>
              <a href="#appointment">Start a virtual visit <span aria-hidden="true">→</span></a>
            </article>
            <article className="care-option">
              <span className="care-kicker">Ongoing wellness</span>
              <h3>Primary care</h3>
              <p>Annual visits, preventive care and support for long-term health needs.</p>
              <div className="care-meta"><b>New patients</b><span>Welcome</span></div>
              <a href="#doctors">Find primary care <span aria-hidden="true">→</span></a>
            </article>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="site-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Care across a lifetime</p>
              <h2>Specialists who work together for you.</h2>
            </div>
            <a className="text-link" href="#appointment">Explore all services <span aria-hidden="true">→</span></a>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <a className="service-card" href="#appointment" key={service.name}>
                <span className="service-number" aria-hidden="true">{service.number}</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.detail}</p>
                </div>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="doctor-feature" id="doctors">
        <div className="site-shell doctor-grid">
          <div className="doctor-photo">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=86"
              alt="Health CX physician smiling in a bright clinic"
            />
            <div className="doctor-caption">
              <strong>More than 310 providers</strong>
              <span>One connected care team</span>
            </div>
          </div>
          <div className="doctor-copy">
            <p className="eyebrow">Find your care team</p>
            <h2>A doctor who listens. A team that follows through.</h2>
            <p>
              Choose from primary care and more than 45 specialties, with online
              scheduling and convenient appointments across the region.
            </p>
            <ul>
              <li>Search by specialty, location or insurance</li>
              <li>See next available appointments</li>
              <li>Choose in-person or video visits</li>
            </ul>
            <div className="doctor-actions">
              <a className="button button-primary" href="#appointment">Find a doctor</a>
              <a className="text-link" href="#services">Browse specialties <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="network-stats" aria-label="Health CX Family Medicine network facts">
        <div className="site-shell stats-grid">
          <div><strong>3</strong><span>hospitals</span></div>
          <div><strong>28</strong><span>clinics</span></div>
          <div><strong>310+</strong><span>providers</span></div>
          <div><strong>45+</strong><span>specialties</span></div>
        </div>
      </section>

      <section className="locations section-pad" id="locations">
        <div className="site-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Around the corner, across the region</p>
              <h2>Care that’s close to home.</h2>
            </div>
            <a className="text-link" href="#locations">View all 31 locations <span aria-hidden="true">→</span></a>
          </div>
          <div className="location-grid">
            {locations.map((location) => (
              <article className="location-card" key={location.name}>
                <div className="location-image">
                  <img src={location.image} alt={location.alt} />
                  <span>Open 24 hours</span>
                </div>
                <div className="location-body">
                  <p className="location-type">{location.type}</p>
                  <h3>{location.name}</h3>
                  <address>{location.address}</address>
                  <a href={`tel:+1${location.phone.replace(/\D/g, '')}`}>{location.phone}</a>
                  <div className="location-actions">
                    <a href="#appointment">View location</a>
                    <a href="#locations">Directions <span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="portal-section" id="patients">
        <div className="site-shell portal-card" id="portal">
          <div className="portal-copy">
            <p className="eyebrow">Your health, in one secure place</p>
            <h2>Meet MyHealthCX.</h2>
            <p>
              Message your care team, view test results, refill prescriptions and
              manage appointments whenever it’s convenient for you.
            </p>
            <div className="portal-actions">
              <a className="button button-light" href="#portal-access">Sign in to MyHealthCX</a>
              <a className="text-link text-link-light" href="#portal-access">Create an account <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="portal-preview" id="portal-access" aria-label="MyHealthCX patient portal features">
            <div className="portal-window">
              <div className="portal-window-top"><span /><span /><span /></div>
              <p>Good morning</p>
              <h3>Your health at a glance</h3>
              <div className="portal-appointment">
                <span className="portal-date">SEP<strong>12</strong></span>
                <span><b>Annual wellness visit</b>Dr. Mia Bennett · 10:30 a.m.</span>
              </div>
              <div className="portal-tiles"><span>Messages <b>2</b></span><span>Test results <b>1</b></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="stories section-pad" id="news">
        <div className="site-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Health &amp; wellness</p>
              <h2>Ideas for feeling your best.</h2>
            </div>
            <a className="text-link" href="#news">Visit our health library <span aria-hidden="true">→</span></a>
          </div>
          <div className="story-grid">
            {stories.map((story) => (
              <article className="story-card" key={story.title}>
                <a className="story-image" href="#news">
                  <img src={story.image} alt={story.alt} />
                </a>
                <div className="story-meta"><span>{story.category}</span><span>{story.read}</span></div>
                <h3><a href="#news">{story.title}</a></h3>
                <a className="text-link" href="#news">Read story <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="appointment-section" id="appointment">
        <div className="site-shell appointment-grid">
          <div className="appointment-copy">
            <p className="eyebrow">Ready when you are</p>
            <h2>Let’s get your next visit on the calendar.</h2>
            <p>Schedule online, or call our care coordination team Monday–Friday, 7 a.m.–7 p.m.</p>
            <a href="tel:+13035550142">303-555-0142</a>
          </div>
          <form className="appointment-form" onSubmit={handleAppointment}>
            <label htmlFor="visit-type">What kind of visit do you need?</label>
            <div className="appointment-row">
              <select
                id="visit-type"
                value={visitType}
                onChange={(event) => setVisitType(event.target.value)}
              >
                <option>Primary care</option>
                <option>Specialty care</option>
                <option>Virtual care</option>
                <option>Imaging or lab</option>
              </select>
              <button type="submit">Show appointment options</button>
            </div>
            {appointmentStatus && <p className="appointment-status" role="status">{appointmentStatus}</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-shell footer-main">
          <div className="footer-brand">
            <a className="brand brand-light" href="#top">
              <span className="brand-mark" aria-hidden="true" />
              <span className="brand-name">Health CX <strong>Family Medicine</strong></span>
            </a>
            <p>Compassionate, connected care for Colorado families.</p>
            <a className="footer-phone" href="tel:+13035550100">303-555-0100</a>
          </div>
          <div className="footer-links">
            <div>
              <h3>Get care</h3>
              <a href="#doctors">Find a doctor</a>
              <a href="#locations">Find a location</a>
              <a href="#urgent">Urgent care</a>
              <a href="#appointment">Schedule an appointment</a>
            </div>
            <div>
              <h3>Patients</h3>
              <a href="#portal">MyHealthCX portal</a>
              <a href="#patients">Medical records</a>
              <a href="#patients">Billing &amp; insurance</a>
              <a href="#patients">Visitor information</a>
            </div>
            <div>
              <h3>About</h3>
              <a href="#news">Newsroom</a>
              <a href="#services">Our services</a>
              <a href="#locations">Careers</a>
              <a href="#patients">Contact us</a>
            </div>
          </div>
        </div>
        <div className="site-shell footer-bottom">
          <p>© 2026 Health CX Family Medicine. All rights reserved.</p>
          <nav aria-label="Legal navigation">
            <a href="#patients">Privacy</a>
            <a href="#patients">Accessibility</a>
            <a href="#patients">Nondiscrimination</a>
            <a href="#patients">Price transparency</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
