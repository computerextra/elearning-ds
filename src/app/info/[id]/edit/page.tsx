import { Button } from "@/app/_components/ui/Button";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import Link from "next/link";
import { redirect } from "next/navigation";
import EditInfo from "./edit-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const id = (await params).id;
  await api.info.getOne.prefetch({ id });

  if (!session?.user.admin) redirect("/");

  return (
    <HydrateClient>
      <Link prefetch={true} href={`/info/${id}`}>
        <Button className="ms-4 mt-4">Zurück zur Info</Button>
      </Link>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <EditInfo id={id} />
        </div>
      </main>
    </HydrateClient>
  );
}
