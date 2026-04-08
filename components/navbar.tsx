"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, MessageSquare } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    if (session) {
      fetch('/api/proposal/accepted-chat')
        .then(res => res.json())
        .then(data => {
          if (data.proposalId) setActiveChatId(data.proposalId);
        })
        .catch(() => setActiveChatId(null));
    }
  }, [session]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (query.length < 2) {
        setResult([]);
        return;
      }
      try {
        const res = await fetch(`/api/expert/search?q=${query}`);
        if (res.ok) {
          const q = await res.json();
          setResult(Array.isArray(q) ? q : []);
        }
      } catch (err) {
        console.error("Search failed", err);
      }
    };

    const timer = setTimeout(fetchDetails, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleOnProfile = (id: string) => {
    router.push(`/dashboard/profiledash/${id}`);
    setQuery("");
    setResult([]);
  };

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-[#D4D4D4] bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2B2B2B] flex items-center justify-center rounded-sm transition-transform group-hover:-rotate-6">
                <span className="text-white font-bold text-sm tracking-tighter">A</span>
              </div>
              <h1 className="text-xl font-black text-[#2B2B2B] tracking-tighter uppercase hidden sm:block">ADUSA</h1>
            </Link>
          </div>

          {/* 🔍 Search Section */}
          <div className="relative flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative flex items-center bg-[#F9F9F9] px-4 py-1.5 rounded-full border border-[#D4D4D4] focus-within:border-[#2B2B2B] transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type='text'
                placeholder="Find Experts..."
                className="w-full bg-transparent font-bold text-[13px] text-[#2B2B2B] outline-none placeholder-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* --- Suggestions Dropdown --- */}
            {result.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-[#D4D4D4] rounded-2xl mt-2 shadow-2xl z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* Results List */}
                <div className="max-h-64 overflow-y-auto">
                  {result.map((expert: any) => (
                    <div 
                      key={expert.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0 transition-colors"
                      onClick={() => handleOnProfile(expert.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2B2B2B] rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                          {expert.user?.name?.[0] || "E"}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#2B2B2B]">{expert.user?.name}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{expert.domain}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-300" />
                    </div>
                  ))}
                </div>

                {/* See All Experts Button (Inside the same div) */}
                <Link 
                  href={`/search?q=${query}`} 
                  onClick={() => setResult([])} 
                  className="flex items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-gray-100 border-t border-gray-100 transition-colors group"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#2B2B2B]">
                    See All Experts
                  </span>
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>

          {/* Right Side: Auth */}
          <div className="flex items-center gap-6">
            {!session ? (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest hover:underline">Sign In</Link>
                <Link href="/signup" className="bg-[#2B2B2B] text-white text-[10px] font-black px-5 py-2 rounded-sm hover:bg-black transition-all shadow-md uppercase tracking-widest">Join</Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <div className="hidden lg:flex items-center gap-5 border-r border-[#D4D4D4] pr-5">
                  <Link href='/dashboard/create-profile' className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Expert Mode</Link>
                  <Link href="/chat" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Messages
                  </Link>
                  <Link href="/dashboard/proposals" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Proposals</Link>
                  
                  {activeChatId && (
                    <Link href={`/chat/${activeChatId}`} className="text-[9px] font-black uppercase tracking-widest text-green-600 flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> Inbox
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleOnProfile(session.user.id)}
                    className="w-8 h-8 rounded-full bg-[#F9F9F9] border border-[#D4D4D4] flex items-center justify-center text-[11px] font-black text-[#2B2B2B] hover:border-black transition-all"
                  >
                    {session.user?.name?.[0] || "U"}
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })} 
                    className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:text-red-700"
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}