"use client";

import { api } from "@/trpc/react";
import { CourseListItem } from "../_components/ListItem";
import LoadingSpinner from "../_components/LoadingSpinner";

export function AllCourses() {
  const courseQuery = api.course.getAll.useQuery();

  return (
    <div className="container mb-12">
      {courseQuery.isLoading && <LoadingSpinner />}
      {courseQuery.data && (
        <ul className="list bg-base-200 rounded-box shadow-md">
          {courseQuery.data?.map((course) => (
            <CourseListItem key={course.id} course={course} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function NotDonwCourses() {
  const courseQuery = api.course.getUnEntrolled.useQuery();

  return (
    <div className="container mb-12">
      {courseQuery.isLoading && <LoadingSpinner />}
      {courseQuery.data && (
        <ul className="list bg-base-200 rounded-box shadow-md">
          {courseQuery.data?.map((course) => (
            <CourseListItem key={course.id} course={course} />
          ))}
        </ul>
      )}
    </div>
  );
}
