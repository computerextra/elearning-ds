"use client";

import { api } from "@/trpc/react";
import {
  BoldItalicUnderlineToggles,
  CreateLink,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  tablePlugin,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  BlockTypeSelect,
  linkDialogPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import { useEffect, useRef, useState } from "react";
import "@mdxeditor/editor/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
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
import BackButton from "@/app/_components/BackButton";

export default function InfoEdit({ id }: { id: string }) {
  const infoLoader = api.info.get.useQuery({ id });
  const ref = useRef<MDXEditorMethods>(null);
  const router = useRouter();

  const utils = api.useUtils();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const updateInfo = api.info.update.useMutation({
    onSuccess: async () => {
      await utils.info.invalidate();
    },
  });
  const deleteInfo = api.info.delete.useMutation({
    onSuccess: async () => {
      await utils.info.invalidate();
      router.push("/info");
    },
  });

  useEffect(() => {
    if (infoLoader.data == null) return;

    setDescription(infoLoader.data.description);
    setName(infoLoader.data.name);
    setBody(infoLoader.data.body);
    ref.current?.setMarkdown(infoLoader.data.body);
  }, [infoLoader.data]);

  if (infoLoader.isLoading) return <>Loading</>;

  const info = infoLoader.data;

  return (
    <div className="container mx-auto mt-12">
      {info && (
        <>
          <BackButton />
          <h1 className="text-center">{info.name} bearbeiten</h1>

          <form
            className="mt-12 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              updateInfo.mutate({ body, description, id, name });
            }}
          >
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Beschreibung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <MDXEditor
              markdown={body}
              ref={ref}
              onChange={setBody}
              plugins={[
                headingsPlugin(),
                quotePlugin(),
                listsPlugin(),
                tablePlugin(),
                thematicBreakPlugin(),
                linkDialogPlugin(),
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BlockTypeSelect />
                      <BoldItalicUnderlineToggles />
                      <CreateLink />
                      <InsertTable />
                      <InsertThematicBreak />
                      <ListsToggle />
                    </>
                  ),
                }),
              ]}
            />
            <Button type="submit" disabled={updateInfo.isPending}>
              {updateInfo.isPending ? "Speichere ..." : "Speichern"}
            </Button>
          </form>
          <div className="mt-5">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Info Löschen</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bist du wirklich sicher?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Diese Aktion kann nicht widerufen werden. Einmal gelöschte
                    Daten bleiben verloren!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteInfo.mutate({ id })}>
                    Wirklich Löschen
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
}
