import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import InfoEdit from "../_components/info-edit";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();
  if (!session) return <>Not Logged In</>;
  if (session.user.role !== "Admin") return <>Not Authorized</>;

  await api.info.get.prefetch({ id });

  return <InfoEdit id={id} />;
}
