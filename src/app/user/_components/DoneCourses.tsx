"use client";

import { api } from "@/trpc/react";
import CourseList from "./courseList";

export default function DoneCourses() {
  const courseLoader = api.course.getDone.useQuery();
  // TODO: Loading Placeholder
  return (
    <>
      <h2 className="mb-4 mt-6 text-xl font-bold">
        Meine Abgeschlossenen Kurse
      </h2>
      {courseLoader.isLoading ? (
        <>Loading</>
      ) : (
        <CourseList courses={courseLoader.data} />
      )}
    </>
  );
}
