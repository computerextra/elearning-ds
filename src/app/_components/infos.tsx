"use client";

import { api } from "@/trpc/react";
import { ListItem } from "./list-item";

export function LatestInfos() {
  const [latestInfos] = api.info.getLatest.useSuspenseQuery();

  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {latestInfos.map((component) => (
        <ListItem
          key={component.id}
          title={component.name}
          href={`/info/${component.id}`}
        >
          {component.description}
        </ListItem>
      ))}
      <ListItem title="Mehr ..." href={`/info`}>
        Alle Infos ansehen
      </ListItem>
    </ul>
  );
}
