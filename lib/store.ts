/**
 * Lưu phiên xem lá số (thông tin lá số + hỏi đáp với AI) vào Redis của Upstash qua REST.
 * Biến môi trường do Vercel Marketplace (Upstash for Redis) tự thêm:
 *   KV_REST_API_URL, KV_REST_API_TOKEN  (hoặc UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)
 * Chưa có biến môi trường thì mọi hàm ở đây bỏ qua, web vẫn chạy bình thường.
 * Không lưu địa chỉ IP.
 */

export interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
  /** Câu lệnh tự động của giao diện (bấm tab, bấm cung), không phải người dùng gõ */
  hidden?: boolean;
}

export interface StoredBirth {
  year: number;
  month: number;
  day: number;
  /** Chỉ số địa chi của giờ sinh: 0 = Tý … 11 = Hợi */
  hour: number;
  gender: 'male' | 'female';
  name?: string;
  province?: string;
  city?: string;
}

export interface StoredSession {
  id: string;
  createdAt: number;
  updatedAt: number;
  birth: StoredBirth;
  /** Tóm tắt lá số: chi của cung Mệnh, chính tinh cung Mệnh (tên gốc), tên cục (gốc) */
  chart: { mingBranch: number; mingStars: string[]; ju: string };
  messages: StoredMessage[];
  /** Số câu người dùng tự gõ */
  asked: number;
}

const KEY = (id: string) => `tv:s:${id}`;
const INDEX = 'tv:sessions';
const TTL_SECONDS = 180 * 24 * 3600; // giữ 180 ngày
const MAX_SESSIONS = 2000;      // quá số này thì xóa phiên cũ nhất
const MAX_MESSAGES = 80;
const MAX_CHARS = 12000;
const MAX_SESSION_BYTES = 120_000; // trần dung lượng mỗi phiên, để database miễn phí không bị đầy

function conn() {
  const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '').replace(/\/+$/, '');
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  return url && token ? { url, token } : null;
}

export function storeEnabled(): boolean {
  return conn() !== null;
}

async function pipeline(cmds: (string | number)[][]): Promise<unknown[]> {
  const c = conn();
  if (!c) throw new Error('store not configured');
  const res = await fetch(`${c.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${c.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis HTTP ${res.status}`);
  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map(d => {
    if (d.error) throw new Error(`redis: ${d.error}`);
    return d.result;
  });
}

function parse(raw: unknown): StoredSession | null {
  if (typeof raw !== 'string') return null;
  try { return JSON.parse(raw) as StoredSession; } catch { return null; }
}

/** Ghi (hoặc cập nhật) một phiên. Lỗi lưu trữ không được làm hỏng câu trả lời cho người dùng. */
export async function saveSession(input: Omit<StoredSession, 'createdAt' | 'updatedAt' | 'asked'>): Promise<void> {
  if (!storeEnabled()) return;
  try {
    const now = Date.now();
    const [old] = await pipeline([['GET', KEY(input.id)]]);
    let messages: StoredMessage[] = input.messages.slice(-MAX_MESSAGES).map(m => ({
      role: m.role,
      content: String(m.content || '').slice(0, MAX_CHARS),
      ...(m.hidden ? { hidden: true } : {}),
    }));
    // Phiên quá dài thì bỏ bớt tin cũ nhất
    while (messages.length > 2 && JSON.stringify(messages).length > MAX_SESSION_BYTES) messages = messages.slice(2);
    const session: StoredSession = {
      ...input,
      messages,
      createdAt: parse(old)?.createdAt ?? now,
      updatedAt: now,
      asked: messages.filter(m => m.role === 'user' && !m.hidden).length,
    };
    const res = await pipeline([
      ['SET', KEY(input.id), JSON.stringify(session), 'EX', TTL_SECONDS],
      ['ZADD', INDEX, now, input.id],
      ['ZRANGE', INDEX, 0, -(MAX_SESSIONS + 1)],
    ]);
    const stale = (res[2] as string[] | null) || [];
    if (stale.length) {
      await pipeline([['DEL', ...stale.map(KEY)], ['ZREM', INDEX, ...stale]]);
    }
  } catch (e) {
    console.error('[store] save failed', e instanceof Error ? e.message : e);
  }
}

export async function listSessions(offset: number, limit: number): Promise<{ total: number; sessions: StoredSession[] }> {
  const [ids, total] = (await pipeline([
    ['ZREVRANGE', INDEX, offset, offset + limit - 1],
    ['ZCARD', INDEX],
  ])) as [string[], number];
  if (!ids?.length) return { total: Number(total) || 0, sessions: [] };
  const [raws] = (await pipeline([['MGET', ...ids.map(KEY)]])) as [unknown[]];
  return { total: Number(total) || 0, sessions: raws.map(parse).filter((s): s is StoredSession => s !== null) };
}

export async function getSession(id: string): Promise<StoredSession | null> {
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(id)) return null;
  const [raw] = await pipeline([['GET', KEY(id)]]);
  return parse(raw);
}
