"use client"

import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateProfile() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        domain: "",
        experience: "",
        bio: "",
        location: "",
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch('/api/professional/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...form,
                experience: Number(form.experience),
            })
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            alert("Profile created successfully!");
            router.push('/search');
        } else {
            alert(data.error || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 py-20 selection:bg-[#2B2B2B] selection:text-white">
            <div className="max-w-3xl w-full">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-[#2B2B2B] italic tracking-tighter uppercase mb-4 leading-none">
                        Onboard <span className="text-[#B3B3B3]">Expert.</span>
                    </h1>
                    <p className="text-[#B3B3B3] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                        Setting up profile for: {session?.user?.name || "Professional"}
                    </p>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    className="bg-white border border-[#D4D4D4] p-8 md:p-14 rounded-sm shadow-sm flex flex-col gap-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Domain Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-[0.3em] ml-1">Core Domain</label>
                            <input 
                                type="text" 
                                placeholder="e.g. AI, Cyber, Law" 
                                className="w-full bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] px-5 py-4 rounded-sm outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm"
                                onChange={(e) => setForm({ ...form, domain: e.target.value })}
                                required
                            />
                        </div>

                        {/* Experience Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-[0.3em] ml-1">Total Experience (Yrs)</label>
                            <input 
                                type="number" 
                                placeholder="0" 
                                className="w-full bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] px-5 py-4 rounded-sm outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm"
                                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                                required
                            />
                        </div>

                        {/* Location Field */}
                        <div className="space-y-3 md:col-span-2">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-[0.3em] ml-1">Base Location</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="e.g. Remote, Bengaluru, London" 
                                    className="w-full bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] px-5 py-4 pl-12 rounded-sm outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm"
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    required
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Bio Field */}
                        <div className="space-y-3 md:col-span-2">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-[0.3em] ml-1">Expert Bio & Highlights</label>
                            <textarea 
                                placeholder="Summarize your professional journey and key offerings..." 
                                className="w-full h-40 bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] p-5 rounded-sm outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm resize-none leading-relaxed"
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={loading}
                        className="w-full bg-[#2B2B2B] hover:bg-black text-white font-black py-5 rounded-sm transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] shadow-lg shadow-black/5 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>Initialize Profile</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-[#B3B3B3] text-[9px] font-black uppercase tracking-[0.4em] mt-12">
                    ADUSA • PROFESSIONAL VERIFICATION SYSTEM
                </p>
            </div>
        </div>
    )
}
// "use client"

// import { useState } from "react"
// import { useSession } from "next-auth/react";
// export default function CreateProfile(){
//      const { data: session } = useSession();

//     const[form,setForm]=useState({
//         domain:"",
//         experience:"",
//         bio:"",
//         location:"",
//     })

//     const handleSubmit=async(e:any)=>{
//         e.preventDefault();

//       const res=  await fetch('/api/professional/create',{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 ...form,
//                 experience: Number(form.experience),
               
//             })
            
//         });
//         const data=await res.json();
//              if (res.ok) {
//                 alert("Profile created");
//             } else {
                
//                 alert(data.error);
//             }
//     }
//     return(

//          <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-4">
//             <input type="text" placeholder="Domain (AI, Cybersecurity)" onChange={(e)=>setForm({...form,domain:e.target.value})}/>
//              <input type="number" placeholder="Experience (years)" onChange={(e)=>setForm({...form,experience:e.target.value})}/>
//              <input type="text" placeholder="Loczation" onChange={(e)=>setForm({...form,location:e.target.value})}/>
//              <input type="text" placeholder="Bio.." onChange={(e)=>setForm({...form,bio:e.target.value})}/>

//              <button className="bg-black text-white p-2">Create Profile</button>
//         </form>
//     )
// }