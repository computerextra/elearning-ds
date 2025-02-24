import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const materialRouter = createTRPCRouter({
  // CREATE
  createText: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        courseId: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.material.create({
        data: {
          title: input.title,
          type: "Text",
          body: input.body,
          courseId: input.courseId,
        },
      });
    }),
  createMedia: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        url: z.string(),
        type: z.enum(["Image", "Video"]),
        courseId: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.material.create({
        data: {
          title: input.title,
          type: input.type,
          url: input.url,
          courseId: input.courseId,
        },
      });
    }),
  // UPDATE
  updateText: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        body: z.string(),
        courseId: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.material.update({
        where: { id: input.id },
        data: {
          title: input.title,
          type: "Text",
          body: input.body,
          courseId: input.courseId,
        },
      });
    }),
  updateMedia: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        type: z.enum(["Image", "Video"]),
        url: z.string(),
        courseId: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.material.update({
        where: { id: input.id },
        data: {
          title: input.title,
          type: input.type,
          url: input.url,
          courseId: input.courseId,
        },
      });
    }),
  // delete
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return ctx.db.material.delete({
        where: { id: input.id },
      });
    }),
  // GET
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.admin) return null;
    return ctx.db.material.findMany();
  }),
  getAllFromCourse: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.material.findMany({
        where: {
          courseId: input.id,
        },
      });
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.material.findUnique({
        where: { id: input.id },
      });
    }),
});
