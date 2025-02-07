"use client";

import Loading from "@/app/_components/Loading";
import { api } from "@/trpc/react";
import CourseList from "./courseList";

export default function UndoneCourses() {
  const courseLoader = api.course.getUnDone.useQuery();

  return (
    <>
      <h2 className="mb-4 mt-6 text-xl font-bold">
        Meine Kurse in Bearbeitung
      </h2>
      {courseLoader.isLoading ? (
        <Loading />
      ) : (
        <CourseList courses={courseLoader.data} />
      )}
    </>
  );
}
