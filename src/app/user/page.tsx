import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import DoneCourses from "./_components/DoneCourses";
import FailedCourses from "./_components/FailedCourses";
import UndoneCourses from "./_components/UndoneCourses";

export default async function Page() {
  const session = await auth();
  await api.course.getDone.prefetch();
  await api.course.getFailed.prefetch();
  await api.course.getUnDone.prefetch();

  // TODO: Fehler Seite
  if (!session) return <>Nicht angemeldet</>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
        <div className="col-span-4 sm:col-span-3">
          <div className="rounded-lg p-6 shadow">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 shrink-0">
                <AvatarImage src={session.user.image ?? ""} />
                <AvatarFallback>NI</AvatarFallback>
              </Avatar>

              <h1 className="text-xl font-bold">
                {session.user.name ?? "Noch kein Name hinterlegt"}
              </h1>
              <p className="text-muted-foreground">{session.user.email}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/user/edit">Bearbeiten</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-9">
          <div className="rounded-lg p-6 shadow">
            <FailedCourses />
            <UndoneCourses />
            {/* TODO: Dynamisch befüllen! */}
            <h2 className="mb-4 mt-6 text-xl font-bold">Meine Zertifikate</h2>
            <div className="mb-6">
              <div className="flex w-full flex-wrap justify-between gap-2">
                <span className="font-bold text-muted-foreground">
                  Web Developer
                </span>
                <p>
                  <span className="mr-2 text-muted-foreground">
                    at ABC Company
                  </span>
                  <span className="text-muted-foreground">2017 - 2019</span>
                </p>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>
            <div className="mb-6">
              <div className="flex w-full flex-wrap justify-between gap-2">
                <span className="font-bold text-muted-foreground">
                  Web Developer
                </span>
                <p>
                  <span className="mr-2 text-muted-foreground">
                    at ABC Company
                  </span>
                  <span className="text-muted-foreground">2017 - 2019</span>
                </p>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>
            <div className="mb-6">
              <div className="flex w-full flex-wrap justify-between gap-2">
                <span className="font-bold text-muted-foreground">
                  Web Developer
                </span>
                <p>
                  <span className="mr-2 text-muted-foreground">
                    at ABC Company
                  </span>
                  <span className="text-muted-foreground">2017 - 2019</span>
                </p>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div>

            <DoneCourses />
          </div>
        </div>
      </div>
    </div>
  );
}
