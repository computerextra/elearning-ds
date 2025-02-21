import { Button } from "@/app/_components/ui/Button";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import Link from "next/link";
import Info from "./info-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const id = (await params).id;
  await api.info.getOne.prefetch({ id });

  return (
    <HydrateClient>
      <Link prefetch={true} href="/info">
        <Button className="ms-4 mt-4">Zur Übersicht</Button>
      </Link>
      <main className="flex flex-col items-center justify-center">
        <div className="container mb-12 flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session?.user.admin && (
            <Link href={`/info/${id}/edit`}>
              <Button>Info bearbeiten</Button>
            </Link>
          )}

          <Info id={id} />
        </div>
      </main>
    </HydrateClient>
  );
}
