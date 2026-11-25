/**
 * /api/interpret — AI giải đoán lá số (bản repo gốc không có route này).
 * Gọi API tương thích OpenAI (mặc định DeepSeek), trả về SSE dạng
 *   data: {"delta":{"text":"..."}}\n\n  ...  data: [DONE]\n\n
 * đúng định dạng mà components/InsightPanel.tsx đang đọc.
 *
 * Biến môi trường (chọn MỘT nhà cung cấp):
 *   ANTHROPIC_API_KEY — dùng Claude (ưu tiên nếu có). Model: ANTHROPIC_MODEL, mặc định claude-haiku-5-5
 *   DEEPSEEK_API_KEY  — dùng DeepSeek (hoặc AI_API_KEY cho API tương thích OpenAI khác)
 *   AI_BASE_URL       (tuỳ chọn)  mặc định https://api.deepseek.com
 *   AI_MODEL          (tuỳ chọn)  mặc định deepseek-chat
 *   DAILY_LIMIT       (tuỳ chọn)  số lượt hỏi / IP / ngày, mặc định 40
 */
import type { ZiweiChart } from '@/lib/ziwei/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GAN = '甲乙丙丁戊己庚辛壬癸';
const ZHI = '子丑寅卯辰巳午未申酉戌亥';

// ── Giới hạn lượt theo IP (bộ nhớ trong từng instance; đủ chặn spam cơ bản) ──
const hits = new Map<string, { day: string; n: number }>();
function allow(ip: string): boolean {
  const limit = Number(process.env.DAILY_LIMIT || 40);
  const day = new Date().toISOString().slice(0, 10);
  const h = hits.get(ip);
  if (!h || h.day !== day) { hits.set(ip, { day, n: 1 }); return true; }
  if (h.n >= limit) return false;
  h.n += 1;
  if (hits.size > 20000) hits.clear();
  return true;
}

function summarize(c: ZiweiChart): string {
  const b = c.birthInfo, l = c.lunarInfo;
  const o: string[] = [];
  o.push(`Giới tính: ${b.gender === 'female' ? 'Nữ' : 'Nam'} | Dương lịch: ${b.day}/${b.month}/${b.year} | Giờ sinh: ${ZHI[b.hour]} | Âm lịch: ${l.lunarDay}/${Math.abs(l.lunarMonth)}${l.isLeapMonth ? ' (nhuận)' : ''}/${l.lunarYear} (năm ${GAN[l.yearStem]}${ZHI[l.yearBranch]})`);
  if (l.fourPillars) o.push('Tứ trụ: ' + l.fourPillars.join(' '));
  o.push(`Cục: ${c.wuxingJuName} | Mệnh cung tại ${ZHI[c.mingGongBranch]} | Thân cung tại ${ZHI[c.shenGongBranch]}` +
    (c.mingZhu ? ` | Mệnh chủ: ${c.mingZhu}` : '') + (c.shenZhu ? ` | Thân chủ: ${c.shenZhu}` : '') +
    (c.yinYangGender ? ` | ${c.yinYangGender}` : '') + ` | Tuổi hiện tại: ${c.currentAge}`);
  o.push('12 cung (tên cung – can chi – đại hạn – sao; * = chính tinh):');
  for (const p of c.palaces || []) {
    const s = (p.stars || []).map(x =>
      x.name + (x.brightnessRaw ? `[${x.brightnessRaw}]` : '') + (x.siHua ? `(化${x.siHua})` : '') + (x.type === 'major' ? '*' : '')
    ).join(' ');
    o.push(`- ${p.name} ${GAN[p.stem]}${ZHI[p.branch]}` +
      (p.daXianAge ? ` [${p.daXianAge[0]}–${p.daXianAge[1]}]` : '') +
      (p.isMingGong ? ' (Mệnh)' : '') + (p.isShenGong ? ' (Thân)' : '') + (p.isCurrentDaXian ? ' (ĐẠI HẠN HIỆN TẠI)' : '') +
      `: ${s || 'không sao'}` + (p.isEmpty ? ` — vô chính diệu, mượn ${p.borrowedFromName || 'cung đối'}` : '') +
      (p.selfSihua?.length ? ` | tự hóa: ${p.selfSihua.map(m => m.starName + '化' + m.siHua).join(',')}` : ''));
  }
  const dx = (c.daXians || [])[c.currentDaXianIndex];
  if (dx) o.push(`Đại hạn hiện tại: ${dx.startAge}–${dx.endAge} tại cung ${dx.palaceName}` +
    (dx.siHua ? ` | Tứ hóa đại hạn (can ${dx.siHua.stemName}): ${dx.siHua.lu} hóa Lộc, ${dx.siHua.quan} hóa Quyền, ${dx.siHua.ke} hóa Khoa, ${dx.siHua.ji} hóa Kỵ` : ''));
  o.push(`Năm hiện tại: ${new Date().getFullYear()}`);
  return o.join('\n');
}

