import { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import { CustomCursor } from './components/CustomCursor';
import TrustStrip from './components/home/TrustStrip';
import WhyCyfy from './components/home/WhyCyfy';
import Coverage from './components/home/Coverage';
import HowItWorks from './components/home/HowItWorks';
import SocSection from './components/home/SocSection';
import Capabilities from './components/home/Capabilities';
import ProductEcosystem from './components/home/ProductEcosystem';
import CustomerProof from './components/home/CustomerProof';
import Industries from './components/home/Industries';
import PartnersPlatforms from './components/home/PartnersPlatforms';
import LeadCta from './components/home/LeadCta';
import { usePageMeta } from './lib/usePageMeta';

// Loaded on first open, so the Gemini SDK stays out of the initial bundle
const ChatBot = lazy(() => import('./components/ChatBot'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const MeetOurTeamPage = lazy(() => import('./pages/MeetOurTeamPage'));

function NotFound() {
  usePageMeta({ title: 'Page not found | CYFY', description: 'The page you were looking for does not exist on the CYFY website.', noindex: true });
  return (
    <div className="shell min-h-[70vh] flex flex-col items-center justify-center text-center pt-28">
      <p className="font-mono text-sm text-amber-ink">404</p>
      <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
      <Link to="/" className="mt-6 rounded-lg bg-btn px-5 py-3 text-sm font-semibold text-white hover:bg-btn-hover transition-colors">Back to home</Link>
    </div>
  );
}

/** Scrolls to top on route change, or to the element named by the URL hash (e.g. /#industries). */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const prevPathname = useRef<string | null>(null);
  useEffect(() => {
    const samePage = prevPathname.current === pathname;
    prevPathname.current = pathname;
    if (!hash) {
      // Re-selecting the current page (e.g. Home while on the homepage) glides back to the top
      const smooth = samePage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // Glide within the current page; arriving from another page (or with reduced motion) jumps straight there
    const behavior: ScrollBehavior = samePage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto';
    // Lazily loaded pages render their sections a little later, so retry for up to ~3s
    let raf = 0;
    const deadline = performance.now() + 3000;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior, block: 'start' });
      else if (performance.now() < deadline) raf = requestAnimationFrame(tryScroll);
    };
    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);
  return null;
}

function HomePage() {
  usePageMeta({
    title: 'CYFY - 24/7 Network and Security Operations',
    description: 'CYFY designs, secures and runs network and security operations for enterprises: 24/7 SOC and NOC, threat intelligence and audit-ready GRC from an ISO/IEC 27001:2022 certified organization.',
  });
  return (
    <>
      <section id="home" aria-label="Introduction">
        <Hero />
      </section>
      <TrustStrip />
      <WhyCyfy />
      <Coverage />
      <HowItWorks />
      <SocSection />
      <Capabilities />
      <ProductEcosystem />
      <PartnersPlatforms />
      <CustomerProof />
      <Industries />
      <LeadCta />
    </>
  );
}

/** The homepage ends with its own lead CTA; other pages keep the newsletter sign-up. */
function NewsletterOffHome() {
  const { pathname } = useLocation();
  return pathname === '/' ? null : <Newsletter />;
}

export default function App() {
  const [showChat, setShowChat] = useState(false);
  const closeChat = useCallback(() => setShowChat(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollManager />
        <div className="min-h-screen bg-bg-base text-text-base selection:bg-primary/30">
          {/* Custom CYFY Interactive Cursor */}
          <CustomCursor />

          <Navbar />

          <main>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                />
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/meet-our-team" element={<MeetOurTeamPage />} />
                <Route path="/service/:slug" element={<ServiceDetailPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <NewsletterOffHome />
          <Footer />

          {/* Floating Chat Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(true)}
            aria-label="Open CYFY assistant chat"
            aria-expanded={showChat}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[110] bg-btn text-white p-4 rounded-full shadow-lg flex items-center justify-center group"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>

          <AnimatePresence>
            {showChat && <Suspense fallback={null}><ChatBot onClose={closeChat} /></Suspense>}
          </AnimatePresence>
        </div>
      </Router>
    </MotionConfig>
  );
}
