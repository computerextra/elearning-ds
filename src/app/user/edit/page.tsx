import { auth } from "@/server/auth";
import UserEdit from "./edit-user";

export default async function Page() {
  const session = await auth();

  // TODO: Fehlerseite
  if (!session) return <>Nicht angemeldet</>;

  return <UserEdit id={session.user.id} />;
}
