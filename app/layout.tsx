import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movie Researcher',
  description: 'Application to search for movies, tv series and people.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Navbar />
        <p className='text-center my-10 text-xl font-bold tracking-wider'>This project is in progress.</p>
        {/* <input
          placeholder='Search by title... lupa a jak fokus to przyciemnienie reszty'
          className='bg-white w-[100vw] py-4 text-2xl text-center border-b-2 tracking-widest'
        /> */}
        <NuqsAdapter>{children}</NuqsAdapter>
        <Footer />
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
