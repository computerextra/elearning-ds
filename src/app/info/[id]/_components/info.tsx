"use client";

import BackButton from "@/app/_components/BackButton";
import Loading from "@/app/_components/Loading";
import { api } from "@/trpc/react";
import {
  headingsPlugin,
  linkDialogPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function Info({ id }: { id: string }) {
  const infoLoader = api.info.get.useQuery({ id });

  if (infoLoader.isLoading) return <Loading />;

  const info = infoLoader.data;
  console.log(JSON.stringify(info?.body));

  return (
    <div className="container mx-auto mt-12">
      <BackButton href="/info" />
      <h1 className="text-center">{info?.name}</h1>
      <h2 className="text-center">{info?.description}</h2>
      <h3 className="text-center">Lesezeit: ca {info?.readtime} Minuten</h3>
      {info && (
        <MDXEditor
          markdown={info.body}
          readOnly
          plugins={[
            headingsPlugin(),
            quotePlugin(),
            listsPlugin(),
            tablePlugin(),
            thematicBreakPlugin(),
            linkDialogPlugin(),
          ]}
        />
      )}
    </div>
  );
}
