import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Per-route title, description, canonical URL and robots directive. Every routed page calls this,
 * so values never leak from one page to the next. index.html carries the homepage defaults for crawlers without JS.
 */
export function usePageMeta({ title, description, noindex = false }: { title: string; description: string; noindex?: boolean }) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');

    const url = window.location.origin + pathname;
    setMeta('property', 'og:url', url);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, noindex, pathname]);
}
