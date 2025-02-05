"use client";

import BackButton from "@/app/_components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InfoCreate() {
  const router = useRouter();

  const utils = api.useUtils();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const createInfo = api.info.create.useMutation({
    onSuccess: async () => {
      await utils.info.invalidate();
      router.push("/info");
    },
  });

  return (
    <div className="container mx-auto mt-12">
      <>
        <BackButton />
        <h1 className="text-center">Neue Info Anlegen</h1>

        <form
          className="mt-12 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createInfo.mutate({
              body: body,
              description: description,
              name: name,
            });
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
          <Button type="submit" disabled={createInfo.isPending}>
            {createInfo.isPending ? "Speichere ..." : "Speichern"}
          </Button>
        </form>
      </>
    </div>
  );
}
