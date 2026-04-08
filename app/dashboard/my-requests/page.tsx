
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyRequests() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSentProposals = async () => {
    try {
      const res = await fetch('/api/proposal/sent');
      const resData = await res.json();
      setData(resData);
    } catch (error) {
      console.error("Error fetching sent proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentProposals();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#2B2B2B] p-6 md:p-16 selection:bg-[#2B2B2B] selection:text-white">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
            Outbox<span className="text-[#B3B3B3]">.</span>
          </h1>
        </div>
        <p className="text-[#B3B3B3] text-xs font-black uppercase tracking-[0.3em] ml-1">
          Tracking your sent professional inquiries
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          /* Loading Skeleton */
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-[#F9F9F9] animate-pulse rounded-sm border border-[#D4D4D4]"></div>
            ))}
          </div>
        ) : data.length > 0 ? (
          /* List of Sent Requests */
          <div className="space-y-6">
            {data.map((p: any) => (
              <div 
                key={p.id} 
                className="group relative bg-white border border-[#D4D4D4] p-8 rounded-sm hover:border-[#2B2B2B] transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8"
              >
                {/* Minimal Status Bar (Top for mobile, Left for desktop) */}
                <div className={`absolute top-0 left-0 bottom-0 w-[3px] ${
                  p.status === 'pending' ? 'bg-[#D4D4D4]' : 
                  p.status === 'accepted' ? 'bg-[#2B2B2B]' : 'bg-[#B3B3B3] opacity-30'
                }`}></div>

                {/* Message Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black text-[#B3B3B3] uppercase tracking-[0.2em]">Sent Request</span>
                    <span className="text-[9px] font-bold text-[#D4D4D4] tracking-tighter uppercase">Ref: #{p.id.slice(-6)}</span>
                  </div>
                  <p className="text-[#2B2B2B] text-xl font-medium leading-relaxed italic tracking-tight">
                    "{p.message}"
                  </p>
                </div>

                {/* Status Badge & Action */}
                <div className="flex flex-col items-end gap-4 min-w-[140px]">
                  <div className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${
                    p.status === 'pending' ? 'bg-white text-[#B3B3B3] border-[#D4D4D4]' : 
                    p.status === 'accepted' ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]' : 
                    'bg-white text-[#D4D4D4] border-[#D4D4D4]'
                  }`}>
                    {p.status}
                  </div>
                  
                  {p.status === 'accepted' && (
                    <button className="text-[10px] font-black text-[#2B2B2B] hover:opacity-60 underline underline-offset-8 transition-all uppercase tracking-widest">
                      View Details
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-32 border border-dashed border-[#D4D4D4] rounded-sm bg-[#F9F9F9]/30 flex flex-col items-center">
            <div className="w-16 h-16 bg-white border border-[#D4D4D4] rounded-sm flex items-center justify-center mb-8 text-[#D4D4D4]">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
               </svg>
            </div>
            <h2 className="text-xs font-black text-[#2B2B2B] uppercase tracking-[0.4em] mb-4">No activity yet</h2>
            <p className="text-[#B3B3B3] text-sm mb-10 max-w-xs mx-auto italic font-medium">Your sent proposals will be tracked here once you connect with an expert.</p>
            <Link 
              href="/search" 
              className="bg-[#2B2B2B] hover:bg-black text-white text-[10px] font-black px-10 py-4 rounded-sm transition-all active:scale-95 shadow-xl shadow-black/5 uppercase tracking-widest"
            >
              Discover Experts
            </Link>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-32 text-center">
        <p className="text-[9px] font-black text-[#D4D4D4] uppercase tracking-[0.8em]">
          ADUSA &bull; Tracking System
        </p>
      </div>
    </div>
  );
}
// "use client"
// import { useEffect, useState } from "react";



// export default function MyRequests(){

//     const [data,setData]=useState([]);
//    useEffect(()=>{
//         fetch('/api/proposal/sent')
//         .then((res)=>res.json())
//         .then(setData);
//    },[]);


//     return(
//         <div className="p-10">
//             <h1>My Requests</h1>

//             {data.map((p: any)=>(
//                     <div key={p.id} className="border p-4 mt-2">

//                             <p><b>Message:</b>{p.message}</p>
//                               <p><b>Status:</b> {p.status}</p>
//                     </div>

//         ))}
//         </div>
//     )
// }