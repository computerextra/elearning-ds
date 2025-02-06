import ErrorPage from "@/app/_components/ErrorPage";
import { auth, signOut } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) return <ErrorPage msg="Nicht angemeldet" />;

  await api.user.delete.prefetch({ id: session?.user.id });
  await signOut();

  redirect("/");
}
