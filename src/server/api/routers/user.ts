import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getConsent: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        consent: true,
      },
    });
  }),
  setConsent: protectedProcedure
    .input(z.object({ consent: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          consent: input.consent,
        },
      });
    }),
});
