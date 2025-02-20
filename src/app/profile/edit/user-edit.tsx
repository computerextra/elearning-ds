"use client";

import { Button } from "@/app/_components/ui/Button";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserEdit() {
  const [user] = api.user.getUserDetails.useSuspenseQuery();

  const [name, setName] = useState(user?.name ?? "");
  const [admin, setAdmin] = useState(user?.admin);
  const [chef, setChef] = useState(user?.chef);

  useEffect(() => {
    if (user == null) return;

    setName(user.name ?? "");
    setChef(user.chef);
    setAdmin(user.admin);
  }, [user]);

  const utils = api.useUtils();
  const deleteUser = api.user.deleteUser.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      redirect("/");
    },
  });
  const updateUser = api.user.update.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
    },
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {user?.name ?? "Kein Name"}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUser.mutate({
              id: undefined,
              admin: admin ?? false,
              chef: chef ?? false,
              name,
            });
          }}
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Page details</legend>

            <label className="fieldset-label">Dein Name</label>
            <input
              type="text"
              className="input"
              placeholder="Max Muster"
              defaultValue={name}
              required
              onChange={(e) => setName(e.target.value)}
            />

            <label className="fieldset-label">E-Mail</label>
            <input
              type="email"
              disabled
              className="input"
              value={user?.email ?? ""}
            />

            <label className="fieldset-label">
              <input
                type="checkbox"
                defaultChecked={admin}
                onChange={() => setAdmin((prev) => !prev)}
                disabled={!admin}
                className="toggle"
              />
              Admin
            </label>

            <label className="fieldset-label">
              <input
                type="checkbox"
                onChange={() => setChef((prev) => !prev)}
                defaultChecked={chef}
                disabled={!admin}
                className="toggle"
              />
              Chef
            </label>
            <Button
              type="submit"
              variant="success"
              className="mt-4"
              disabled={updateUser.isPending}
            >
              {updateUser.isPending ? "Speichert ..." : "Speichern"}
            </Button>
          </fieldset>
        </form>
        <div className="divider divider-error uppercase">Danger Zone</div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              variant={"error"}
              className="uppercase"
              onClick={() => {
                const x = document.getElementById(
                  "deleteModal",
                )! as HTMLDialogElement;
                x.showModal();
              }}
            >
              Account löschen
            </Button>

            <dialog id="deleteModal" className="modal">
              <div className="modal-box">
                <h3 className="text-lg font-bold">Bist du sicher?!</h3>
                <p className="py-4">
                  Diese Aktion lässt sich nicht Rückgängig machen. Ein
                  gelöschter Account kann nicht wiederhergestellt werden.
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <div className="flex gap-4">
                      <Button
                        variant="error"
                        className="uppercase"
                        onClick={() => deleteUser.mutate({ id: undefined })}
                      >
                        Ich bin mir sicher
                      </Button>
                      <Button className="uppercase">Abbrechen</Button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </main>
  );
}
