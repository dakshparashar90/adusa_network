"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center pt-32 pb-20 px-6">
      <div ref={heroRef} className="max-w-5xl w-full flex flex-col items-center">
        
        {/* Minimal Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#eeeeee] bg-[#f9f9f9] mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666666]">The Professional Standard</span>
        </div>

        {/* Tight Typography */}
        <h1 className="text-[12vw] md:text-[100px] font-black leading-[0.9] tracking-[-0.04em] uppercase text-[#1a1a1a] text-center mb-6">
          EXPERTISE <br />
          <span className="text-[#cccccc] italic">REIMAGINED.</span>
        </h1>

        <p className="max-w-lg text-center text-[#666666] text-base md:text-lg font-medium leading-relaxed mb-10">
          A minimalist bridge between students and professionals. Built for focus, speed, and professional growth.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/search" className="bg-[#1a1a1a] text-white text-[11px] font-bold px-10 py-4 rounded-[4px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-black/5 active:scale-95">
            Get Started
          </Link>
          <Link href="/about" className="bg-white border border-[#dddddd] text-[#1a1a1a] text-[11px] font-bold px-10 py-4 rounded-[4px] uppercase tracking-widest hover:bg-[#f9f9f9] transition-all">
            Learn More
          </Link>
        </div>

        {/* Social Proof Placeholder */}
        <div className="mt-32 pt-10 border-t border-[#eeeeee] w-full flex flex-wrap justify-center gap-10 opacity-30 grayscale">
          <span className="text-xs font-bold uppercase tracking-widest">Microsoft</span>
          <span className="text-xs font-bold uppercase tracking-widest">Google</span>
          <span className="text-xs font-bold uppercase tracking-widest font-serif italic">Adusa</span>
          <span className="text-xs font-bold uppercase tracking-widest">Meta</span>
        </div>
      </div>
    </main>
  );
}