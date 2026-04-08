"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, MapPin, Briefcase, ChevronRight, SlidersHorizontal } from "lucide-react";
import gsap from "gsap";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL se query uthao (e.g., ?q=AI)
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Function: Database se experts mangwane ke liye
  const performSearch = async (searchTerm: string) => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/expert/search?q=${searchTerm}`);
      if (res.ok) {
        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
      }
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Initial Search: Jab page load ho URL wali query ke saath
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  // 3. GSAP Animation: Cards ke liye
  useEffect(() => {
    if (data.length > 0) {
      gsap.fromTo(
        ".expert-card",
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out" 
        }
      );
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-16">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-[#2B2B2B] mb-2">
            Search <span className="text-gray-300 font-normal not-italic">Results</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            {data.length} Experts found for "{query || initialQuery}"
          </p>
        </div>

        {/* INTERNAL SEARCH BAR (Page ke andar bhi search kar sakein) */}
        <div className="max-w-2xl mb-20 flex gap-4">
          <div className="relative flex-1 group">
            <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-black transition-all">
              <Search className="ml-5 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && performSearch(query)}
                placeholder="Refine your search..."
                className="w-full px-4 py-5 outline-none text-gray-700 font-medium text-lg rounded-2xl"
              />
            </div>
          </div>
          <button 
            onClick={() => performSearch(query)}
            className="px-8 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-800 transition-all active:scale-95"
          >
            Update
          </button>
        </div>

        {/* RESULTS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-[2rem]"></div>
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.map((item: any) => (
              <div 
                key={item.id} 
                className="expert-card bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold">
                      {item.user?.name?.[0]}
                    </div>
                    <span className="text-[9px] font-black px-3 py-1 border border-gray-100 rounded-full text-gray-400 uppercase tracking-widest">
                      Expert
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.user?.name}</h2>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-6">
                    <MapPin className="w-3 h-3" />
                    {item.location || "Global"}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 italic">
                    "{item.bio || "Available for collaboration in " + item.domain}"
                  </p>
                </div>
                <button 
                  onClick={() => router.push(`/dashboard/profiledash/${item.id}`)}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-lg shadow-black/5"
                >
                  View Full Profile
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-2 border-dashed border-gray-100 rounded-[3rem]">
            <p className="text-gray-300 font-black uppercase tracking-widest text-sm">No experts found in this domain.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 🚀 Suspense wrapper zaroori hai Next.js mein useSearchParams ke liye
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black">Loading ADUSA Engine...</div>}>
      <SearchContent />
    </Suspense>
  );
}