"use client";

import { api } from "@/trpc/react";
import ListItem from "../_components/ListItem";
import LoadingSpinner from "../_components/LoadingSpinner";

export default function InfoOverview() {
  const infoQuery = api.info.getAll.useQuery();

  return (
    <div className="container mb-12">
      {infoQuery.isLoading && <LoadingSpinner />}
      {infoQuery.data && (
        <ul className="list bg-base-200 rounded-box shadow-md">
          {infoQuery.data?.map((info) => (
            <ListItem key={info.id} info={info} />
          ))}
        </ul>
      )}
    </div>
  );
}
