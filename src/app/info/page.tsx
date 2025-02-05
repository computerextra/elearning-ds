import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import InfoOverview from "./_components/infos";

export default async function Page() {
  await api.info.getAll.prefetch();
  const session = await auth();

  return (
    <div>
      {session?.user.role === "Admin" && (
        <Button asChild className="ms-12">
          <Link href="/info/create">Neue Info anlegen</Link>
        </Button>
      )}
      <InfoOverview />
    </div>
  );
}
