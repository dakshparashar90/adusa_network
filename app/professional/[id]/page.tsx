"use client"
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProfessionalPage() {
    const { id } = useParams();
    const router = useRouter();
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = async () => {
        if (!msg.trim()) return alert("Please write a message");
        
        setLoading(true);
        const res = await fetch('/api/proposal/send', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg, professionalId: id })
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            alert("Failed to send: " + (data.error || "Server Error"));
            return;
        }

        alert("Proposal sent successfully!");
        router.back();
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-[#2B2B2B] selection:text-white">
            <div className="w-full max-w-2xl bg-white border border-[#D4D4D4] rounded-sm p-8 md:p-14 shadow-sm relative">
                
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl md:text-5xl font-black text-[#2B2B2B] tracking-tighter uppercase italic leading-none">
                            Send <span className="text-[#B3B3B3]">Proposal.</span>
                        </h1>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="text-[10px] font-black bg-[#2B2B2B] text-white px-3 py-1 rounded-full uppercase tracking-widest">
                                Target ID: #{id?.slice(-6)}
                            </span>
                            <div className="h-[1px] flex-1 bg-[#D4D4D4]"></div>
                        </div>
                    </div>
                </div>

                {/* Input Section */}
                <div className="space-y-8">
                    <div className="group">
                        <label className="block text-[10px] font-black text-[#B3B3B3] uppercase tracking-[0.3em] mb-4 ml-1 group-focus-within:text-[#2B2B2B] transition-colors">
                            Your Professional Message
                        </label>
                        <textarea 
                            placeholder="Briefly explain your requirements or why you'd like to collaborate..." 
                            className="w-full h-64 bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] p-6 rounded-sm outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] resize-none leading-relaxed text-lg"
                            onChange={(e) => setMsg(e.target.value)}
                        />
                    </div>

                    {/* Button Group */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                            onClick={handleOnSubmit}
                            disabled={loading}
                            className="flex-1 bg-[#2B2B2B] hover:bg-black text-white font-black py-5 rounded-sm transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] shadow-lg shadow-black/5 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Dispatch Proposal</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                        
                        <button 
                            onClick={() => router.back()}
                            className="px-10 py-5 bg-white hover:bg-[#F9F9F9] text-[#B3B3B3] hover:text-[#2B2B2B] font-black rounded-sm transition-all border border-[#D4D4D4] uppercase text-xs tracking-[0.2em]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Minimal Footer Footer */}
                <p className="text-center text-[#B3B3B3] text-[9px] font-black uppercase tracking-[0.4em] mt-12 border-t border-[#F0F0F0] pt-6">
                    ADUSA • Secure Professional Exchange
                </p>
            </div>
        </div>
    )
}


// "use client"
// import {useState} from 'react';
// import { useParams } from 'next/navigation'
// export default function ProfessionalPage(){
//     const { id } =useParams();
//     const [msg,setMsg]=useState(""); 
    
//     const handleOnSubmit= async()=>{
//        const res= await fetch('/api/proposal/send',{
//         method: "POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({message:msg,professionalId:id})
//        })

//        const data = await res.json();
//        if(!res.ok){
//             console.log(data.error);
//        }
//         console.log("Proposal sent:", data);
      
//     }
//     return(
//         <div className="p-10">

//             <h1 className='text-amber-500'>Professional Profile</h1>

//             <textarea placeholder="write your proposal message" onChange={(e)=>setMsg(e.target.value)}/>
//             <button onClick={handleOnSubmit}>Send Proposal</button>

//         </div>
//     )
// }