import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ code: string[] }>;
};

export default async function InvitePage({ params }: Props) {
  const { code } = await params;
  const inviteCode = Array.isArray(code) ? code.join("/") : code;
  
  redirect(`/birthday-question?code=${encodeURIComponent(inviteCode)}`);
}
