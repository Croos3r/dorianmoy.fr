import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

const SITE_URL = 'https://dorianmoy.fr'

// Canonical, indexable URLs for the site. Add new public pages here as they
// ship — the sitemap is regenerated on every build so lastmod stays current.
const CANONICAL_PATHS: { path: string; changefreq: string; priority: string }[] = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
]

// Emits /sitemap.xml at build time so <lastmod> reflects the publish date.
function sitemap(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = CANONICAL_PATHS.map(
        ({ path, changefreq, priority }) =>
          `  <url>\n` +
          `    <loc>${SITE_URL}${path}</loc>\n` +
          `    <lastmod>${lastmod}</lastmod>\n` +
          `    <changefreq>${changefreq}</changefreq>\n` +
          `    <priority>${priority}</priority>\n` +
          `  </url>`,
      ).join('\n')

      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `${urls}\n` +
        `</urlset>\n`

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), sitemap()],
})
