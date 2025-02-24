"use client";

import { api } from "@/trpc/react";
import { CourseListItem, InfoListItem } from "./_components/ListItem";
import LoadingSpinner from "./_components/LoadingSpinner";

export function LatestInfos() {
  const infoQuery = api.info.getLatest.useQuery();

  return (
    <div className="container mb-12">
      {infoQuery.isLoading && <LoadingSpinner />}

      <ul className="list bg-base-200 rounded-box shadow-md">
        {infoQuery.data?.map((info) => (
          <InfoListItem key={info.id} info={info} />
        ))}
      </ul>
    </div>
  );
}

export function LatestCourses() {
  const courseQuery = api.course.getLatest.useQuery();

  return (
    <div className="container mb-12">
      {courseQuery.isLoading && <LoadingSpinner />}

      <ul className="list bg-base-200 rounded-box shadow-md">
        {courseQuery.data?.map((course) => (
          <CourseListItem key={course.id} course={course} />
        ))}
      </ul>
    </div>
  );
}
