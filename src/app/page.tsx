import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="container mx-auto">
        <h1 className="mt-24 text-center">Datenschutz Training</h1>
      </main>
    </HydrateClient>
  );
}
