"use client";

import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { Button } from "@/app/_components/ui/Button";
import { MultiSelect } from "@/app/_components/ui/Select";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [selectedInfos, setSelectedInfos] = useState<string[] | undefined>(
    undefined,
  );
  const [selectedQuizze, setSelectedQuizze] = useState<string[] | undefined>(
    undefined,
  );

  const infoQuery = api.material.getAll.useQuery();
  const quizQuery = api.quiz.getAll.useQuery();

  const router = useRouter();
  const utils = api.useUtils();
  const createCourse = api.course.create.useMutation({
    onSuccess: async () => {
      await utils.course.invalidate();
      router.push("/course");
    },
  });

  if (infoQuery.isLoading) return <LoadingSpinner />;
  if (quizQuery.isLoading) return <LoadingSpinner />;

  const getValues = (type: "info" | "quiz") => {
    const temp: {
      name: string;
      id: string;
      value: string;
    }[] = [];

    if (type == "info") {
      infoQuery.data?.map((info) => {
        temp.push({
          id: info.id,
          name: info.title,
          value: info.id,
        });
      });
    }
    if (type == "quiz") {
      quizQuery.data?.map((x) => {
        temp.push({
          id: x.id,
          name: x.title,
          value: x.id,
        });
      });
    }

    return temp;
  };

  return (
    <>
      <form
        className="min-w-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("title", title);
          console.log("description", description);
          console.log("neededPoints", points);
          console.log("infoIds", selectedInfos);
          console.log("quizIds", selectedQuizze);
          // createCourse.mutate({
          //   title,
          //   description,
          //   neededPoints: points,
          //   infoIds: selectedInfos,
          //   quizIds: selectedQuizze,
          // });
        }}
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <label className="fieldset-label">Titel</label>
          <input
            type="text"
            className="input"
            defaultValue={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="fieldset-label">Beschreibung</label>
          <input
            type="text"
            className="input"
            defaultValue={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="fieldset-label">Benötigte Punkt</label>
          <input
            type="number"
            className="input"
            defaultValue={points}
            min={1}
            required
            onChange={(e) => setPoints(parseInt(e.target.value))}
          />
          <label className="fieldset-label">Infos</label>
          <MultiSelect
            values={getValues("info")}
            selected={selectedInfos}
            setSelected={setSelectedInfos}
          />

          <label className="fieldset-label">Quizze</label>
          <MultiSelect
            values={getValues("quiz")}
            selected={selectedQuizze}
            setSelected={setSelectedQuizze}
          />
          <Button
            type="submit"
            variant="success"
            className="mt-4"
            disabled={createCourse.isPending}
          >
            {createCourse.isPending ? "Speichert ..." : "Speichern"}
          </Button>
        </fieldset>
      </form>
    </>
  );
}
