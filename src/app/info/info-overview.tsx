"use client";

import { api } from "@/trpc/react";
import type { Info } from "@prisma/client";
import { ArrowBigRightDash } from "lucide-react";
import Link from "next/link";

export default function InfoOverview() {
  const infoQuery = api.info.getAll.useQuery();

  return (
    <div className="container mb-12">
      <ul className="list bg-base-200 rounded-box shadow-md">
        {infoQuery.data?.map((info) => <ListItem key={info.id} info={info} />)}
      </ul>
    </div>
  );
}

function diff(start: Date, end: Date) {
  return end.getTime() - start.getTime() != 0;
}

function getDateString(date: Date) {
  return date.toLocaleDateString("DE-de", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ListItem({ info }: { info: Info }) {
  return (
    <li className="list-row">
      <div></div>
      <div>
        <div>
          <Link href={`/info/${info.id}`}>{info.title}</Link>
        </div>
        <div className="text-xs font-semibold uppercase opacity-60">
          {info.description}
        </div>
      </div>
      <div className="text-xs opacity-60">
        <div className="pb-2">
          {diff(info.createdAt, info.updatedAt) ? (
            `Letztes Update: ${getDateString(info.updatedAt)}`
          ) : (
            <>&nbsp;</>
          )}
        </div>
        <div> Erstellt am: {getDateString(info.createdAt)}</div>
      </div>
      <div className="tooltip" data-tip="Artikel lesen">
        <Link href={`/info/${info.id}`}>
          <button className="btn btn-circle btn-ghost">
            <ArrowBigRightDash />
          </button>
        </Link>
      </div>
    </li>
  );
}
