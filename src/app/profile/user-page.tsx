"use client";

import { api } from "@/trpc/react";
import Link from "next/link";

export default function UserPage() {
  const [user] = api.user.getUserDetails.useSuspenseQuery();

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Dein Profil
        </h1>
        {user?.admin && (
          <h2 className="text-3xl tracking-tight">Du hast Admin Rechte</h2>
        )}
        {user?.chef && (
          <h2 className="text-3xl tracking-tight">Du hast Chef Rechte</h2>
        )}
        <div className="grid-cols 1 grid gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            prefetch={true}
            href="/profile/edit"
            className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
          >
            <h3 className="text-2xl font-bold">Profil anpassen →</h3>
            <div className="text-lg">Passe hier dein Profil an</div>
          </Link>
          <Link
            prefetch={true}
            href="/course/user"
            className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
          >
            <h3 className="text-2xl font-bold">Deine Kurse →</h3>
            <div className="text-lg">
              Schau dir hier deine aktuellen Kurse an
            </div>
          </Link>
          <Link
            prefetch={true}
            href="/certificates/user"
            className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
          >
            <h3 className="text-2xl font-bold">Zertifikate →</h3>
            <div className="text-lg">
              Sieh dir deine erhaltenen Zertifikate an und lade sie erneut
              herunter.
            </div>
          </Link>
          {user?.admin && (
            <Link
              prefetch={true}
              href="/admin"
              className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
            >
              <h3 className="text-2xl font-bold">Admin Kram →</h3>
              <div className="text-lg">Admin Kram</div>
            </Link>
          )}
          {(user?.chef || user?.admin) && (
            <Link
              prefetch={true}
              href="/chef"
              className="bg-accent hover:bg-secondary text-accent-content hover:text-secondary-content flex max-w-xs flex-col gap-4 rounded-xl p-4"
            >
              <h3 className="text-2xl font-bold">Chef Kram →</h3>
              <div className="text-lg">Eine Übersicht aller Nutzer</div>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
