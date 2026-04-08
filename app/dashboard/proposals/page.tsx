

"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Link import kiya chat ke liye

export default function ProposalPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/proposal/received');
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch proposals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setProcessingId(id);
    try {
      await fetch("/api/proposal/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proposalId: id, status })
      });
      await fetchData();
    } catch (error) {
      alert("Status update failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#2B2B2B] p-6 md:p-16 selection:bg-[#2B2B2B] selection:text-white">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
            Inbox<span className="text-[#B3B3B3]">.</span>
          </h1>
          <p className="text-[#B3B3B3] mt-4 text-xs font-black uppercase tracking-[0.3em]">
            Manage incoming project requests
          </p>
        </div>
        <div className="text-[10px] font-black text-[#2B2B2B] bg-[#F9F9F9] border border-[#D4D4D4] px-6 py-2 rounded-full uppercase tracking-[0.2em]">
          {data.length} Proposals Total
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-[#F9F9F9] animate-pulse rounded-sm border border-[#D4D4D4]" />
            ))}
          </div>
        ) : data.length > 0 ? (
          data.map((p: any) => (
            <div 
              key={p.id} 
              className="bg-white border border-[#D4D4D4] p-8 md:p-10 rounded-sm shadow-sm transition-all hover:border-[#2B2B2B] group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-10 items-center">
                
                {/* Message Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-sm border ${
                      p.status === "pending" ? "bg-[#F9F9F9] text-[#2B2B2B] border-[#D4D4D4]" :
                      p.status === "accepted" ? "bg-green-100 text-green-700 border-green-200" :
                      "bg-red-50 text-red-500 border-red-100"
                    }`}>
                      {p.status}
                    </span>
                    <span className="text-[#B3B3B3] text-[10px] font-bold uppercase tracking-widest">
                      Ref: #{p.id.slice(-6)}
                    </span>
                  </div>
                  <p className="text-[#2B2B2B] text-xl font-medium leading-relaxed italic tracking-tight">
                    "{p.message}"
                  </p>
                </div>

                {/* Actions Section */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[180px]">
                  {p.status === "pending" ? (
                    <>
                      <button 
                        disabled={processingId === p.id}
                        onClick={() => updateStatus(p.id, "accepted")}
                        className="flex-1 bg-[#2B2B2B] text-white font-black py-4 px-8 rounded-sm hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 text-[10px] tracking-[0.2em] uppercase"
                      >
                        {processingId === p.id ? "Processing..." : "Approve"}
                      </button>
                      <button 
                        disabled={processingId === p.id}
                        onClick={() => updateStatus(p.id, "rejected")}
                        className="flex-1 bg-white text-[#B3B3B3] font-black py-4 px-8 rounded-sm hover:text-[#2B2B2B] hover:border-[#2B2B2B] border border-[#D4D4D4] transition-all text-[10px] tracking-[0.2em] uppercase"
                      >
                        Decline
                      </button>
                    </>
                  ) : p.status === "accepted" ? (
                    /* ACCEPTED hone par Chat Button */
                    <Link 
                      href={`/chat/${p.id}`}
                      className="bg-[#00C853] text-center text-white font-black py-4 px-8 rounded-sm hover:bg-[#00b049] transition-all active:scale-[0.98] text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2"
                    >
                      Open Chat →
                    </Link>
                  ) : (
                    /* REJECTED hone par simple text */
                    <div className="text-center py-6 px-8 rounded-sm bg-red-50 border border-red-100">
                      <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Status Finalized</p>
                      <p className="text-xs font-black text-red-500 uppercase tracking-tighter">Rejected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 text-center border border-dashed border-[#D4D4D4] rounded-sm">
            <p className="text-[#B3B3B3] text-xs font-black uppercase tracking-[0.4em]">Inbox is currently empty</p>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-24 text-center">
         <p className="text-[9px] font-black text-[#D4D4D4] uppercase tracking-[0.8em]">Salt & Pepper UI System</p>
      </div>
    </div>
  );
}
// "use client";

// import {useEffect,useState} from "react";
// export default function ProposalPage(){
// const [data,setData]=useState([]);

// const fetchData=async()=>{
//     const res=await fetch('/api/proposal/received');
//     const result =await res.json();
//     setData(result);
// };

// useEffect(()=>{
//     fetchData();
// },[]);

// const updateStatus=async (id:string,status:string)=>{
//     await fetch("/api/proposal/update",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//         },
//         body:JSON.stringify({proposalId:id,status})
//     });
//     fetchData();
// }

//     return(
//         <div className="p-10">
//             <h1>Received Proposals</h1>
//             {data.map((p:any)=>(
//                 <div key={p.id} className="border p-4 mt-2">
//                      <p>{p.message}</p>
//                     <p>Status: {p.status}</p>
//                 {p.status === "pending" && (
//                   <div className="flex gap-2 mt-2">
//                       <button onClick={() => updateStatus(p.id, "accepted")}>
//                          Accept
//                         </button>
//                         <button onClick={() => updateStatus(p.id, "rejected")}>
//                             Reject
//                         </button>  
//                     </div>)}
//                 </div>
//             ))}
//         </div>
//     )
// }