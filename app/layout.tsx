import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: '168 Hours - Life Time Planner',
  description: 'Visualize and design how you spend the 168 hours in your week.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden" suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
