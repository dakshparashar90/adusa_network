"use client";

import { useEffect, useState, useRef } from "react";
import { pusherClient } from "@/lib/pusherClient";
import { useSession } from "next-auth/react";

export default function ChatClient({ proposalId }: any) {
  
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetch(`/api/chat/messages?proposalId=${proposalId}`)
      .then(res => res.json())
      .then(setMessages);
  }, [proposalId]);

useEffect(() => {
    // 1. Pehle channel subscribe karo
    const channel = pusherClient.subscribe(`chat-${proposalId}`);

    // 2. Handler function alag se banao taaki cleanup asan ho
    const handleNewMessage = (data: any) => {
      setMessages((prev) => {
        // Sabse zaroori check: Agar message ID pehle se hai, toh add mat karo
        const isDuplicate = prev.some((m) => m.id === data.id);
        if (isDuplicate) return prev;
        return [...prev, data];
      });
    };

    // 3. Event bind karo
    channel.bind("new-message", handleNewMessage);

    // 4. CLEANUP: Ye sabse zaroori hai
    return () => {
      channel.unbind("new-message", handleNewMessage); // Listener hatao
      pusherClient.unsubscribe(`chat-${proposalId}`); // Unsubscribe karo
    };
  }, [proposalId]);
  const sendMessage = async () => {
    if (!text.trim()) return;
    const tempText = text;
    setText("");
    await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposalId, content: tempText }),
    });
  };

  // const handleFileUpload=async(e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const file=e.target.files?.[0];
  //   if(!file)return;

  //   setUploading(true);

  //   //cloudinary upload logic
  //   const formData=new FormData();
  //   formData.append('file',file);
  //   formData.append("upload_present","your_present_name");

  //   try {
  //   const res = await fetch("https://api.cloudinary.com/v1_1/drxc4hxyy/image/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await res.json();
  //   }
  //   catch(e){
  //     console.error("Upload failed");
  //    }
  //    finally{
  //     setUploading(false);
  //    }
  // }
  const testFileStep = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // 1. 'e' ke andar saari information hoti hai jo browser bhejta hai
  // 2. 'e.target.files' ek array jaisa hota hai (kyunki hum multiple files bhi select kar sakte hain)
  const selectedFile = e.target.files?.[0]; 
    if (!selectedFile) return;

    const localUrl=URL.createObjectURL(selectedFile);
    setPreview(localUrl);
    setUploading(true);
  // if (selectedFile) {
  //   console.log("--- FILE MIL GAYI! ---");
  //   console.log("Naam kya hai:", selectedFile.name);
  //   console.log("Size kitna hai (Bytes mein):", selectedFile.size);
  //   console.log("Type kya hai (MIME):", selectedFile.type);
  // }
  const formData=new FormData();
  formData.append("file",selectedFile);
  formData.append("upload_preset","ml_default");
  console.log(formData.get("file"));

  try{
    const res=await fetch("https://api.cloudinary.com/v1_1/drxc4hxyy/image/upload",{
      method:"POST",
      body:formData,
    });

    const result=await res.json();
    setUploadedUrl(result.secure_url);
    console.log("(URL):",result.secure_url);
    const msgType=selectedFile.type.startsWith('image/')?"IMAGE":"FILE";
    if(result.secure_url){
      await fetch("/api/chat/send",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          proposalId:proposalId,
          content:result.secure_url,
          type:msgType
        }),
      });
    }
  }
  catch(err){
    console.log("(ERROR):",err);
  } 
  finally{
    setUploading(false);
  }
};

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto bg-white rounded-xl overflow-hidden shadow-sm border border-[#D4D4D4]">
      
      {/* Header - Salt & Pepper Style */}
      <div className="p-4 bg-white flex items-center justify-between border-b border-[#D4D4D4]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2B2B2B] flex items-center justify-center font-bold text-white text-xs tracking-widest">
            {proposalId?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-[#2B2B2B] text-sm font-bold tracking-tight">Direct Conversation</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#2B2B2B] rounded-full animate-pulse"></span>
              <p className="text-[10px] text-[#B3B3B3] font-bold uppercase tracking-widest">Secure Channel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F9F9F9] scrollbar-hide">
        {messages.map((m, i) => {
          const isMe = m.senderId === session?.user?.id;
          const isImage = m.type === "IMAGE" || m.content.match(/\.(jpeg|jpg|gif|png|webp)$/i);
           const isFile = m.type === "FILE" || m.content.includes("res.cloudinary.com") && !isImage;
          return (
            <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`relative max-w-[75%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed transition-all ${
                isMe 
                ? "bg-[#2B2B2B] text-white rounded-br-none shadow-md" 
                : "bg-white text-[#2B2B2B] rounded-bl-none border border-[#D4D4D4]"
              }`}>
                {isImage ? (
                  <div className="space-y--1">
                      <img
                        src={m.content}
                        alt="Sent"
                        className="max-w-[250px] rounded-lg border border-white/10 shadow-sm cursor-pointer"
                      //  onClick={()=>window.open(m.content,'_blank')}
                      onClick={()=>setSelectedImg(m.content)}
                      />
                      
                  </div>
                ):(
                  <p className="text-sm">{m.content}</p>
                )}
                
                <div className={`text-[9px] mt-1.5 opacity-60 font-bold uppercase ${isMe ? "text-right" : "text-left"}`}>
                   Just Now
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white border-t border-[#D4D4D4]">
        {preview && (
          <div className="relative w-20 h-20 mb-3 ml-12 border rounded-lg overflow-hidden group">
              <img src={preview} className={`w-full h-full object-cover ${uploading ? 'opacity-50': 'opacity-100'}`}/>
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <button onClick={()=>{setPreview(null); setUploadedUrl(null)}}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 text-[10px]"
                >✕</button>
          </div>
        )}
        <div className="flex items-center gap-3 max-w-3xl mx-auto">

            <label className="cursor-pointer hover:bg-[#F9F9F9] p-2 rounded-full transition-all active:scale-90 border border-transparent hover:border-[#D4D4D4]">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={testFileStep} 
                    disabled={uploading}
                  />
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-[#B3B3B3] border-t-[#2B2B2B] rounded-full animate-spin"></div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#B3B3B3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    )}
                  </label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Write a message..."
            className="flex-1 bg-white border border-[#D4D4D4] text-[#2B2B2B] px-5 py-3 rounded-lg outline-none focus:border-[#2B2B2B] placeholder:text-[#B3B3B3] text-sm transition-all"
            
          />
         
          <button
            onClick={sendMessage}
            className="bg-[#2B2B2B] hover:bg-black text-white px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {selectedImg && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={()=>setSelectedImg(null)}>  
            <img src={selectedImg} className="max-h-[90%] rounded-lg"/>
        </div>
      )}
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { pusherClient } from "@/lib/pusherClient";
// import { useSession } from "next-auth/react";

// export default function ChatClient({ proposalId }: any) {
//   const { data: session } = useSession();

//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     fetch(`/api/chat/messages?proposalId=${proposalId}`)
//       .then(res => res.json())
//       .then(setMessages);
//   }, [proposalId]);

//   useEffect(() => {
//     console.log("Subscribing to:", `chat-${proposalId}`);

//     const channel = pusherClient.subscribe(`chat-${proposalId}`);

//     // 🔥 connection check
//     pusherClient.connection.bind("connected", () => {
//       console.log("✅ Pusher connected");
//     });

//     // 🔥 receive message
//     channel.bind("new-message", (data: any) => {
//       console.log("🔥 RECEIVED:", data);
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       pusherClient.unsubscribe(`chat-${proposalId}`);
//     };
//   }, [proposalId]);

//   const sendMessage = async () => {
//     if (!text.trim()) return;

//     await fetch("/api/chat/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json", // 🔥 IMPORTANT
//       },
//       body: JSON.stringify({
//         proposalId,
//         content: text,
//       }),
//     });

//     setText("");
//   };

//   return (
//     <div className="p-10">
//       <h1>Chat</h1>

//       <div className="border p-4 h-64 overflow-y-scroll">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`p-2 my-2 ${
//               m.senderId === session?.user?.id
//                 ? "text-right bg-green-200"
//                 : "text-left bg-gray-200"
//             }`}
//           >
//             {m.content}
//           </div>
//         ))}
//       </div>

//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="border p-2 mt-2 w-full"
//       />

//       <button
//         onClick={sendMessage}
//         className="bg-black text-white px-4 py-2 mt-2"
//       >
//         Send
//       </button>
//     </div>
//   );
// }