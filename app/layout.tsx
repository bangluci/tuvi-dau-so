import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Tử Vi Đẩu Số · Lập lá số',
  description: 'Lập lá số Tử Vi Đẩu Số theo hệ phái Nghê Hải Hạ, giao diện tiếng Việt, có AI giải đoán.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen">
        {children}
        {/* Dịch giao diện sang tiếng Việt khi hiển thị */}
        <Script src="/vi.js" strategy="beforeInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
