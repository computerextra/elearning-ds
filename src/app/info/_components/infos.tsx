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
import type { Info } from "@prisma/client";
import Link from "next/link";

export default function InfoOverview() {
  const [infos] = api.info.getAll.useSuspenseQuery();

  return (
    <div className="container mx-auto mb-12 mt-12">
      <h1 className="text-center">Alle Informationen</h1>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {infos.map((info) => (
          <InfoCard key={info.id} info={info} />
        ))}
      </div>
    </div>
  );
}

function InfoCard(props: { info: Info }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.info.name}</CardTitle>
        <CardDescription>{props.info.description}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <p className="line-clamp-4">{props.info.body}</p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <Button asChild>
            <Link href={`/info/${props.info.id}`}>Lesen</Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">
              <>
                Erstellt am:{" "}
                {new Date(props.info.createdAt).toLocaleDateString("de", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
                {props.info.updatedAt > props.info.createdAt && (
                  <>
                    <br />
                    Aktualisiert am:{" "}
                    {new Date(props.info.updatedAt).toLocaleDateString("de", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </>
                )}
              </>
            </p>
            <span className="text-xs text-muted-foreground">
              Lesezeit: ca. {props.info.readtime} minuten
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
