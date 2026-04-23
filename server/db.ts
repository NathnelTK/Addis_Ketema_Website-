import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, applications, newsEvents, uploadedFiles, InsertApplication, InsertNewsEvent, InsertUploadedFile } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Applications queries
export async function createApplication(app: InsertApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(applications).values(app);
  return result;
}

export async function getApplications() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(applications).orderBy(desc(applications.createdAt));
}

export async function getApplicationById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  return result[0];
}

export async function updateApplicationStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(applications).set({ status: status as any }).where(eq(applications.id, id));
}

// News/Events queries
export async function createNewsEvent(event: InsertNewsEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(newsEvents).values(event);
}

export async function getNewsEvents(limit?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const query = db.select().from(newsEvents).orderBy(desc(newsEvents.createdAt));
  if (limit) {
    return await query.limit(limit);
  }
  return await query;
}

export async function getNewsEventById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(newsEvents).where(eq(newsEvents.id, id)).limit(1);
  return result[0];
}

export async function updateNewsEvent(id: number, event: Partial<InsertNewsEvent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(newsEvents).set(event).where(eq(newsEvents.id, id));
}

export async function deleteNewsEvent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(newsEvents).where(eq(newsEvents.id, id));
}

// Uploaded files queries
export async function createUploadedFile(file: InsertUploadedFile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(uploadedFiles).values(file);
}

export async function getUploadedFiles(resourceType?: string, gradeLevel?: string, subject?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  let query = db.select().from(uploadedFiles) as any;
  
  if (resourceType) {
    query = query.where(eq(uploadedFiles.resourceType, resourceType as any));
  }
  if (gradeLevel) {
    query = query.where(eq(uploadedFiles.gradeLevel, gradeLevel));
  }
  if (subject) {
    query = query.where(eq(uploadedFiles.subject, subject));
  }
  
  return await query.orderBy(desc(uploadedFiles.createdAt));
}

export async function getUploadedFileById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(uploadedFiles).where(eq(uploadedFiles.id, id)).limit(1);
  return result[0];
}

export async function deleteUploadedFile(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(uploadedFiles).where(eq(uploadedFiles.id, id));
}

// TODO: add more feature queries as your schema grows.
