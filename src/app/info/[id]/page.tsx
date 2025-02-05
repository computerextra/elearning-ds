import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import Info from "./_components/info";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  await api.info.get.prefetch({ id });
  const session = await auth();

  return (
    <div>
      {session?.user.role === "Admin" && (
        <Button asChild className="ms-12">
          <Link href={`/info/${id}/edit`}>Info bearbeiten</Link>
        </Button>
      )}
      <Info id={id} />
    </div>
  );
}
