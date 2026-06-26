// Optional password gate for Vercel (works on the free/Hobby tier).
// It stays INERT until you set an env var SITE_PASSWORD in Vercel.
// When set, the site asks for a password via the browser's built-in login box.
// Username can be anything; password must match SITE_PASSWORD (e.g. gobears1).
export const config = { matcher: '/:path*' };

export default function middleware(req) {
  const PASS = process.env.SITE_PASSWORD;
  if (!PASS) return; // gate disabled unless SITE_PASSWORD is configured
  const auth = req.headers.get('authorization');
  if (auth) {
    try {
      const decoded = atob((auth.split(' ')[1]) || '');
      if (decoded.split(':')[1] === PASS) return; // correct password -> allow
    } catch (e) {}
  }
  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Cal Athletics BI"' },
  });
}
