"use client";

import Loading from "@/app/_components/Loading";
import { api } from "@/trpc/react";
import CourseList from "./courseList";

export default function FailedCourses() {
  const courseLoader = api.course.getFailed.useQuery();

  return (
    <>
      <h2 className="mb-4 mt-6 text-xl font-bold">Nicht bestandene Kurse</h2>
      {courseLoader.isLoading ? (
        <Loading />
      ) : (
        <CourseList courses={courseLoader.data} />
      )}
    </>
  );
}
