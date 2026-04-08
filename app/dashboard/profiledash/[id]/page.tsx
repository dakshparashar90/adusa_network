"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfessionalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(`/api/professional/profiledash?id=${id}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile load failed");
      } finally {
        setLoading(false);
      }
    };
    if (id) getProfile();
  }, [id]);

  const handleEndorse = async (skillId: string) => {
    try {
      const res = await fetch("/api/professional/endorse", {
        method: "POST",
        body: JSON.stringify({ skillId }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Endorsement failed", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-dashed border-[#D4D4D4] rounded-full animate-spin mb-6" />
        <p className="text-[10px] font-black uppercase text-[#B3B3B3] tracking-[0.4em]">Querying profile database</p>
      </div>
    );
  }

  if (!profile || profile.error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-black italic uppercase text-red-500 mb-4">Profile Not Found<span className="text-[#B3B3B3]">.</span></h2>
        <Link href="/search" className="text-xs font-black uppercase tracking-widest text-[#2B2B2B] hover:underline">Go Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#2B2B2B] p-6 md:p-16 selection:bg-[#2B2B2B] selection:text-white">
      
      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-16 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[10px] font-black uppercase text-[#B3B3B3] hover:text-[#2B2B2B] tracking-widest flex items-center gap-2">
          ← Back
        </button>
        <div className="text-[10px] font-black text-[#2B2B2B] bg-[#F9F9F9] border border-[#D4D4D4] px-6 py-2 rounded-full uppercase tracking-[0.2em]">
          Verified Professional
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-16 lg:gap-24 items-start">
          
          {/* LEFT SIDE: Content */}
          <div className="space-y-12">
            <div>
              <p className="text-[#B3B3B3] font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                Member since {new Date(profile.user.createdAt).getFullYear()}
              </p>
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6 text-wrap break-words">
                {profile.user.name}<span className="text-[#B3B3B3]">.</span>
              </h1>
              <p className="text-2xl font-medium leading-relaxed italic tracking-tight text-[#2B2B2B] opacity-90">
                "{profile.bio}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#D4D4D4]">
              <Link href={`/professional/${id}/proposal`} className="bg-[#2B2B2B] hover:bg-black text-white px-10 py-5 rounded-sm font-black uppercase text-xs tracking-[0.2em] transition-all active:scale-95 text-center flex-1">
                Send Project Proposal
              </Link>
              <button className="bg-white border border-[#D4D4D4] hover:border-[#2B2B2B] text-[#B3B3B3] hover:text-[#2B2B2B] px-10 py-5 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] transition-all flex-1 text-nowrap">
                Download Portfolio
              </button>
            </div>

            {/* Accepted Projects Section */}
            {profile.proposals && profile.proposals.length > 0 && (
              <div className="mt-24 border-t border-[#D4D4D4] pt-16">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10">
                  Recent Accepted <span className="text-[#B3B3B3]">Projects.</span>
                </h2>
                <div className="space-y-6">
                  {profile.proposals.map((p: any) => (
                    <div key={p.id} className="bg-white border border-[#D4D4D4] p-6 md:p-8 rounded-sm hover:border-[#2B2B2B] transition-all flex justify-between gap-6 items-center">
                      <p className="text-sm font-bold italic tracking-tight text-[#2B2B2B] opacity-80">"{p.message}"</p>
                      <span className="text-[9px] font-black border border-[#D4D4D4] text-[#B3B3B3] px-3 py-1.5 rounded-sm uppercase tracking-widest text-nowrap">Ref: #{p.id.slice(-6)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Sidebar (Stats + Skills) */}
          <div className="space-y-10">
            {/* Stats Card */}
            <div className="bg-[#F9F9F9] border border-[#D4D4D4] p-10 rounded-sm space-y-10">
              <div>
                <h3 className="text-[11px] font-black uppercase text-[#B3B3B3] mb-3 tracking-widest">Expertise</h3>
                <span className="bg-[#2B2B2B] text-white font-black py-2 px-5 rounded-sm text-[10px] uppercase tracking-widest italic">{profile.domain}</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[11px] font-black uppercase text-[#B3B3B3] mb-1 tracking-widest text-nowrap">Experience</h3>
                  <p className="font-bold text-2xl tracking-tighter">{profile.experience}+ Yrs</p>
                </div>
                <div>
                  <h3 className="text-[11px] font-black uppercase text-[#B3B3B3] mb-1 tracking-widest">Location</h3>
                  <p className="font-bold text-2xl tracking-tighter">{profile.location}</p>
                </div>
              </div>
              <div className="border-t border-[#D4D4D4] pt-8">
                <h3 className="text-[11px] font-black uppercase text-[#B3B3B3] mb-1 tracking-widest">Email</h3>
                <p className="font-bold text-lg tracking-tight lowercase truncate">{profile.user.email}</p>
              </div>
            </div>

            {/* Skills Card (Card 3) */}
            <div className="bg-white border border-[#D4D4D4] p-8 rounded-sm transition-all group">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[10px] font-black uppercase text-[#B3B3B3] tracking-[0.3em]">
                  Top Endorsements
                </h3>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill: any) => (
                    <div key={skill.id} className="flex items-center justify-between border-b border-[#F5F5F5] pb-3 last:border-0">
                      <div>
                        <span className="text-xs font-bold italic uppercase tracking-tighter text-[#2B2B2B]">
                          #{skill.name}
                        </span>
                        <p className="text-[9px] font-black text-[#B3B3B3] uppercase">
                          {skill.endorsements} Endorsers
                        </p>
                      </div>
                      <button
                        onClick={() => handleEndorse(skill.id)}
                        className="w-8 h-8 flex items-center justify-center border border-[#D4D4D4] rounded-sm hover:bg-[#2B2B2B] hover:text-white transition-all active:scale-90"
                      >
                        <span className="text-lg font-light">+</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] font-bold text-[#D4D4D4] uppercase italic">No skills added yet.</p>
                )}
              </div>

              <div className="mt-8">
                <button className="w-full py-3 bg-[#F9F9F9] border border-[#D4D4D4] text-[9px] font-black uppercase tracking-widest hover:bg-[#2B2B2B] hover:text-white transition-all">
                  Add New Skill
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-24 text-center border-t border-dashed border-[#D4D4D4] pt-16">
        <p className="text-[9px] font-black text-[#D4D4D4] uppercase tracking-[0.8em]">Salt & Pepper UI System</p>
      </div>
    </div>
  );
}

// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ProfileDashboard(){
//     const {id}=useParams();
//     const [profile,setProfile]=useState<any>(null);

//     useEffect(() =>{
//          fetch(`/api/professional/profiledash?id=${id}`)
//          .then(res=>res.json())
//          .then(setProfile);
//     },[id])

//     if (!profile) return <div className="p-20 font-black uppercase tracking-widest text-center">Loading Profile...</div>;

//     return (
//     <div className="min-h-screen bg-white p-10 md:p-24 text-[#2B2B2B]">
//       <div className="max-w-4xl mx-auto border border-[#D4D4D4] p-12">
//         <h1 className="text-6xl font-black italic uppercase mb-4">{profile.user.name}</h1>
//         <p className="text-[#B3B3B3] font-black tracking-widest uppercase text-xs mb-10">{profile.domain} Expert</p>
        
//         <div className="grid grid-cols-2 gap-10 border-t border-[#D4D4D4] pt-10">
//            <div>
//               <h3 className="text-[10px] font-black uppercase text-[#B3B3B3] mb-2">Location</h3>
//               <p className="font-bold">{profile.location}</p>
//            </div>
//            <div>
//               <h3 className="text-[10px] font-black uppercase text-[#B3B3B3] mb-2">Experience</h3>
//               <p className="font-bold">{profile.experience} Years</p>
//            </div>
//         </div>
        
//         <div className="mt-10">
//            <h3 className="text-[10px] font-black uppercase text-[#B3B3B3] mb-4">Biography</h3>
//            <p className="italic text-lg leading-relaxed">"{profile.bio}"</p>
//         </div>
//       </div>
//     </div>
//   );
// }