import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ENV } from "./_core/env";
import { sdk } from "./_core/sdk";
import { ONE_YEAR_MS } from "@shared/const";
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
  createNewsEvent,
  getNewsEvents,
  getNewsEventById,
  updateNewsEvent,
  deleteNewsEvent,
  createUploadedFile,
  getUploadedFiles,
  getUploadedFileById,
  deleteUploadedFile,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    adminLogin: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        if (input.password !== ENV.adminPassword) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid password' });
        }
        // Create or upsert a local admin user
        const adminOpenId = 'local-admin';
        await import('./db').then(db => db.upsertUser({
          openId: adminOpenId,
          name: 'Admin',
          email: 'admin@addisketema.edu.et',
          loginMethod: 'local',
          role: 'admin',
          lastSignedIn: new Date().toISOString(),
        }));
        const sessionToken = await sdk.createSessionToken(adminOpenId, {
          name: 'Admin',
          expiresInMs: ONE_YEAR_MS,
        });
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
        return { success: true };
      }),
  }),

  applications: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        grade: z.string().min(1),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createApplication({
          name: input.name,
          email: input.email,
          phone: input.phone,
          grade: input.grade,
          message: input.message,
        });
        return { success: true, id: (result as any).insertId };
      }),
    list: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        return await getApplications();
      }),
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'reviewed', 'accepted', 'rejected']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        await updateApplicationStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  newsEvents: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await getNewsEvents(input?.limit);
      }),
    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return await getNewsEventById(input);
      }),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        imageUrl: z.string().optional(),
        eventDate: z.date().optional(),
        category: z.enum(['news', 'event', 'announcement']),
        featured: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        const result = await createNewsEvent({
          title: input.title,
          content: input.content,
          imageUrl: input.imageUrl,
          eventDate: input.eventDate ? input.eventDate.toISOString() : undefined,
          category: input.category,
          featured: input.featured || 0,
        });
        return { success: true, id: (result as any).insertId };
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        eventDate: z.date().optional(),
        category: z.enum(['news', 'event', 'announcement']).optional(),
        featured: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        const { id, ...data } = input;
        await updateNewsEvent(id, data as any);
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        await deleteNewsEvent(input);
        return { success: true };
      }),
  }),

  resources: router({
    list: publicProcedure
      .input(z.object({
        resourceType: z.enum(['primary', 'secondary']).optional(),
        gradeLevel: z.string().optional(),
        subject: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return await getUploadedFiles(input?.resourceType, input?.gradeLevel, input?.subject);
      }),
    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return await getUploadedFileById(input);
      }),
    upload: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileUrl: z.string(),
        fileSize: z.number().optional(),
        mimeType: z.string().optional(),
        resourceType: z.enum(['primary', 'secondary']),
        gradeLevel: z.string(),
        subject: z.string(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        const result = await createUploadedFile({
          fileName: input.fileName,
          fileUrl: input.fileUrl,
          fileSize: input.fileSize,
          mimeType: input.mimeType,
          resourceType: input.resourceType,
          gradeLevel: input.gradeLevel,
          subject: input.subject,
          description: input.description,
          uploadedBy: ctx.user.id,
        });
        return { success: true, id: (result as any).insertId };
      }),
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
        await deleteUploadedFile(input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
