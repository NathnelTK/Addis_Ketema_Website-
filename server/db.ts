import initSqlJs, { type Database as SqlJsDatabase } from "sql.js";
import { drizzle, type SQLJsDatabase } from "drizzle-orm/sql-js";
import { eq, desc } from "drizzle-orm";
import fs from "node:fs";
import path from "node:path";
import {
  users,
  applications,
  newsEvents,
  uploadedFiles,
  type InsertUser,
  type InsertApplication,
  type InsertNewsEvent,
  type InsertUploadedFile,
} from "../drizzle/schema";

const DB_PATH = path.resolve(process.cwd(), "school.db");

let _sqlDb: SqlJsDatabase | null = null;
let _db: SQLJsDatabase | null = null;

function saveDb() {
  if (!_sqlDb) return;
  const data = _sqlDb.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export { saveDb };

export async function initDb() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    _sqlDb = new SQL.Database(fileBuffer);
  } else {
    _sqlDb = new SQL.Database();
  }

  _db = drizzle(_sqlDb);

  // Create tables if they don't exist
  _sqlDb.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      openId TEXT NOT NULL UNIQUE,
      name TEXT,
      email TEXT,
      loginMethod TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
      lastSignedIn TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      grade TEXT NOT NULL,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS news_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      imageUrl TEXT,
      eventDate TEXT,
      category TEXT NOT NULL DEFAULT 'news',
      featured INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS uploaded_files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fileName TEXT NOT NULL,
      fileUrl TEXT NOT NULL,
      fileSize INTEGER,
      mimeType TEXT,
      resourceType TEXT NOT NULL,
      gradeLevel TEXT NOT NULL,
      subject TEXT NOT NULL,
      description TEXT,
      uploadedBy INTEGER NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  saveDb();
}

export function getDb(): SQLJsDatabase {
  if (!_db) throw new Error("Database not initialized. Call initDb() first.");
  return _db;
}

// Persist after every write
function withSave<T>(result: T): T {
  saveDb();
  return result;
}

// ── Users ──────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required");
  const db = getDb();
  const existing = await getUserByOpenId(user.openId);
  if (existing) {
    const updateData: Partial<InsertUser> = { lastSignedIn: new Date().toISOString() };
    if (user.name !== undefined) updateData.name = user.name;
    if (user.email !== undefined) updateData.email = user.email;
    if (user.loginMethod !== undefined) updateData.loginMethod = user.loginMethod;
    if (user.role !== undefined) updateData.role = user.role;
    withSave(db.update(users).set(updateData).where(eq(users.openId, user.openId)).run());
  } else {
    withSave(
      db.insert(users).values({
        openId: user.openId,
        name: user.name ?? null,
        email: user.email ?? null,
        loginMethod: user.loginMethod ?? null,
        role: user.role ?? "user",
        lastSignedIn: new Date().toISOString(),
      }).run()
    );
  }
}

export async function getUserByOpenId(openId: string) {
  const db = getDb();
  const result = db.select().from(users).where(eq(users.openId, openId)).limit(1).all();
  return result.length > 0 ? result[0] : undefined;
}

// ── Applications ───────────────────────────────────────────────────────────

export async function createApplication(app: InsertApplication) {
  const db = getDb();
  return withSave(db.insert(applications).values(app).run());
}

export async function getApplications() {
  const db = getDb();
  return db.select().from(applications).orderBy(desc(applications.createdAt)).all();
}

export async function getApplicationById(id: number) {
  const db = getDb();
  const result = db.select().from(applications).where(eq(applications.id, id)).limit(1).all();
  return result[0];
}

export async function updateApplicationStatus(id: number, status: string) {
  const db = getDb();
  return withSave(db.update(applications).set({ status: status as any }).where(eq(applications.id, id)).run());
}

// ── News / Events ──────────────────────────────────────────────────────────

export async function createNewsEvent(event: InsertNewsEvent) {
  const db = getDb();
  return withSave(db.insert(newsEvents).values(event).run());
}

export async function getNewsEvents(limit?: number) {
  const db = getDb();
  const query = db.select().from(newsEvents).orderBy(desc(newsEvents.createdAt));
  return limit ? query.limit(limit).all() : query.all();
}

export async function getNewsEventById(id: number) {
  const db = getDb();
  const result = db.select().from(newsEvents).where(eq(newsEvents.id, id)).limit(1).all();
  return result[0];
}

export async function updateNewsEvent(id: number, event: Partial<InsertNewsEvent>) {
  const db = getDb();
  return withSave(db.update(newsEvents).set(event).where(eq(newsEvents.id, id)).run());
}

export async function deleteNewsEvent(id: number) {
  const db = getDb();
  return withSave(db.delete(newsEvents).where(eq(newsEvents.id, id)).run());
}

// ── Uploaded Files ─────────────────────────────────────────────────────────

export async function createUploadedFile(file: InsertUploadedFile) {
  const db = getDb();
  return withSave(db.insert(uploadedFiles).values(file).run());
}

export async function getUploadedFiles(resourceType?: string, gradeLevel?: string, subject?: string) {
  const db = getDb();
  let query = db.select().from(uploadedFiles).orderBy(desc(uploadedFiles.createdAt)) as any;
  if (resourceType) query = query.where(eq(uploadedFiles.resourceType, resourceType as any));
  if (gradeLevel) query = query.where(eq(uploadedFiles.gradeLevel, gradeLevel));
  if (subject) query = query.where(eq(uploadedFiles.subject, subject));
  return query.all();
}

export async function getUploadedFileById(id: number) {
  const db = getDb();
  const result = db.select().from(uploadedFiles).where(eq(uploadedFiles.id, id)).limit(1).all();
  return result[0];
}

export async function deleteUploadedFile(id: number) {
  const db = getDb();
  return withSave(db.delete(uploadedFiles).where(eq(uploadedFiles.id, id)).run());
}

export async function countRows(table: "news_events" | "applications" | "uploaded_files"): Promise<number> {
  const db = getDb();
  const map = { news_events: newsEvents, applications, uploaded_files: uploadedFiles };
  return db.select().from(map[table]).all().length;
}
