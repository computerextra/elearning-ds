"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  Name: z.string(),
  Email: z.string(),
  Telefon: z.string().optional(),
});

export default function UserEdit({ id }: { id: string }) {
  const userLoader = api.user.get.useQuery({ id });
  const router = useRouter();
  const utils = api.useUtils();
  const updateUser = api.user.update.useMutation({
    onSuccess: () => {
      router.push("/user");
    },
  });
  const updateProfilePicture = api.user.updateProfilePicture.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: userLoader.data?.name ?? "",
      Email: userLoader.data?.email ?? "",
      Telefon: userLoader.data?.phone ?? undefined,
    },
  });

  useEffect(() => {
    if (userLoader.data == null) return;

    form.setValue("Name", userLoader.data.name ?? "");
    form.setValue("Email", userLoader.data.email ?? "");
    form.setValue("Telefon", userLoader.data.phone ?? undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoader.data]);

  const user = userLoader.data;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUser.mutate({
      id: id,
      name: values.Name,
      role: user?.role ?? "User",
      phone: values.Telefon,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-10 w-full rounded-2xl p-10 font-normal leading-relaxed shadow-xl">
        <div className="flex flex-col">
          <div className="mb-5 flex flex-col items-start justify-between md:flex-row">
            <h2 className="mb-5 text-4xl font-bold">Profil Aktualisieren</h2>
            <div className="text-center">
              <div>
                <Avatar className="mx-auto mb-4 h-32 w-32">
                  <AvatarImage src={user?.image ?? ""} />
                  <AvatarFallback>NI</AvatarFallback>
                </Avatar>
                {/* TODO: Upload Button für Bild einbauen // Bei Upload das Bild in der DB mit Link hinterlegen */}
                <input
                  type="file"
                  name="profile"
                  id="upload_profile"
                  hidden
                  required
                />

                <label
                  htmlFor="upload_profile"
                  className="inline-flex items-center"
                >
                  <svg
                    data-slot="icon"
                    className="h-5 w-5"
                    fill="none"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    ></path>
                  </svg>
                </label>
              </div>
              <button className="rounded-lg bg-indigo-800 px-4 py-2 text-white ring ring-gray-300 transition-colors duration-300 hover:bg-blue-900 hover:ring-indigo-300">
                Change Profile Picture
              </button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dein Name" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Deine E-Mail" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Telefon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input placeholder="Deine Telefonnummer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Abbrechen
                </Button>
                <Button type="submit">Änderungen Speichern</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
