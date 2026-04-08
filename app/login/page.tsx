"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const res = await signIn('credentials', { email, password, redirect: false });
        setLoading(false);

        if (res?.error) { alert("Invalid credentials"); return; }
        router.push("/"); 
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 selection:bg-[#2B2B2B] selection:text-white">
            
            {/* Minimalist Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:3rem_3rem] -z-10" />

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-[#2B2B2B] tracking-tighter italic uppercase">ADUSA</h2>
                    <p className="text-[#B3B3B3] text-[10px] font-black tracking-[0.4em] mt-3 uppercase">Identity Portal</p>
                </div>

                <form 
                    onSubmit={handleLogin} 
                    className="bg-white border border-[#D4D4D4] p-8 md:p-12 rounded-sm shadow-sm flex flex-col gap-8"
                >
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-[#2B2B2B] tracking-tight">Sign In</h3>
                        <p className="text-[#B3B3B3] text-xs font-medium">Authentication required to access the network.</p>
                    </div>

                    <div className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest ml-1">Email Address</label>
                            <input 
                                type="email"
                                placeholder="name@company.com" 
                                className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm rounded-sm"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest">Password</label>
                                <button type="button" className="text-[10px] font-black text-[#B3B3B3] hover:text-[#2B2B2B] transition-colors uppercase">Forgot?</button>
                            </div>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm rounded-sm"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={loading}
                        className="w-full bg-[#2B2B2B] hover:bg-black text-white font-black py-4 rounded-sm transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-2 shadow-lg shadow-black/5 uppercase text-xs tracking-[0.2em]"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>Authorize</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>

                    <p className="text-center text-[#B3B3B3] text-[10px] font-bold uppercase tracking-widest mt-2">
                        No account? 
                        <Link href="/signup" className="text-[#2B2B2B] ml-2 hover:underline underline-offset-4">
                            Register Now
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}


// "use client"
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function Login(){
//    const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");

//     const handleLogin=async(e:any)=>{
//         e.preventDefault();
//       const res=  await signIn('credentials',{
//             email,
//             password,
//             redirect:false
//         })
//         if (res?.error) {
//              alert("Invalid email or password");
//              return;
//              }
//         alert("Logged In")
//     }
//     
//     return(
//         <form onSubmit={handleLogin} className="p-10 flex flex-col gap-4">
//             <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
//            <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
//           
//             <button className="bg-black text-white p-2">Login</button>
//         </form>
//     )
//     

// }





