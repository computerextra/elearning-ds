import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
  // CREATE
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        neededPoints: z.number().int(),
        infoIds: z.array(z.string()).nullish(),
        quizIds: z.array(z.string()).nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;

      return ctx.db.course.create({
        data: {
          description: input.description,
          neededPoints: input.neededPoints,
          title: input.title,
          infos: {
            connect: input.infoIds?.map((x) => ({ id: x })),
          },
          quiz: {
            connect: input.quizIds?.map((x) => ({ id: x })),
          },
        },
      });
    }),
  // UPDATE
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        neededPoints: z.number().int(),
        infoIds: z.array(z.string()).nullish(),
        quizIds: z.array(z.string()).nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;

      return ctx.db.course.update({
        where: { id: input.id },
        data: {
          description: input.description,
          neededPoints: input.neededPoints,
          title: input.title,
          infos: {
            connect: input.infoIds?.map((x) => ({ id: x })),
          },
          quiz: {
            connect: input.quizIds?.map((x) => ({ id: x })),
          },
        },
      });
    }),
  // DELETE
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.course.delete({ where: { id: input.id } });
    }),
  // GET
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.course.findMany();
  }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.course.findMany({
      take: 6,
    });
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.course.findUnique({
        where: {
          id: input.id,
        },
        include: {
          quiz: {
            include: {
              questions: true,
            },
          },
        },
      });
    }),
  // Enroll
  enrollForUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.enrollment.create({
        data: {
          userId: ctx.session.user.id,
          courseId: input.id,
        },
      });
    }),
  getEnrolled: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.enrollment.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        course: true,
      },
    });
  }),
  setComplete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.enrollment.update({
        where: {
          id: input.id,
        },
        data: {
          completedArt: new Date(),
        },
      });
    }),
  getCompleted: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.enrollment.findMany({
      where: {
        AND: [
          { userId: ctx.session.user.id },
          {
            NOT: {
              completedArt: null,
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
