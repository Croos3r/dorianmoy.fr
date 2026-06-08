import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

const SITE_URL = 'https://dorianmoy.fr'

// Canonical, indexable URLs for the site. Add new public pages here as they
// ship — the sitemap is regenerated on every build so lastmod stays current.
// `image` is an optional absolute URL surfaced via the image sitemap extension.
const CANONICAL_PATHS: {
  path: string
  changefreq: string
  priority: string
  image?: string
}[] = [
  { path: '/', changefreq: 'monthly', priority: '1.0', image: `${SITE_URL}/logo.png` },
]

// Emits /sitemap.xml at build time so <lastmod> reflects the publish date.
function sitemap(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = CANONICAL_PATHS.map(({ path, changefreq, priority, image }) => {
        const imageEntry = image
          ? `\n    <image:image>\n` +
            `      <image:loc>${image}</image:loc>\n` +
            `    </image:image>`
          : ''
        return (
          `  <url>\n` +
          `    <loc>${SITE_URL}${path}</loc>\n` +
          `    <lastmod>${lastmod}</lastmod>\n` +
          `    <changefreq>${changefreq}</changefreq>\n` +
          `    <priority>${priority}</priority>` +
          `${imageEntry}\n` +
          `  </url>`
        )
      }).join('\n')

      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
        `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
        `${urls}\n` +
        `</urlset>\n`

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), sitemap()],
  // Compile vue-i18n messages with JIT (AST interpretation) instead of the
  // default code-gen path, which evaluates messages via new Function() (eval).
  // The production CSP (vercel.json) omits 'unsafe-eval', so the eval path
  // throws on every translated string and the app renders blank. JIT is the
  // CSP-safe path; the flag defaults to false in the bundler build, so it must
  // be set explicitly here.
  define: {
    __INTLIFY_JIT_COMPILATION__: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Split large, rarely-changing vendor deps into a separate chunk so
        // they cache independently of app code and shrink the main bundle.
        manualChunks: {
          vendor: ['vue', 'vue-i18n', '@vercel/analytics'],
        },
      },
    },
  },
})
