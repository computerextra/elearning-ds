import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const quizRouter = createTRPCRouter({
  // CREATE
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        points: z.number().int(),
        courseId: z.string().nullish(),
        questionIds: z.array(z.string()).nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.quiz.create({
        data: {
          title: input.title,
          points: input.points,
          courseId: input.courseId,
          questions: {
            connect: input.questionIds?.map((x) => ({ id: x })),
          },
        },
      });
    }),
  // GET
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.admin) return null;
    return ctx.db.quiz.findMany();
  }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.quiz.findUnique({
        where: { id: input.id },
        include: {
          questions: {
            include: { answers: true },
          },
        },
      });
    }),
  getAllFromCourse: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.quiz.findMany({
        where: { courseId: input.id },
      });
    }),
  // UPDATE
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        points: z.number().int(),
        courseId: z.string().nullish(),
        questionIds: z.array(z.string()).nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.quiz.update({
        where: { id: input.id },
        data: {
          title: input.title,
          points: input.points,
          courseId: input.courseId,
          questions: {
            connect: input.questionIds?.map((x) => ({ id: x })),
          },
        },
      });
    }),
  // DELETE
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.quiz.delete({ where: { id: input.id } });
    }),
});
