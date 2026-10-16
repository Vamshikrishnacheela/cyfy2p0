import { useState, useEffect, type ReactNode } from 'react';
import { BLOG_POSTS as STATIC_BLOGS } from '../constants';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { BlogPost } from '../types';
import { ArrowUpRight, Newspaper, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, SectionHeader } from './home/ui';

const RESOURCE_LINKS = [
  { icon: Newspaper, label: 'Threat intelligence', desc: 'Actively exploited CVEs and advisories', to: '/#platform-cynapptics' },
  { icon: Users, label: 'Customer stories', desc: 'Results from regulated teams', to: '/#customers' },
];

const cardCls = 'group h-full flex flex-col rounded-2xl border border-border-base bg-surface overflow-hidden transition-all duration-300';

/** A post opens its own external link when it has one; posts without a link are shown as plain cards. */
function PostCard({ link, children }: { link?: string; children: ReactNode }) {
  return link
    ? <a href={link} target="_blank" rel="noopener noreferrer" className={`${cardCls} hover:-translate-y-1 hover:border-border-strong hover:shadow-xl hover:shadow-black/10`}>{children}</a>
    : <article className={cardCls}>{children}</article>;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>(STATIC_BLOGS.slice(0, 3) as BlogPost[]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        const fbBlogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];

        if (fbBlogs.length > 0) {
          const combined = [...fbBlogs, ...STATIC_BLOGS.filter(s => !fbBlogs.find(f => f.title === s.title))];
          setBlogs(combined.slice(0, 3) as BlogPost[]);
        }
      } catch (error) {
        console.error("Error fetching blogs from Firebase:", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section id="resources" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          eyebrow="Resources"
          title="Security insights and threat updates."
        />

        <div className="grid md:grid-cols-3 gap-5">
          {blogs.map((post, index) => (
            <Reveal key={post.id || post.title} delay={index * 0.08}>
              <PostCard link={post.link}>
                <div className="aspect-[16/9] overflow-hidden bg-surface-2">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-amber-ink">{post.category}</span>
                    <time className="text-text-subtle">{post.date}</time>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-brand-ink transition-colors">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-3">{post.excerpt}</p>
                  {post.link && (
                    <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-ink">
                      Read more <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                  )}
                </div>
              </PostCard>
            </Reveal>
          ))}
        </div>

        <ul className="mt-6 grid sm:grid-cols-2 gap-3">
          {RESOURCE_LINKS.map(r => (
            <li key={r.label}>
              <Link to={r.to} className="group flex items-center gap-3 rounded-xl border border-border-base bg-surface-2 px-4 py-3.5 transition-colors hover:border-brand-ink">
                <r.icon className="w-5 h-5 text-brand-ink shrink-0" aria-hidden="true" />
                <span className="flex-1">
                  <span className="block text-sm font-medium">{r.label}</span>
                  <span className="block text-xs text-text-muted">{r.desc}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-text-subtle transition-colors group-hover:text-brand-ink" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
