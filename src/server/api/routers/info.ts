import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const calculateReadtime = (body: string | undefined): number => {
  if (body == null) return 0;

  const wpm = 225;
  const words = body.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
};

export const infoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        body: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;

      return ctx.db.info.create({
        data: {
          description: input.description,
          title: input.title,
          body: input.body,
          readTime: calculateReadtime(input.body),
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        body: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;

      return ctx.db.info.update({
        where: {
          id: input.id,
        },
        data: {
          description: input.description,
          title: input.title,
          body: input.body,
          readTime: calculateReadtime(input.body),
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;

      return ctx.db.info.delete({
        where: { id: input.id },
      });
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.info.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const infos = await ctx.db.info.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return infos ?? null;
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.db.info.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return items ?? null;
  }),
});
