import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Plus } from 'lucide-react';
import { CAPABILITY_TABS, type Capability } from '../../homeContent';
import SolutionDetailModal from './SolutionDetailModal';
import { SectionHeader, useHashSelect } from './ui';
import { enquiryHref, type EnquiryInterest } from '../../constants';

// The enquiry link in the Learn More detail preselects the matching topic in the enquiry form
const TAB_INTEREST: Record<string, EnquiryInterest> = { 'network-infrastructure': 'architecture', cybersecurity: 'architecture', 'manage-security-services': 'managed-soc' };
const LEARN_MORE_CLS = 'inline-flex items-center gap-1.5 text-sm font-medium transition-opacity';

export default function Capabilities() {
  const [tabId, setTabId] = useState(CAPABILITY_TABS[0].id);
  const [open, setOpen] = useState<string | null>(null);
  // Which Learn More detail is showing: the whole category, or one of its cards
  const [detail, setDetail] = useState<{ item?: Capability } | null>(null);
  const tab = CAPABILITY_TABS.find(t => t.id === tabId)!;

  const selectTab = (id: string) => { setTabId(id); setOpen(null); };
  useHashSelect('cap', CAPABILITY_TABS.map(t => t.id), selectTab);

  return (
    <section id="capabilities" className="scene scene-glow py-20 md:py-28">
      <div className="shell">
        <SectionHeader eyebrow="Capabilities" title={<>Everything your network and security need, run by one team.</>} />

        <div role="tablist" aria-label="Capability areas" className="flex flex-col min-[420px]:flex-row gap-1 overflow-x-auto border-b border-border-base mb-8">
          {CAPABILITY_TABS.map(t => (
            <button
              key={t.id}
              id={`cap-${t.id}`}
              type="button"
              role="tab"
              aria-selected={t.id === tabId}
              aria-controls="cap-panel"
              onClick={() => selectTab(t.id)}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-1.5 min-[360px]:px-2.5 sm:px-4 py-3 text-[13px] leading-tight sm:text-sm uppercase text-left md:whitespace-nowrap font-medium transition-colors scroll-mt-28 ${t.id === tabId ? 'text-text-base' : 'text-text-muted hover:text-text-base'}`}
            >
              {/* Hidden on phones, where the tabs stack or wrap to fit without a sideways scroll; the panel below still shows the icon */}
              <t.icon className="hidden min-[480px]:block w-4 h-4 shrink-0" aria-hidden="true" />
              {t.label}
              {t.id === tabId && <motion.span layoutId="cap-underline" className="absolute inset-x-2 -bottom-px h-0.5 bg-gradient-to-r from-brand-ink to-amber-ink" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            id="cap-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid lg:grid-cols-[0.85fr_2fr] overflow-hidden rounded-2xl border border-border-base"
          >
            <div className="band relative p-7 md:p-8 flex flex-col min-h-[16rem]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[#1a1206]">
                <tab.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{tab.lead.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-band-muted">{tab.lead.body}</p>
              <button type="button" onClick={() => setDetail({})} className={`${LEARN_MORE_CLS} relative z-10 mt-5 self-start text-secondary hover:opacity-80`}>
                Learn More <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-secondary/15 blur-3xl pointer-events-none" aria-hidden="true" />
            </div>

            <ul className="grid sm:grid-cols-2 gap-px bg-border-base">
              {tab.items.map(item => {
                const isOpen = open === item.title;
                return (
                  <li key={item.title} className={`group p-6 transition-colors ${isOpen ? 'bg-surface-2' : 'bg-surface hover:bg-surface-2'} ${tab.items.length % 2 && item === tab.items[tab.items.length - 1] ? 'sm:col-span-2' : ''}`}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : item.title)}
                      className="flex w-full items-start justify-between gap-3 text-left"
                    >
                      <span>
                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${isOpen ? 'border-brand-ink text-brand-ink' : 'border-border-base text-text-muted group-hover:border-brand-ink group-hover:text-brand-ink'}`}>
                          <item.icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <span className="mt-4 block font-semibold">{item.title}</span>
                      </span>
                      <Plus className={`w-4 h-4 mt-1 shrink-0 text-text-subtle transition-transform ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true" />
                    </button>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
                    <AnimatePresence initial={false}>
                      {isOpen && (item.plain || item.details) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden text-sm leading-relaxed text-text-base"
                        >
                          {item.plain && <p className="mt-3 border-l-2 border-amber-ink pl-3">In plain terms: {item.plain}</p>}
                          {item.details && (
                            <ul className="mt-3 space-y-1.5 border-l-2 border-amber-ink pl-3">
                              {item.details.map(d => <li key={d}>{d}</li>)}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {item.href ? (
                      <Link to={item.href} className={`${LEARN_MORE_CLS} mt-4 text-brand-ink ${isOpen ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                        Learn More <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    ) : (
                      <button type="button" onClick={() => setDetail({ item })} className={`${LEARN_MORE_CLS} mt-4 text-brand-ink ${isOpen ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                        Learn More <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      {createPortal(
        <AnimatePresence>
          {detail && (
            <SolutionDetailModal
              tab={tab}
              item={detail.item}
              enquiryTo={enquiryHref(detail.item?.interest ?? TAB_INTEREST[tab.id] ?? 'other')}
              onClose={() => setDetail(null)}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
