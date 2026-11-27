import { cookies } from 'next/headers';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { ADMIN_COOKIE, adminConfigured, isAdmin } from '@/lib/admin-auth';
import { getSession, listSessions, storeEnabled, type StoredSession } from '@/lib/store';
import { CHI_VI, JU_VI, MAJOR_STAR_VI, autoPromptLabel } from '@/lib/vi-names';

/**
 * Trang quản trị: xem các phiên lập lá số (thông tin lá số + hỏi đáp với AI).
 * Khóa bằng mật khẩu ADMIN_KEY. Không hiển thị và không lưu địa chỉ IP.
 */
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Quản trị · Tử Vi Đẩu Số', robots: { index: false, follow: false } };

const PAGE_SIZE = 30;

const S: Record<string, CSSProperties> = {
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '28px 16px 60px', color: '#e8eef6', fontSize: 15, lineHeight: 1.6 },
  h1: { fontSize: 24, fontWeight: 700, margin: 0 },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 20 },
  mute: { color: '#93a0bd' },
  th: { textAlign: 'left', padding: '10px 12px', fontSize: 13, color: '#93a0bd', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.12)', whiteSpace: 'nowrap' },
  td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', verticalAlign: 'top' },
  btn: { minHeight: 42, padding: '0 16px', borderRadius: 10, border: '1px solid rgba(212,168,67,0.5)', background: 'rgba(212,168,67,0.14)', color: '#f0d48a', cursor: 'pointer', fontSize: 15 },
  input: { minHeight: 44, padding: '0 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.05)', color: '#e8eef6', fontSize: 16, width: '100%' },
  link: { color: '#f0d48a', textDecoration: 'none' },
  code: { background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 6, fontSize: 13.5 },
};

const fmtTime = (ms: number) =>
  new Date(ms).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh', hour12: false,
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

const birthDate = (s: StoredSession) => `${s.birth.day}/${s.birth.month}/${s.birth.year}`;
const birthHour = (s: StoredSession) => `giờ ${CHI_VI[s.birth.hour] ?? '?'}`;
const place = (s: StoredSession) =>
  [s.birth.city, s.birth.province].filter((v, i, a) => v && a.indexOf(v) === i).join(', ') || '—';
const ming = (s: StoredSession) => {
  const stars = (s.chart?.mingStars || []).map(n => MAJOR_STAR_VI[n] || n).join(', ') || 'Vô chính diệu';
  return `${stars} (tại ${CHI_VI[s.chart?.mingBranch] ?? '?'})`;
};

function Shell({ children, authed }: { children: ReactNode; authed?: boolean }) {
  return (
    <main style={S.wrap}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <h1 style={S.h1}>Quản trị · Tử Vi Đẩu Số</h1>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Link href="/" style={S.link}>← Về trang lập lá số</Link>
          {authed && (
            <form method="post" action="/api/admin/logout">
              <button type="submit" style={{ ...S.btn, minHeight: 36, fontSize: 14 }}>Đăng xuất</button>
            </form>
          )}
        </div>
      </header>
      {children}
    </main>
  );
}

function Detail({ s }: { s: StoredSession }) {
  return (
    <>
      <p style={{ margin: '0 0 14px' }}><Link href="/admin" style={S.link}>← Danh sách</Link></p>
      <section style={{ ...S.card, marginBottom: 18 }}>
        <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 6 }}>{s.birth.name || 'Không ghi tên'}</div>
        <div>
          {s.birth.gender === 'female' ? 'Nữ' : 'Nam'} · sinh {birthDate(s)} · {birthHour(s)} · {place(s)}
        </div>
        <div style={S.mute}>
          Mệnh: {ming(s)} · {JU_VI[s.chart?.ju] || s.chart?.ju || ''}
        </div>
        <div style={{ ...S.mute, fontSize: 13, marginTop: 6 }}>
          Lập lúc {fmtTime(s.createdAt)} · hoạt động cuối {fmtTime(s.updatedAt)} · {s.asked} câu tự hỏi
        </div>
      </section>
      <div style={{ display: 'grid', gap: 12 }}>
        {s.messages.map((m, i) =>
          m.role === 'user' ? (
            m.hidden ? (
              <div key={i} style={{ ...S.mute, fontSize: 13 }}>▸ {autoPromptLabel(m.content)}</div>
            ) : (
              <div key={i} style={{ ...S.card, borderColor: 'rgba(212,168,67,0.4)', background: 'rgba(212,168,67,0.08)' }}>
                <div style={{ fontSize: 12.5, color: '#f0d48a', marginBottom: 4 }}>Người dùng hỏi</div>
                <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{m.content}</div>
              </div>
            )
          ) : (
            <div key={i} style={S.card}>
              <div style={{ ...S.mute, fontSize: 12.5, marginBottom: 4 }}>AI trả lời</div>
              <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{m.content}</div>
            </div>
          ),
        )}
      </div>
    </>
  );
}

