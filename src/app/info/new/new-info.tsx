"use client";

import TipTap from "@/app/_components/TipTap";
import { Button } from "@/app/_components/ui/Button";
import { api } from "@/trpc/react";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import ListKeymap from "@tiptap/extension-list-keymap";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewInfo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const utils = api.useUtils();
  const createInfo = api.info.create.useMutation({
    onSuccess: async () => {
      await utils.info.invalidate();
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
    content: "",
    editable: true,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createInfo.mutate({
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
            disabled={createInfo.isPending}
          >
            {createInfo.isPending ? "Speichert ..." : "Speichern"}
          </Button>
        </fieldset>
      </form>
    </>
  );
}
