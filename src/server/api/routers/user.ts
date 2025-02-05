import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
      });

      return user ?? null;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        role: z.string(),
        phone: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let role = input.role;
      if (ctx.session.user.role !== "Admin") {
        role = ctx.session.user.role;
      }

      return ctx.db.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          role: role,
          phone: input.phone,
        },
      });
    }),
  updateProfilePicture: protectedProcedure
    .input(z.object({ id: z.string(), picture: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: input.id },
        data: {
          image: input.picture,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.delete({
        where: { id: input.id },
      });
    }),
});
