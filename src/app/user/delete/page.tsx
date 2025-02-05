import { auth, signOut } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  // TODO: Fehlerseite
  if (!session) return <>Nicht angemeldet</>;

  await api.user.delete.prefetch({ id: session?.user.id });
  await signOut();

  redirect("/");
}
