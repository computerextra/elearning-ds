import ErrorPage from "@/app/_components/ErrorPage";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import InfoEdit from "../_components/info-edit";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();
  if (!session) return <ErrorPage msg="Nicht angemeldet" />;
  if (session.user.role !== "Admin") return <ErrorPage msg="Nur für Admins" />;

  await api.info.get.prefetch({ id });

  return <InfoEdit id={id} />;
}
