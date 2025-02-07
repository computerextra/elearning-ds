import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const courseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
  }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.course.findUnique({
        where: { id: input.id },
      });
    }),
  getDone: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.enrollment.findMany({
      where: {
        AND: [
          {
            userId: ctx.session.user.id,
          },
          {
            completionStatus: {
              contains: "completed",
            },
          },
        ],
      },
      include: {
        course: true,
      },
    });
  }),
  getUnDone: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.enrollment.findMany({
      where: {
        AND: [
          {
            userId: ctx.session.user.id,
          },
          {
            completionStatus: {
              not: "completed",
            },
          },
        ],
      },
      include: {
        course: true,
      },
    });
  }),
  getFailed: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.enrollment.findMany({
      where: {
        AND: [
          {
            userId: ctx.session.user.id,
          },
          {
            completionStatus: {
              contains: "failed",
            },
          },
        ],
      },
      include: {
        course: true,
      },
    });
  }),
});