function List({ sessions, total, page }: { sessions: StoredSession[]; total: number; page: number }) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  return (
    <>
      <p style={{ ...S.mute, margin: '0 0 12px' }}>
        {total} lá số đã lưu (giữ 180 ngày, tối đa 2.000 phiên gần nhất). Không lưu địa chỉ IP.
      </p>
      {sessions.length === 0 ? (
        <div style={S.card}>Chưa có dữ liệu. Khi có người lập lá số và AI trả lời, phiên sẽ hiện ở đây.</div>
      ) : (
        <div style={{ ...S.card, padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead>
              <tr>
                <th style={S.th}>Thời gian</th>
                <th style={S.th}>Tên</th>
                <th style={S.th}>Ngày giờ sinh</th>
                <th style={S.th}>Giới tính</th>
                <th style={S.th}>Nơi sinh</th>
                <th style={S.th}>Cung Mệnh</th>
                <th style={{ ...S.th, textAlign: 'right' }}>Câu hỏi</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(s => (
                <tr key={s.id}>
                  <td style={{ ...S.td, whiteSpace: 'nowrap' }}>
                    <Link href={`/admin?id=${encodeURIComponent(s.id)}`} style={S.link}>{fmtTime(s.updatedAt)}</Link>
                  </td>
                  <td style={S.td}>{s.birth.name || <span style={S.mute}>—</span>}</td>
                  <td style={{ ...S.td, whiteSpace: 'nowrap' }}>{birthDate(s)} · {birthHour(s)}</td>
                  <td style={S.td}>{s.birth.gender === 'female' ? 'Nữ' : 'Nam'}</td>
                  <td style={S.td}>{place(s)}</td>
                  <td style={S.td}>{ming(s)}</td>
                  <td style={{ ...S.td, textAlign: 'right' }}>{s.asked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pages > 1 && (
        <nav style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 18 }}>
          {page > 1 ? <Link href={`/admin?p=${page - 1}`} style={S.link}>← Mới hơn</Link> : <span style={S.mute}>← Mới hơn</span>}
          <span style={S.mute}>Trang {page}/{pages}</span>
          {page < pages ? <Link href={`/admin?p=${page + 1}`} style={S.link}>Cũ hơn →</Link> : <span style={S.mute}>Cũ hơn →</span>}
        </nav>
      )}
    </>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ p?: string; id?: string; err?: string }> }) {
  const sp = await searchParams;

  if (!adminConfigured()) {
    return (
      <Shell>
        <div style={S.card}>
          Chưa đặt mật khẩu quản trị. Trên Vercel, thêm biến môi trường <code style={S.code}>ADMIN_KEY</code> (tối
          thiểu 8 ký tự) rồi Redeploy.
        </div>
      </Shell>
    );
  }

  const jar = await cookies();
  if (!isAdmin(jar.get(ADMIN_COOKIE)?.value)) {
    return (
      <Shell>
        <form method="post" action="/api/admin/login" style={{ ...S.card, maxWidth: 420, display: 'grid', gap: 12 }}>
          <label htmlFor="pw">Mật khẩu quản trị</label>
          <input id="pw" name="password" type="password" required autoComplete="current-password" style={S.input} />
          {sp.err === '1' && <div style={{ color: '#ff9a9a' }}>Sai mật khẩu.</div>}
          {sp.err === 'locked' && <div style={{ color: '#ff9a9a' }}>Sai quá nhiều lần. Thử lại sau 10 phút.</div>}
          <button type="submit" style={S.btn}>Đăng nhập</button>
        </form>
      </Shell>
    );
  }

  if (!storeEnabled()) {
    return (
      <Shell authed>
        <div style={S.card}>
          Chưa kết nối database nên chưa lưu được gì. Trên Vercel, vào tab Storage của project, tạo một database
          Redis của Upstash (gói miễn phí) và kết nối vào project. Vercel sẽ tự thêm{' '}
          <code style={S.code}>KV_REST_API_URL</code> và <code style={S.code}>KV_REST_API_TOKEN</code>. Sau đó Redeploy.
        </div>
      </Shell>
    );
  }

  try {
    if (sp.id) {
      const s = await getSession(sp.id);
      return <Shell authed>{s ? <Detail s={s} /> : <div style={S.card}>Không tìm thấy phiên này (có thể đã hết hạn).</div>}</Shell>;
    }
    const page = Math.max(1, Math.floor(Number(sp.p)) || 1);
    const { sessions, total } = await listSessions((page - 1) * PAGE_SIZE, PAGE_SIZE);
    return <Shell authed><List sessions={sessions} total={total} page={page} /></Shell>;
  } catch (e) {
    return (
      <Shell authed>
        <div style={S.card}>Không đọc được database: {e instanceof Error ? e.message : 'lỗi không rõ'}.</div>
      </Shell>
    );
  }
}
