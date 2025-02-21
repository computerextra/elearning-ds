import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import NewInfo from "./new-info";

export default async function Page() {
  const session = await auth();

  if (!session?.user.admin) redirect("/");

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Neue Info anlegen
          </h1>

          <NewInfo />
        </div>
      </main>
    </HydrateClient>
  );
}
