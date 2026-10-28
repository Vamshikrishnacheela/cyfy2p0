import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
import {SERVICES} from './src/constants';

/**
 * Emits robots.txt and sitemap.xml at build time. The site URL comes from SITE_URL, else Netlify's URL
 * (the site's primary address, set automatically during Netlify builds). The draft legal pages are left
 * out of the sitemap because they are marked noindex until CYFY approves them.
 */
function seoFiles(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  const routes = ['/', '/about', '/meet-our-team', '/events', ...SERVICES.map(s => `/service/${s.slug}`)];
  return {
    name: 'cyfy-seo-files',
    apply: 'build',
    generateBundle() {
      const urls = routes.map(r => `  <url><loc>${base}${r}</loc></url>`).join('\n');
      this.emitFile({type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`});
      this.emitFile({type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`});
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.SITE_URL || process.env.URL || 'https://cyfytestweb.netlify.app')],
    define: {
      // Inlined into the client bundle, so it is public. Leave GEMINI_API_KEY unset for public deployments
      // (the assistant then runs in offline mode) until Gemini calls go through a server-side proxy.
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
