"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import type { Course } from "@prisma/client";
import Link from "next/link";

export default function CouseOverview() {
  const [courses] = api.course.getAll.useSuspenseQuery();

  return (
    <div className="container mx-auto mb-12 mt-12">
      <h1 className="text-center">Alle Kurse</h1>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseCard(props: { course: Course }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.course.name}</CardTitle>
        <CardDescription>{props.course.description}</CardDescription>
      </CardHeader>
      <CardContent>Hier sollte auch noch was stehen?</CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <Button asChild>
            <Link href={`/course/${props.course.id}`}>Anmelden</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          <>
            Erstellt am:{" "}
            {new Date(props.course.createdAt).toLocaleDateString("de", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </>
        </p>
      </CardFooter>
    </Card>
  );
}
