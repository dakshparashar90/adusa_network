"use client";

import { useEffect, useState } from "react";
import ChatClient from "@/components/ChatClient"

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Saari accepted proposals (jinse chat ho sakti hai) fetch karo
  useEffect(() => {
    fetch('/api/proposal/accepted') // Ek naya API route banana hoga jo sirf accepted status wale de
      .then(res => res.json())
      .then(data => {
        setConversations(data);
        setLoading(false);
        if (data.length > 0) setSelectedProposalId(data[0].id); // Default pehli chat open karo
      });
  }, []);

  return (
    <div className="flex h-screen bg-white pt-20">
      {/* SIDEBAR: Saari Chats ki list */}
      <div className="w-80 border-r border-[#D4D4D4] flex flex-col">
        <div className="p-6 border-b border-[#D4D4D4]">
          <h2 className="text-xl font-black uppercase italic">Messages<span className="text-[#B3B3B3]">.</span></h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 animate-pulse space-y-4">
              <div className="h-12 bg-gray-100 rounded" />
              <div className="h-12 bg-gray-100 rounded" />
            </div>
          ) : conversations.length > 0 ? (
            conversations.map((conv: any) => (
              <div 
                key={conv.id}
                onClick={() => setSelectedProposalId(conv.id)}
                className={`p-4 cursor-pointer transition-all border-b border-[#F0F0F0] hover:bg-[#F9F9F9] ${
                  selectedProposalId === conv.id ? "bg-[#F9F9F9] border-l-4 border-l-[#2B2B2B]" : ""
                }`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-[#B3B3B3] mb-1">
                  Ref: #{conv.id.slice(-6)}
                </p>
                <p className="text-sm font-bold text-[#2B2B2B] truncate">
                  {conv.message}
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-[10px] font-black uppercase text-[#B3B3B3] tracking-widest">
              No active chats
            </div>
          )}
        </div>
      </div>

      {/* CHAT WINDOW: Right Side */}
      <div className="flex-1 bg-[#F9F9F9] p-6 flex justify-center items-center">
        {selectedProposalId ? (
          <ChatClient proposalId={selectedProposalId} key={selectedProposalId} />
        ) : (
          <div className="text-center">
            <p className="text-[#B3B3B3] text-xs font-black uppercase tracking-[0.4em]">Select a conversation to start</p>
          </div>
        )}
      </div>
    </div>
  );
}