'use client';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/ThemeProvider';

// Chỉ render phía trình duyệt để bản dịch tiếng Việt không gây lệch hydration
const ChartApp = dynamic(() => import('@/components/ChartApp'), { ssr: false });

export default function Home() {
  return (
    <ThemeProvider>
      <ChartApp />
    </ThemeProvider>
  );
}
