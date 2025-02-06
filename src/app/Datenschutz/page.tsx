"use client";

import Impressum from "@/markdown/Impressum.mdx";

export default function Page() {
  return (
    <div className="container mx-auto mb-8 mt-12">
      <h1 className="text-center">Datenschutzerklärung</h1>
      <Impressum />
    </div>
  );
}
