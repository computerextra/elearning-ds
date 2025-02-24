import type { Course, Info } from "@prisma/client";
import { ArrowBigRightDash } from "lucide-react";
import Link from "next/link";

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

export function InfoListItem({ info }: { info: Info }) {
  return (
    <>
      <li className="list-row md:hidden">
        <div>
          <p className="truncate">
            <Link href={`/info/${info.id}`} prefetch={true}>
              {info.title}
            </Link>
          </p>
          <p className="truncate text-xs font-semibold uppercase opacity-60">
            {info.description}
          </p>
          <div className="text-xs opacity-60">
            <p className="pb-1">&nbsp;</p>
            <p>Lesezeit: {info.readTime} Minuten</p>
          </div>
          <div className="text-xs opacity-60">
            <p className="pb-1">
              {diff(info.createdAt, info.updatedAt) ? (
                `Letztes Update: ${getDateString(info.updatedAt)}`
              ) : (
                <>&nbsp;</>
              )}
            </p>
            <p>Erstellt am: {getDateString(info.createdAt)}</p>
          </div>
        </div>

        <Link
          href={`/info/${info.id}`}
          prefetch={true}
          className="justify-self-end"
        >
          <button className="btn btn-circle btn-ghost">
            <ArrowBigRightDash />
          </button>
        </Link>
      </li>

      <li className="list-row hidden md:grid">
        <div className="w-55">
          <p className="truncate">
            <Link href={`/info/${info.id}`} prefetch={true}>
              {info.title}
            </Link>
          </p>
          <p className="truncate text-xs font-semibold uppercase opacity-60">
            {info.description}
          </p>
        </div>
        <div className="text-xs opacity-60">
          <p className="pb-1">&nbsp;</p>
          <p>Lesezeit: {info.readTime} Minuten</p>
        </div>
        <div className="text-right text-xs opacity-60">
          <p className="pb-1">
            {diff(info.createdAt, info.updatedAt) ? (
              `Letztes Update: ${getDateString(info.updatedAt)}`
            ) : (
              <>&nbsp;</>
            )}
          </p>
          <p>Erstellt am: {getDateString(info.createdAt)}</p>
        </div>
        <div className="tooltip" data-tip="Artikel lesen">
          <Link href={`/info/${info.id}`} prefetch={true}>
            <button className="btn btn-circle btn-ghost">
              <ArrowBigRightDash />
            </button>
          </Link>
        </div>
      </li>
    </>
  );
}

export function CourseListItem({ course }: { course: Course }) {
  return (
    <>
      <li className="list-row md:hidden">
        <div>
          <p className="truncate">
            <Link href={`/course/${course.id}`} prefetch={true}>
              {course.title}
            </Link>
          </p>
          <p className="truncate text-xs font-semibold uppercase opacity-60">
            {course.description}
          </p>

          <div className="text-xs opacity-60">
            Benötigte Punktzahl zum bestehen:{" "}
            <span className="font-semibold underline">
              {course.neededPoints}
            </span>
          </div>
        </div>

        <Link
          href={`/course/${course.id}`}
          prefetch={true}
          className="justify-self-end"
        >
          <button className="btn btn-circle btn-ghost">
            <ArrowBigRightDash />
          </button>
        </Link>
      </li>

      <li className="list-row hidden md:grid">
        <div className="">
          <p className="truncate">
            <Link href={`/course/${course.id}`} prefetch={true}>
              {course.title}
            </Link>
          </p>
          <p className="truncate text-xs font-semibold uppercase opacity-60">
            {course.description}
          </p>
        </div>

        <div className="text-right">
          Benötigte Punktzahl zum bestehen:{" "}
          <span className="font-semibold underline">{course.neededPoints}</span>
        </div>
        <div className="tooltip" data-tip="Kurs Besuchen">
          <Link href={`/course/${course.id}`} prefetch={true}>
            <button className="btn btn-circle btn-ghost">
              <ArrowBigRightDash />
            </button>
          </Link>
        </div>
      </li>
    </>
  );
}
