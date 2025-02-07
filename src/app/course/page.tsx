import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page() {
  await api.course.getAll.prefetch();
  const session = await auth();

  return (
    <div>
      {session?.user.role === "Admin" && (
        <Button asChild className="ms-12">
          <Link href="/course/create">Neuen Kurs anlegen</Link>
        </Button>
      )}
    </div>
  );
}
