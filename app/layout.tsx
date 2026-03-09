import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: '168 Hours - Life Time Planner',
  description: 'Visualize and design how you spend the 168 hours in your week.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-50 min-h-screen selection:bg-orange-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
