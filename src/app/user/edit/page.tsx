import ErrorPage from "@/app/_components/ErrorPage";
import { auth } from "@/server/auth";
import UserEdit from "./edit-user";

export default async function Page() {
  const session = await auth();

  if (!session) return <ErrorPage msg="Nicht angemeldet" />;

  return <UserEdit id={session.user.id} />;
}
