
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch('/api/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (data.error) {
            setError(data.error);
            return;
        }

        alert("User created successfully!");
        router.push("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 selection:bg-[#2B2B2B] selection:text-white">
            <div className="w-full max-w-md">
                {/* Branding Section */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-[#2B2B2B] tracking-tighter uppercase italic">ADUSA</h2>
                    <p className="text-[#B3B3B3] text-[10px] font-black uppercase tracking-[0.3em] mt-3">Professional Registration</p>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    className="bg-white border border-[#D4D4D4] p-8 md:p-10 rounded-sm shadow-sm flex flex-col gap-6"
                >
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-[#2B2B2B] tracking-tight">Create Account</h3>
                        <p className="text-[#B3B3B3] text-xs font-medium">Please fill in your details to get started.</p>
                    </div>

                    <div className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest ml-1">Full Name</label>
                            <input 
                                placeholder="e.g. John Doe" 
                                className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm rounded-sm"
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest ml-1">Email Address</label>
                            <input 
                                type="email"
                                placeholder="name@company.com" 
                                className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm rounded-sm"
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest ml-1">Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] outline-none focus:border-[#2B2B2B] transition-all placeholder:text-[#B3B3B3] text-sm rounded-sm"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>

                        {/* Role Select */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest ml-1">Account Type</label>
                            <div className="relative">
                                <select 
                                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#D4D4D4] text-[#2B2B2B] outline-none focus:border-[#2B2B2B] transition-all appearance-none cursor-pointer text-sm rounded-sm"
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                >
                                    <option value="student">Student</option>
                                    <option value="professional">Professional</option>
                                    <option value="college">College Representative</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#2B2B2B]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-[#2B2B2B] text-white p-3 rounded-sm text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* Signup Button */}
                    <button 
                        disabled={loading}
                        className="w-full bg-[#2B2B2B] hover:bg-black text-white font-black py-4 rounded-sm transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-2 uppercase text-xs tracking-[0.2em] shadow-lg shadow-black/5 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : "Create Account"}
                    </button>

                    <p className="text-center text-[#B3B3B3] text-[10px] font-bold uppercase tracking-widest mt-2">
                        Member? 
                        <Link 
                            href="/login"
                            className="text-[#2B2B2B] ml-2 hover:underline underline-offset-4"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

// "use client"

// import {useState} from 'react';

// export default function Signup(){
//     const [error, setError] = useState("");
//     const [form,setForm]=useState({
//         name:"",
//         email:"",
//         password:"",
//         role:"student"
//     })
// const handleSubmit=async(e:any)=>{
//     e.preventDefault();

//    const res= await fetch('/api/signup',{
//         method:"POST",
//          headers: {
//             "Content-Type": "application/json",
//              },
//         body:JSON.stringify(form),
//     });
//      const data = await res.json();
//      if(data.error){
//         setError(data.error);
//             return;
//      }
//       setError("");
//     alert("user created!");
// }
//     return(
//         <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-4">
//                 <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
//                 <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
//                 <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
       
//                 <select onChange={(e)=>setForm({...form,role:e.target.value})}>
//                     <option value="student">Student</option>
//                     <option value="Professional">Professional</option>
//                      <option value="college">college</option>
//                 </select>
//                 <button className="bg-black text-white p-2">Signup</button>
//                 {error && <p className="text-red-500">{error}</p>}
//         </form>
//     )
// }

