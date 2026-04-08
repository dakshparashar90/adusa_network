"use client"
import { useState, useEffect } from "react";

export default function ProposalPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/proposal/received')
            .then(res => res.json())
            .then(resData => {
                setData(resData);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-white text-[#2B2B2B] p-6 md:p-16 selection:bg-[#2B2B2B] selection:text-white">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                        Inbox<span className="text-[#B3B3B3]">.</span>
                    </h1>
                    <p className="text-[#B3B3B3] mt-4 text-xs font-black uppercase tracking-[0.3em]">
                        Total received: <span className="text-[#2B2B2B]">{data.length} proposals</span>
                    </p>
                </div>
                <div className="h-[2px] w-20 bg-[#2B2B2B] hidden md:block mb-2"></div>
            </div>

            <div className="max-w-5xl mx-auto">
                {loading ? (
                    /* Loading Skeleton */
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-40 bg-[#F9F9F9] animate-pulse rounded-sm border border-[#D4D4D4]"></div>
                        ))}
                    </div>
                ) : data.length > 0 ? (
                    <div className="grid gap-8">
                        {data.map((p: any) => (
                            <div 
                                key={p.id} 
                                className="bg-white border border-[#D4D4D4] p-8 md:p-10 rounded-sm hover:border-[#2B2B2B] transition-all group flex flex-col md:flex-row gap-8 items-start"
                            >
                                {/* Left Side: Status Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-[#F9F9F9] rounded-sm flex items-center justify-center border border-[#D4D4D4] group-hover:bg-[#2B2B2B] transition-colors text-[#2B2B2B] group-hover:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Middle: Content */}
                                <div className="flex-grow space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 border rounded-sm ${
                                            p.status === 'pending' 
                                            ? 'bg-white text-[#B3B3B3] border-[#D4D4D4]' 
                                            : 'bg-[#2B2B2B] text-white border-[#2B2B2B]'
                                        }`}>
                                            {p.status}
                                        </span>
                                        <span className="text-[#B3B3B3] text-[10px] font-black uppercase tracking-widest">
                                            Ref: #{p.id.slice(-6)}
                                        </span>
                                    </div>
                                    <p className="text-[#2B2B2B] text-xl font-medium leading-relaxed italic tracking-tight">
                                        "{p.message}"
                                    </p>
                                </div>

                                {/* Right Side: Actions */}
                                <div className="w-full md:w-auto flex md:flex-col gap-3">
                                    <button className="flex-1 bg-[#2B2B2B] text-white font-black text-[10px] px-8 py-4 rounded-sm hover:bg-black transition-all active:scale-95 uppercase tracking-widest shadow-lg shadow-black/5">
                                        Accept
                                    </button>
                                    <button className="flex-1 bg-white text-[#B3B3B3] hover:text-[#2B2B2B] font-black text-[10px] px-8 py-4 rounded-sm border border-[#D4D4D4] hover:border-[#2B2B2B] transition-all uppercase tracking-widest">
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-32 border border-dashed border-[#D4D4D4] rounded-sm bg-[#F9F9F9]/50">
                        <div className="w-16 h-16 bg-white border border-[#D4D4D4] rounded-sm flex items-center justify-center mx-auto mb-6 text-[#D4D4D4]">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                           </svg>
                        </div>
                        <h2 className="text-xs font-black text-[#2B2B2B] uppercase tracking-[0.4em]">Inbox is currently empty</h2>
                    </div>
                )}
            </div>

            {/* Footer Tag */}
            <div className="mt-24 text-center">
                <p className="text-[9px] font-black text-[#D4D4D4] uppercase tracking-[0.8em]">Salt & Pepper UI System</p>
            </div>
        </div>
    )
}

// "use client"
// import {useState,useEffect} from "react";

// export default function ProposalPage(){
//     const [data, setData] = useState([]);
//     useEffect(()=>{
//         fetch('/api/proposal/received')
//         .then(res=>res.json())
//         .then(setData);
//     },[]);


//     return(
//         <div className="p-6">
//                 <h1>Received Proposals</h1>

//                 {data.map((p:any)=>(
//                     <div key={p.id}>
//                          <p>{p.message}</p>
//                          <p>Status: {p.status}</p>
//                     </div>
//                 ))}
//         </div>
//     )
// }