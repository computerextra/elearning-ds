"use client";

import TipTap from "@/app/_components/TipTap";
import { api } from "@/trpc/react";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import ListKeymap from "@tiptap/extension-list-keymap";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export default function Info({ id }: { id: string }) {
  const [info] = api.info.getOne.useSuspenseQuery({ id });

  const tiptapJson = JSON.parse(info?.body ? info.body : "{}");
  console.log(tiptapJson);
  console.log(info?.body);
  const nodes = tiptapJson.content;

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
    content: nodes,
    editable: false,
  });

  return (
    <>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        {info?.title}
      </h1>
      <TipTap editor={editor} />
    </>
  );
}