const SYSTEM = [
  'Bạn là chuyên gia Tử Vi Đẩu Số theo hệ phái Nghê Hải Hạ (《天纪》).',
  'Luôn trả lời HOÀN TOÀN bằng tiếng Việt, dùng tên Hán Việt cho sao và cung (Tử Vi, Thiên Phủ, Kình Dương, Hóa Kỵ, cung Phu thê…), không viết chữ Hán.',
  'Yêu cầu của người dùng có thể viết bằng tiếng Trung — hãy hiểu và làm theo, giữ cấu trúc tiêu đề **【...】** nhưng dịch tiêu đề sang tiếng Việt, ví dụ **【Định tính mệnh cách】**.',
  'Bám sát lá số được cung cấp, nêu cụ thể sao nào ở cung nào. Viết súc tích, mỗi mục 2–4 câu.',
  'Đây là tham khảo văn hóa truyền thống, không khẳng định tuyệt đối; với sức khỏe, khuyên đi khám bác sĩ khi cần.',
  'Chỉ trả lời các câu hỏi liên quan đến lá số và Tử Vi; câu hỏi ngoài chủ đề thì lịch sự từ chối.',
].join(' ');

function sseText(text: string, status = 200) {
  const body = `data: ${JSON.stringify({ delta: { text } })}\n\ndata: [DONE]\n\n`;
  return new Response(body, { status, headers: { 'Content-Type': 'text/event-stream; charset=utf-8' } });
}

function sseStream(upstream: Response, pick: (obj: any) => string | undefined) {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const reader = upstream.body!.getReader();
  return new ReadableStream({
    async start(ctl) {
      let buf = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop() || '';
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith('data:')) continue;
            const data = t.slice(5).trim();
            if (!data || data === '[DONE]') continue;
            try {
              const text = pick(JSON.parse(data));
              if (text) ctl.enqueue(enc.encode(`data: ${JSON.stringify({ delta: { text } })}\n\n`));
            } catch { /* bỏ qua dòng lỗi */ }
          }
        }
      } finally {
        ctl.enqueue(enc.encode('data: [DONE]\n\n'));
        ctl.close();
      }
    },
  });
}

export async function POST(req: Request) {
  const claudeKey = process.env.ANTHROPIC_API_KEY;
  const oaiKey = process.env.DEEPSEEK_API_KEY || process.env.AI_API_KEY;
  if (!claudeKey && !oaiKey) return sseText('Máy chủ chưa cấu hình API key cho AI (ANTHROPIC_API_KEY hoặc DEEPSEEK_API_KEY).');

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (!allow(ip)) return sseText('Bạn đã dùng hết lượt hỏi AI hôm nay. Hãy quay lại vào ngày mai nhé.');

  let chart: ZiweiChart; let messages: { role: 'user' | 'assistant'; content: string }[];
  try {
    const body = await req.json();
    chart = body.chart; messages = body.messages;
    if (!chart?.palaces || !Array.isArray(messages) || !messages.length) throw new Error();
  } catch { return new Response('Bad request', { status: 400 }); }

  // Giữ hội thoại gọn: tối đa 12 tin gần nhất, mỗi tin tối đa 4000 ký tự; phải bắt đầu bằng user
  let history = messages.slice(-12).map(m => ({
    role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
    content: String(m.content || '').slice(0, 4000),
  })).filter(m => m.content);
  while (history.length && history[0].role !== 'user') history = history.slice(1);
  if (!history.length) return new Response('Bad request', { status: 400 });

  const system = SYSTEM + '\n\nLÁ SỐ CỦA NGƯỜI XEM:\n' + summarize(chart);
  let upstream: Response | null;
  let pick: (obj: any) => string | undefined;

  if (claudeKey) {
    upstream = await fetch(`${(process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/+$/, '')}/v1/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': claudeKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5',
        max_tokens: 1500,
        stream: true,
        system,
        messages: history,
      }),
    }).catch(() => null);
    pick = o => (o.type === 'content_block_delta' && o.delta?.type === 'text_delta') ? o.delta.text : undefined;
  } else {
    const base = (process.env.AI_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
    upstream = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${oaiKey}` },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'deepseek-chat',
        stream: true,
        temperature: 0.7,
        max_tokens: 1500,
        messages: [{ role: 'system', content: system }, ...history],
      }),
    }).catch(() => null);
    pick = o => o.choices?.[0]?.delta?.content;
  }

  if (!upstream || !upstream.ok || !upstream.body) {
    const detail = upstream ? `${upstream.status}` : 'không kết nối được';
    return sseText(`AI đang lỗi (${detail}). Vui lòng thử lại sau.`);
  }

  return new Response(sseStream(upstream, pick), {
    headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache' },
  });
}
