import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const infoRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const info = await ctx.db.info.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return info ?? null;
  }),
});
