import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const certificateRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.certificate.create({
        data: {
          courseId: input.courseId,
          userId: ctx.session.user.id,
        },
      });
    }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.certificate.findFirst({
        where: {
          AND: [
            {
              userId: ctx.session.user.id,
            },
            {
              courseId: input.id,
            },
          ],
        },
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.certificate.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
