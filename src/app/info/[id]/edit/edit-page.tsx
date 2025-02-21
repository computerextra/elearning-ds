"use client";

import TipTap from "@/app/_components/TipTap";
import { Button } from "@/app/_components/ui/Button";
import { api } from "@/trpc/react";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import ListKeymap from "@tiptap/extension-list-keymap";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditInfo({ id }: { id: string }) {
  const [info] = api.info.getOne.useSuspenseQuery({ id });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (info == null) return;

    setTitle(info.title);
    setDescription(info.description);
  }, [info]);

  const router = useRouter();
  const utils = api.useUtils();
  const updateInfo = api.info.update.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      router.push("/info");
    },
  });
  const deleteInfo = api.info.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      router.push("/info");
    },
  });

  const editor = useEditor({
    extensions: [
      TextStyle,
      Color,
      Document,
      Paragraph,
      Text,
      ListKeymap,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:soft-none",
      },
    },
    content: info?.body,
    editable: true,
  });

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        {info?.title} bearbeiten
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateInfo.mutate({
            id,
            title,
            description,
            body: editor?.getHTML(),
          });
        }}
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <label className="fieldset-label">Titel</label>
          <input
            type="text"
            className="input"
            defaultValue={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="fieldset-label">Beschreibung</label>
          <input
            type="text"
            className="input"
            defaultValue={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="fieldset-label">Text</label>
          <TipTap editor={editor} />
          <Button
            type="submit"
            variant="success"
            className="mt-4"
            disabled={updateInfo.isPending}
          >
            {updateInfo.isPending ? "Speichert ..." : "Speichern"}
          </Button>
          <Button
            type="button"
            role="button"
            variant="error"
            className="mt-4"
            disabled={deleteInfo.isPending}
            onClick={() => deleteInfo.mutate({ id })}
          >
            {deleteInfo.isPending ? "Löscht ..." : "Info löschen"}
          </Button>
        </fieldset>
      </form>
    </>
  );
}
