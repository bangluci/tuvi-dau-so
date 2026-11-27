import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminToken, checkPassword } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Chống dò mật khẩu: tối đa 8 lần sai / 10 phút / IP (bộ nhớ từng instance)
const fails = new Map<string, { n: number; until: number }>();

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const back = (query: string) => NextResponse.redirect(new URL(`/admin${query}`, req.url), 303);

  const f = fails.get(ip);
  if (f && f.n >= 8 && f.until > Date.now()) return back('?err=locked');

  const form = await req.formData().catch(() => null);
  const password = String(form?.get('password') || '');
  await new Promise(r => setTimeout(r, 400));

  const token = adminToken();
  if (!token || !checkPassword(password)) {
    const cur = f && f.until > Date.now() ? f : { n: 0, until: Date.now() + 10 * 60_000 };
    fails.set(ip, { n: cur.n + 1, until: cur.until });
    if (fails.size > 5000) fails.clear();
    return back('?err=1');
  }
  fails.delete(ip);
  const res = back('');
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 7 * 24 * 3600,
  });
  return res;
}
