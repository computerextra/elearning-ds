"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { UploadButton } from "@/lib/uploadthing";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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

                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res[0])
                      updateProfilePicture.mutate({
                        id: id,
                        picture: res[0].url,
                      });
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <span className="text-xs">
                  Achtung: Hochgeladene Bilder werden in den USA gespeichert!
                </span>
              </div>
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

        <h2 className="mb-5 mt-12 text-4xl font-bold text-destructive">
          Danger Zone
        </h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="uppercase">
              Account Löschen
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bist du wirklich sicher?</AlertDialogTitle>
              <AlertDialogDescription>
                Wenn du deinen Account löschst, werden auch alle Zertifikate und
                jeder Fortschritt in diesem Portal gelöscht. Diese Aktion kann
                nicht mehr Rückgangig gemacht werden!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
              <AlertDialogAction className="uppercase" asChild>
                <Link href="/user/delete">Trotzdem löschen</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
