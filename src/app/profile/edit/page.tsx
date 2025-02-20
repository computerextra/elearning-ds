import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import UserEdit from "./user-edit";

export default async function Page() {
  const session = await auth();
  await api.user.getUserDetails.prefetch();

  if (!session) redirect("/");

  return <UserEdit />;
}
