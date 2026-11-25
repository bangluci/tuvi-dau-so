# Tử Vi Đẩu Số · Lập lá số (tiếng Việt)

Web lập lá số Tử Vi Đẩu Số theo hệ phái Nghê Hải Hạ, giao diện tiếng Việt, có AI giải đoán.

Dựa trên engine mã nguồn mở [Renhuai123/ziwei-doushu](https://github.com/Renhuai123/ziwei-doushu) (MIT). Phần thêm vào:

- `public/vi.js` — dịch giao diện sang tiếng Việt (tên cung, sao, Tứ Hóa, form…)
- `app/api/interpret/route.ts` — AI giải đoán qua DeepSeek (API tương thích OpenAI), có giới hạn lượt theo IP
- Trang chủ `/` là trang lập lá số

## Chạy local

```bash
npm ci
cp .env.example .env.local   # điền DEEPSEEK_API_KEY
npm run dev                  # http://localhost:3000
```

## Deploy lên Vercel

1. Import repo này vào Vercel (framework: Next.js, giữ mặc định).
2. Settings → Environment Variables: thêm `DEEPSEEK_API_KEY`.
3. Deploy.

Lưu ý: giờ sinh nhập theo **giờ Bắc Kinh = giờ Việt Nam + 1 tiếng**; người sinh ở Việt Nam chọn nơi sinh "Trùng Khánh" và quận có ghi chú kinh độ gần nhất.
