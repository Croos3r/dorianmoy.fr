import { next } from '@vercel/edge'

// Runs before the filesystem, so it can content-negotiate the homepage (a
// static index.html) — which vercel.json rewrites cannot, as they are
// evaluated only after static files are matched.
export const config = { matcher: '/' }

export default async function middleware(request: Request): Promise<Response> {
  const accept = request.headers.get('accept') ?? ''

  // Browsers (Accept: text/html, */*) fall through to the HTML SPA.
  if (!accept.includes('text/markdown')) return next()

  // Agents asking for markdown get the pre-rendered /index.md instead.
  const md = await fetch(new URL('/index.md', request.url))
  const body = await md.text()

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(body.length / 4)),
      'vary': 'Accept',
    },
  })
}
