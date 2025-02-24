import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const questionRouter = createTRPCRouter({
  // CREATE
  createQestion: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        points: z.number().int(),
        quizId: z.string().nullish(),
        answers: z.array(z.string()).nullish(),
        correctAnswer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.question.create({
        data: {
          correctAnswer: input.correctAnswer,
          points: input.points,
          title: input.title,
          answers: { connect: input.answers?.map((x) => ({ id: x })) },
          quizId: input.quizId,
        },
      });
    }),
  createAnswer: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        correct: z.boolean(),
        questionId: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.answer.create({
        data: {
          correct: input.correct,
          title: input.title,
          questionId: input.questionId,
        },
      });
    }),
  // UPDATE
  updateQuestion: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        points: z.number().int(),
        quizId: z.string().nullish(),
        answers: z.array(z.string()).nullish(),
        correctAnswer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.question.update({
        where: { id: input.id },
        data: {
          correctAnswer: input.correctAnswer,
          points: input.points,
          title: input.title,
          answers: { connect: input.answers?.map((x) => ({ id: x })) },
          quizId: input.quizId,
        },
      });
    }),
  updateAnswer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        correct: z.boolean(),
        questionId: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.answer.update({
        where: { id: input.id },
        data: {
          correct: input.correct,
          title: input.title,
          questionId: input.questionId,
        },
      });
    }),
  // DELETE
  deleteQestion: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.question.delete({ where: { id: input.id } });
    }),
  deleteAnswer: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.answer.delete({ where: { id: input.id } });
    }),
  // GET
  getQestion: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.question.findUnique({
        where: { id: input.id },
        include: {
          answers: true,
        },
      });
    }),
});
