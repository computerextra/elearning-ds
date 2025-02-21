import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import { Button } from "../_components/ui/Button";
import InfoOverview from "./info-overview";

export default async function Page() {
  const session = await auth();
  await api.info.getAll.prefetch();

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {session?.user.admin && (
          <Link href="/info/new">
            <Button>Neue Info</Button>
          </Link>
        )}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Alle Informationen
        </h1>

        <InfoOverview />
      </div>
    </main>
  );
}
