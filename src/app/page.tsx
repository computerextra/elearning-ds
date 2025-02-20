import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { env } from "@/env";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "./_components/ui/Button";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            {env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            <Link
              className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
              href={session ? "/profile" : "/api/auth/signin"}
            >
              <h3 className="text-2xl font-bold">Erste Schritte →</h3>
              <div className="text-lg">
                {session
                  ? "Hinterlege deinen Namen in deinem Profil."
                  : "Erstelle einen Account oder melde dich an."}
              </div>
            </Link>
            <Link
              className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
              href="/Info"
            >
              <h3 className="text-2xl font-bold">Infos →</h3>
              <div className="text-lg">
                Lies dir die neusten Informationen rund um Datenschutz durch.
              </div>
            </Link>
            <Link
              className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
              href="/Info"
            >
              <h3 className="text-2xl font-bold">Kurse →</h3>
              <div className="text-lg">
                Nimm an unseren Kursen teil und lerne mehr über Datenschutz.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                <Button variant="primary">
                  {session ? "Abmelden" : "Anmelden"}
                </Button>
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}
