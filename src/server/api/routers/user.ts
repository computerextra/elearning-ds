import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserDetails: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        Enrollment: true,
        Certificate: true,
      },
    });
  }),
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
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        chef: z.boolean(),
        admin: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let id = input.id ?? ctx.session.user.id;
      let chef = input.chef;
      let admin = input.admin;

      if (!ctx.session.user.admin) {
        id = ctx.session.user.id;
        chef = false;
        admin = false;
      }
      return ctx.db.user.update({
        where: {
          id,
        },
        data: {
          name: input.name,
          chef,
          admin,
        },
      });
    }),
  deleteUser: protectedProcedure
    .input(z.object({ id: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      let id = input.id ?? ctx.session.user.id;

      if (!ctx.session.user.admin) id = ctx.session.user.id;

      return ctx.db.user.delete({
        where: { id },
      });
    }),
});
