import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CyfyLogo } from './CyfyLogo';
import ThemeToggle from './ThemeToggle';
import { INDUSTRIES } from '../homeContent';
import { CONTACT_INFO as CONTACT, SERVICES, SERVICE_GROUPS } from '../constants';
import { ProductName, type ProductId } from './ProductName';

interface NavItem { label: string; desc?: string; to: string; product?: ProductId; section?: string }
interface NavGroup { label: string; to?: string; items?: NavItem[]; wide?: boolean }

/** Splits items into consecutive runs that share a section heading (items without one form an untitled run). */
function sections(items: NavItem[]) {
  const runs: { title?: string; items: NavItem[] }[] = [];
  for (const item of items) {
    const last = runs[runs.length - 1];
    if (last && last.title === item.section) last.items.push(item);
    else runs.push({ title: item.section, items: [item] });
  }
  return runs;
}

const NAV: NavGroup[] = [
  { label: 'Home', to: '/' },
  // Generated from the service catalogue so names and links always match the service pages
  { label: 'Services', wide: true, items: [
    { label: 'All services', desc: 'Network, security and compliance', to: '/#services' },
    ...SERVICES.map(s => ({ label: s.title, to: `/service/${s.slug}`, section: SERVICE_GROUPS.find(g => g.id === s.group)!.label })),
  ] },
  { label: 'Platform', items: [
    { label: 'CyShield Pro', product: 'cyshield', desc: 'See what an attacker sees', to: '/#platform' },
    { label: 'Cynapptics', product: 'cynapptics', desc: 'Threat intelligence your team can act on', to: '/#platform-cynapptics' },
    { label: 'Day 2 – SecOps', desc: 'Automated response and remediation', to: '/#platform-day2SecOps' },
    // Hidden until the platform section has CISORA content: its target (#platform-compaas) does not exist
    // { label: 'CISORA', desc: 'AI-enabled GRC platform', to: '/#platform-compaas' },

    // { label: 'How our Security Team works', desc: 'From alert to closure, around the clock', to: '/#soc' },
  ] },
  { label: 'Solutions', items: [
    { label: 'Operate', desc: 'We run it, day and night', to: '/#cap-operate' },
    { label: 'Test', desc: 'We test it like an attacker would', to: '/#cap-test' },
    { label: 'Comply', desc: 'We keep you audit-ready', to: '/#cap-comply' },
  ] },
  { label: 'Industries', items: INDUSTRIES.map(i => ({ label: i.name, desc: i.who, to: `/#industry-${i.id}` })) },
  { label: 'Company', items: [
    { label: 'About CYFY', desc: 'Our profile, services and leadership', to: '/about' },
    { label: 'Meet Our Team', desc: 'The people behind CYFY', to: '/meet-our-team' },
    { label: 'Partners', desc: '30+ OEM platform partnerships', to: '/#partners' },
    { label: 'Events', desc: 'CYFY at Cyber Dome 2025', to: '/events' },
    { label: 'Contact', desc: 'Email, phone and office address', to: '/about#contact' },
  ] },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [location.key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpenMenu(null); setMobileOpen(false); } };
    const onDown = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /** Top-level links are active on their own page; Home only when no section hash is targeted. */
  const isCurrent = (to: string) => location.pathname === to && !location.hash;

  const hoverOpenedAt = useRef(0);
  const open = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (openMenu !== label) hoverOpenedAt.current = Date.now();
    setOpenMenu(label);
  };
  // A click right after hover-open should not immediately close the menu
  const toggle = (label: string) => {
    if (openMenu === label && Date.now() - hoverOpenedAt.current < 500) return;
    setOpenMenu(openMenu === label ? null : label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  // No backdrop-filter while the mobile menu is open: it would become the containing block of the fixed menu panel.
  const headerBg = mobileOpen
    ? 'bg-bg-base border-border-base'
    : isScrolled ? 'bg-bg-base/85 backdrop-blur-xl border-border-base' : 'bg-transparent border-transparent';

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-[120] transition-[background-color,border-color] duration-300 border-b ${headerBg}`}
    >
      <nav className="shell max-w-[86rem] min-[1440px]:max-w-[92rem] flex h-16 md:h-[72px] items-center justify-between gap-4 xl:gap-6 whitespace-nowrap" aria-label="Main">
        <Link to="/" className="shrink-0" aria-label="CYFY home">
          <CyfyLogo imgClassName="h-11 md:h-12 xl:h-[46px] 2xl:h-[52px]" />
        </Link>

        <ul className="hidden xl:flex items-center xl:max-[1439px]:gap-2 min-[1440px]:max-[1535px]:gap-3 2xl:gap-4">
          {NAV.map(group => (
            <li key={group.label} className="relative" onMouseEnter={() => group.items && open(group.label)} onMouseLeave={() => group.items && scheduleClose()}>
              {group.items ? (
                <button
                  type="button"
                  aria-expanded={openMenu === group.label}
                  aria-haspopup="true"
                  onClick={() => toggle(group.label)}
                  className={`flex items-center gap-1 rounded-md px-2 py-2 text-[15px] transition-colors ${openMenu === group.label ? 'text-text-base' : 'text-text-muted hover:text-text-base'}`}
                >
                  {group.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === group.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              ) : (
                <Link
                  to={group.to!}
                  aria-current={isCurrent(group.to!) ? 'page' : undefined}
                  className={`block rounded-md px-2 py-2 text-[15px] transition-colors ${isCurrent(group.to!) ? 'relative text-text-base after:absolute after:inset-x-2 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand-ink' : 'text-text-muted hover:text-text-base'}`}
                >
                  {group.label}
                </Link>
              )}

              <AnimatePresence>
                {group.items && openMenu === group.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className={`absolute top-full pt-3 ${group.wide ? 'left-0' : 'left-1/2 -translate-x-1/2'}`}
                  >
                    <div className={`rounded-xl border border-border-base bg-surface p-2 shadow-2xl shadow-black/20 whitespace-normal ${group.wide ? 'w-[38rem] grid grid-cols-2 gap-x-2' : 'w-80'}`}>
                      {sections(group.items).map((sec, si) => (
                        <div key={sec.title ?? si} className={group.wide && !sec.title ? 'col-span-2 border-b border-border-base mb-1 pb-1' : ''}>
                          {sec.title && <p className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-amber-ink">{sec.title}</p>}
                          <ul>
                            {sec.items.map(item => (
                              <li key={item.label}>
                                <Link to={item.to} onClick={() => setOpenMenu(null)} className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-surface-2 transition-colors">
                                  <span>
                                    <span className="block text-sm font-medium text-text-base group-hover:text-brand-ink transition-colors">{item.product ? <ProductName id={item.product} /> : item.label}</span>
                                    {item.desc && <span className="block text-xs text-text-muted mt-0.5">{item.desc}</span>}
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-text-subtle opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Icon-only between 1280px and 1440px, where the full desktop menu leaves no room for the label */}
          {/* <a href={CONTACT.phoneHref} title="Report an incident" className="hidden md:inline-flex items-center gap-1.5 px-2 text-sm font-medium text-amber-ink hover:opacity-80 transition-opacity">
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="xl:max-[1439px]:sr-only">Report an incident</span>
          </a> */}
          <Link to="/#contact" className="hidden sm:inline-flex items-center rounded-lg bg-btn px-4 py-2.5 text-sm font-semibold text-white hover:bg-btn-hover transition-colors">
            Talk to a Security Expert
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-base text-text-base"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="xl:hidden fixed inset-x-0 top-16 md:top-[72px] bottom-0 bg-bg-base overflow-y-auto border-t border-border-base"
          >
            <ul className="shell py-4">
              {NAV.map(group => (
                <li key={group.label} className="border-b border-border-base">
                  {group.items ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileGroup === group.label}
                        onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                        className="flex w-full items-center justify-between py-4 text-base font-medium text-text-base"
                      >
                        {group.label}
                        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${mobileGroup === group.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      {mobileGroup === group.label && (
                        <div className="pb-3">
                          {sections(group.items).map((sec, si) => (
                            <div key={sec.title ?? si}>
                              {sec.title && <p className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-amber-ink">{sec.title}</p>}
                              <ul className="space-y-1">
                                {sec.items.map(item => (
                                  <li key={item.label}>
                                    <Link to={item.to} className="block rounded-lg px-3 py-2.5 hover:bg-surface-2">
                                      <span className="block text-sm font-medium text-text-base">{item.product ? <ProductName id={item.product} /> : item.label}</span>
                                      {item.desc && <span className="block text-xs text-text-muted">{item.desc}</span>}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to={group.to!} aria-current={isCurrent(group.to!) ? 'page' : undefined} className={`block py-4 text-base font-medium ${isCurrent(group.to!) ? 'text-brand-ink' : 'text-text-base'}`}>{group.label}</Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="shell pb-10 pt-2 flex flex-col gap-3">
              <Link to="/#contact" className="rounded-lg bg-btn py-3.5 text-center text-sm font-semibold text-white">Talk to a Security Expert</Link>
              {/* <a href={CONTACT.phoneHref} className="flex items-center justify-center gap-2 rounded-lg border border-border-strong py-3.5 text-sm font-medium text-amber-ink">
                <Phone className="w-4 h-4" aria-hidden="true" /> Report an incident: {CONTACT.phone}
              </a> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
