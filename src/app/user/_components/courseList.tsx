"use client";

import type { Course, Enrollment } from "@prisma/client";

export default function CourseList({
  courses,
}: {
  courses:
    | (Enrollment & {
        course: Course;
      })[]
    | undefined;
}) {
  return (
    <div className="mb-6">
      {courses?.map((x) => (
        <div className="flex w-full flex-wrap justify-between gap-2" key={x.id}>
          <span className="font-bold text-muted-foreground">
            {x.course.name}
          </span>
          <p>
            <span className="mr-2 text-muted-foreground">at ABC Company</span>
            <span className="text-muted-foreground">2017 - 2019</span>
          </p>
        </div>
      ))}
    </div>
  );
}
