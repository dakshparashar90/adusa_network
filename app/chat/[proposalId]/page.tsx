import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChatClient from "@/components/ChatClient";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
export default async function ChatPage({
  params,
}: {
  params: Promise<{ proposalId: string }>;
}) {
  const { proposalId } = await params; // 🔥 FIX

  

  const session = await getServerSession(authOptions);

  if (!session) return <div>Unauthorized</div>;

  const proposal = await prisma.proposal.findUnique({
    where: { id: proposalId }, // ✅ correct
    include: { professional: true },
  });

  if (!proposal) return <div>Proposal not found</div>;

  if (
    session.user.id !== proposal.senderId &&
    session.user.id !== proposal.professional.userId
  ) {
    return <div>Not allowed</div>;
  }

  return <ChatClient proposalId={proposalId} />;
}