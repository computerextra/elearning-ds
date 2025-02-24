import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import { Button } from "../_components/ui/Button";
import { AllCourses, NotDonwCourses } from "./overview";

export default async function Page() {
  const session = await auth();
  await api.course.getAll.prefetch();

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {session?.user.admin && (
          <Link href="/course/new">
            <Button>Neuer Kurs</Button>
          </Link>
        )}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {session?.user ? "Unbeabeitete Kurse" : "Alle Kurse"}
        </h1>
        {session?.user ? <NotDonwCourses /> : <AllCourses />}
      </div>
    </main>
  );
}
