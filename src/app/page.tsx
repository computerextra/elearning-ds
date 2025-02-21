import Link from "next/link";

import { env } from "@/env";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import LatestInfos from "./latest-infos";

export default async function Home() {
  const session = await auth();

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
              prefetch={true}
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
              prefetch={true}
              href="/info"
            >
              <h3 className="text-2xl font-bold">Infos →</h3>
              <div className="text-lg">
                Lies dir die neusten Informationen rund um Datenschutz durch.
              </div>
            </Link>
            <Link
              className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
              prefetch={true}
              href="/info"
            >
              <h3 className="text-2xl font-bold">Kurse →</h3>
              <div className="text-lg">
                Nimm an unseren Kursen teil und lerne mehr über Datenschutz.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl">
                {session && <span>angemeldet als {session.user?.name}</span>}
              </p>
            </div>
          </div>
          <h2 className="text-3xl">Aktuelle Infos</h2>
          <LatestInfos />
        </div>
      </main>
    </HydrateClient>
  );
}
