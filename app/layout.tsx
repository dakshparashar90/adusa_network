import Providers from "@/app/provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADUSA | Professional Network",
  description: "A minimalist bridge between students, professionals, and colleges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="selection:bg-[#2B2B2B] selection:text-white" suppressHydrationWarning>
    <body className="bg-[#F5F5F7] text-[#1A1A1B] antialiased selection:bg-[#1A1A1B] selection:text-[#F5F5F7]">
        <Providers>
          {/* Navbar automatically inherits the theme from your updated component */}
          <Navbar />
          
          {/* Main content area */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Minimalist Footer Footer */}
          <footer className="py-12 border-t border-[#D4D4D4] bg-white">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="text-sm font-black tracking-tighter uppercase text-[#2B2B2B]">
                ADUSA &copy; 2026
              </span>
              <div className="flex gap-8">
                <a href="#" className="text-[10px] font-black text-[#B3B3B3] hover:text-[#2B2B2B] uppercase tracking-widest transition-colors">Privacy</a>
                <a href="#" className="text-[10px] font-black text-[#B3B3B3] hover:text-[#2B2B2B] uppercase tracking-widest transition-colors">Terms</a>
                <a href="#" className="text-[10px] font-black text-[#B3B3B3] hover:text-[#2B2B2B] uppercase tracking-widest transition-colors">Contact</a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}