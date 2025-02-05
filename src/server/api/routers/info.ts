import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const calcReadTime = (text: string): string => {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time.toString();
};

export const infoRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const info = await ctx.db.info.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return info ?? null;
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const info = await ctx.db.info.findMany({
      orderBy: { createdAt: "desc" },
    });

    return info ?? null;
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const info = await ctx.db.info.findUnique({
        where: { id: input.id },
      });

      return info ?? null;
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "Admin") return null;

      return ctx.db.info.create({
        data: {
          name: input.name,
          description: input.description,
          body: input.name,
          readtime: calcReadTime(input.body),
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "Admin") return null;

      return ctx.db.info.update({
        where: { id: input.id },
        data: {
          body: input.body,
          description: input.description,
          name: input.name,
          readtime: calcReadTime(input.body),
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "Admin") return null;

      return ctx.db.info.delete({
        where: { id: input.id },
      });
    }),
});
