import ErrorPage from "@/app/_components/ErrorPage";
import { auth } from "@/server/auth";
import InfoCreate from "../_components/info-create";

export default async function Page() {
  const session = await auth();
  if (!session) return <ErrorPage msg="Nicht angemeldet" />;
  if (session.user.role !== "Admin") return <ErrorPage msg="Nur für Admins" />;

  return <InfoCreate />;
}
