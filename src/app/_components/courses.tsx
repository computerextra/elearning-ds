"use client";

import { api } from "@/trpc/react";
import { ListItem } from "./list-item";

export function LatestCourses() {
  const [latestCourses] = api.course.getLatest.useSuspenseQuery();

  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {latestCourses.map((component) => (
        <ListItem
          key={component.id}
          title={component.name}
          href={`/course/${component.id}`}
        >
          {component.description}
        </ListItem>
      ))}
      <ListItem title="Mehr ..." href={`/course`}>
        Alle Kurse ansehen
      </ListItem>
    </ul>
  );
}
