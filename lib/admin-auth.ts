/**
 * Khóa trang quản trị bằng mật khẩu ADMIN_KEY (biến môi trường, tối thiểu 8 ký tự).
 * Đăng nhập đúng thì đặt cookie httpOnly chứa mã băm; không lưu mật khẩu ở trình duyệt.
 */
import { createHash, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE = 'tv_admin';

function key(): string | null {
  const k = (process.env.ADMIN_KEY || '').trim();
  return k.length >= 8 ? k : null;
}

const sha = (v: string) => createHash('sha256').update(v).digest();

export function adminConfigured(): boolean {
  return key() !== null;
}

export function checkPassword(input: string): boolean {
  const k = key();
  return !!k && timingSafeEqual(sha(`pw:${input}`), sha(`pw:${k}`));
}

export function adminToken(): string | null {
  const k = key();
  return k ? sha(`tv-admin-cookie:${k}`).toString('hex') : null;
}

export function isAdmin(cookieValue: string | undefined): boolean {
  const t = adminToken();
  if (!t || !cookieValue || cookieValue.length !== t.length) return false;
  return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(t));
}
