import { eq } from "drizzle-orm";
import { applications, newsEvents, uploadedFiles, users } from "../drizzle/schema";
import { countRows, getDb, saveDb } from "./db";

export async function seedIfEmpty() {
  const newsCount = await countRows("news_events");
  const appCount = await countRows("applications");
  const fileCount = await countRows("uploaded_files");

  if (newsCount > 0 && appCount > 0 && fileCount > 0) return;

  console.log("[Seed] Populating demo data...");
  const db = getDb();

  const adminRows = db.select().from(users).where(eq(users.openId, "local-admin")).limit(1).all();
  if (adminRows.length === 0) {
    db.insert(users).values({
      openId: "local-admin",
      name: "Admin",
      email: "admin@addisketema.edu.et",
      loginMethod: "local",
      role: "admin",
      lastSignedIn: new Date().toISOString(),
    }).run();
  }

  if (newsCount === 0) {
    db.insert(newsEvents).values([
      {
        title: "National Exam Results — Outstanding Performance",
        content: "We are proud to announce that Addis Ketema General Secondary School achieved a 97% pass rate in the 2025 Ethiopian University Entrance Examination. Over 120 students scored above 500 points, with 15 students achieving perfect scores in Mathematics and Natural Sciences.",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
        category: "news",
        featured: 1,
        createdAt: new Date("2025-07-15").toISOString(),
        updatedAt: new Date("2025-07-15").toISOString(),
      },
      {
        title: "Annual Science Fair — Registration Open",
        content: "The 12th Annual Addis Ketema Science Fair will be held on September 20, 2025. Students from Grades 9–12 are invited to submit project proposals by September 1st. This year's theme is 'Technology for Sustainable Ethiopia'.",
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543559c5f185?w=800&q=80",
        category: "event",
        eventDate: new Date("2025-09-20").toISOString(),
        featured: 1,
        createdAt: new Date("2025-08-01").toISOString(),
        updatedAt: new Date("2025-08-01").toISOString(),
      },
      {
        title: "New Computer Lab Inauguration",
        content: "Addis Ketema Secondary School is pleased to announce the opening of our brand-new computer laboratory, equipped with 40 modern workstations and high-speed internet access.",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        category: "announcement",
        featured: 0,
        createdAt: new Date("2025-06-10").toISOString(),
        updatedAt: new Date("2025-06-10").toISOString(),
      },
      {
        title: "Parent-Teacher Conference — August 2025",
        content: "The school administration cordially invites all parents and guardians to the upcoming Parent-Teacher Conference scheduled for August 25–26, 2025.",
        imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
        category: "event",
        eventDate: new Date("2025-08-25").toISOString(),
        featured: 0,
        createdAt: new Date("2025-08-05").toISOString(),
        updatedAt: new Date("2025-08-05").toISOString(),
      },
      {
        title: "Scholarship Opportunities for Grade 12 Students",
        content: "Several scholarship opportunities are now available for outstanding Grade 12 students. The Ethiopian Education Fund is offering full scholarships for students pursuing STEM fields at Ethiopian universities.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        category: "announcement",
        featured: 1,
        createdAt: new Date("2025-07-28").toISOString(),
        updatedAt: new Date("2025-07-28").toISOString(),
      },
    ]).run();
    console.log("[Seed] ✓ News & events created");
  }

  if (appCount === 0) {
    db.insert(applications).values([
      { name: "Abebe Girma", email: "abebe.girma@gmail.com", phone: "+251911234567", grade: "Grade 9", message: "Passionate about mathematics and science.", status: "accepted", createdAt: new Date("2025-05-10").toISOString(), updatedAt: new Date("2025-05-20").toISOString() },
      { name: "Tigist Haile", email: "tigist.haile@yahoo.com", phone: "+251922345678", grade: "Grade 10", message: "Transferred from Bole Secondary School.", status: "reviewed", createdAt: new Date("2025-05-15").toISOString(), updatedAt: new Date("2025-05-22").toISOString() },
      { name: "Dawit Bekele", email: "dawit.bekele@gmail.com", phone: "+251933456789", grade: "Grade 11", message: "Scored 95% in Grade 10 national exam.", status: "pending", createdAt: new Date("2025-06-01").toISOString(), updatedAt: new Date("2025-06-01").toISOString() },
      { name: "Meron Tadesse", email: "meron.tadesse@gmail.com", phone: "+251944567890", grade: "Grade 9", message: "Family recently moved to Addis Ketema.", status: "pending", createdAt: new Date("2025-06-05").toISOString(), updatedAt: new Date("2025-06-05").toISOString() },
      { name: "Yonas Alemu", email: "yonas.alemu@hotmail.com", phone: "+251955678901", grade: "Grade 12", message: "Applying for social science stream.", status: "rejected", createdAt: new Date("2025-04-20").toISOString(), updatedAt: new Date("2025-05-01").toISOString() },
      { name: "Hana Worku", email: "hana.worku@gmail.com", phone: "+251966789012", grade: "Grade 9", message: "Completed Grade 8 at Lideta Primary with distinction.", status: "accepted", createdAt: new Date("2025-05-25").toISOString(), updatedAt: new Date("2025-06-02").toISOString() },
    ]).run();
    console.log("[Seed] ✓ Applications created");
  }

  if (fileCount === 0) {
    db.insert(uploadedFiles).values([
      { fileName: "Grade 9 Mathematics Textbook", fileUrl: "https://www.ethiopianmoe.gov.et/textbooks/grade9-math.pdf", fileSize: 4200000, mimeType: "application/pdf", resourceType: "secondary", gradeLevel: "9-10", subject: "Mathematics", description: "Official Ethiopian MOE Grade 9 Mathematics textbook.", uploadedBy: 1, createdAt: new Date("2025-01-10").toISOString(), updatedAt: new Date("2025-01-10").toISOString() },
      { fileName: "Grade 10 Maths Past Exam Papers (2020–2024)", fileUrl: "https://drive.google.com/file/d/1BxiMVs0XRA5nFXdX65uFdoX0d1Xmfwi/view", fileSize: 2800000, mimeType: "application/pdf", resourceType: "secondary", gradeLevel: "9-10", subject: "Mathematics", description: "Grade 10 national exam past papers with answer keys.", uploadedBy: 1, createdAt: new Date("2025-01-12").toISOString(), updatedAt: new Date("2025-01-12").toISOString() },
      { fileName: "Grade 11 Physics Textbook", fileUrl: "https://www.ethiopianmoe.gov.et/textbooks/grade11-physics.pdf", fileSize: 5100000, mimeType: "application/pdf", resourceType: "secondary", gradeLevel: "11-12", subject: "Physics", description: "Official Grade 11 Physics textbook.", uploadedBy: 1, createdAt: new Date("2025-01-15").toISOString(), updatedAt: new Date("2025-01-15").toISOString() },
      { fileName: "Grade 12 Chemistry Textbook", fileUrl: "https://www.ethiopianmoe.gov.et/textbooks/grade12-chemistry.pdf", fileSize: 4700000, mimeType: "application/pdf", resourceType: "secondary", gradeLevel: "11-12", subject: "Chemistry", description: "Official Grade 12 Chemistry textbook.", uploadedBy: 1, createdAt: new Date("2025-01-20").toISOString(), updatedAt: new Date("2025-01-20").toISOString() },
      { fileName: "Grade 9–10 English Grammar Workbook", fileUrl: "https://www.englishgrammar.org/wp-content/uploads/2012/09/grammar-exercises.pdf", fileSize: 1200000, mimeType: "application/pdf", resourceType: "secondary", gradeLevel: "9-10", subject: "English", description: "English grammar exercises for secondary students.", uploadedBy: 1, createdAt: new Date("2025-02-10").toISOString(), updatedAt: new Date("2025-02-10").toISOString() },
      { fileName: "Grade 11–12 Biology Study Guide", fileUrl: "https://www.ck12.org/book/ck-12-biology/", fileSize: 6100000, mimeType: "application/pdf", resourceType: "secondary", gradeLevel: "11-12", subject: "Biology", description: "Complete biology study guide for Grades 11–12.", uploadedBy: 1, createdAt: new Date("2025-02-20").toISOString(), updatedAt: new Date("2025-02-20").toISOString() },
      { fileName: "Grade 5–6 Mathematics Worksheet Pack", fileUrl: "https://www.k5learning.com/sites/all/files/worksheets/grade-5-math-word-problems-mixed.pdf", fileSize: 980000, mimeType: "application/pdf", resourceType: "primary", gradeLevel: "5-8", subject: "Math", description: "Practice worksheets for Grades 5–6.", uploadedBy: 1, createdAt: new Date("2025-03-01").toISOString(), updatedAt: new Date("2025-03-01").toISOString() },
      { fileName: "Grade 3–4 English Reading Comprehension", fileUrl: "https://www.k5learning.com/sites/all/files/worksheets/grade-3-reading-comprehension-worksheet.pdf", fileSize: 760000, mimeType: "application/pdf", resourceType: "primary", gradeLevel: "1-4", subject: "English", description: "Reading comprehension passages for Grades 3–4.", uploadedBy: 1, createdAt: new Date("2025-03-05").toISOString(), updatedAt: new Date("2025-03-05").toISOString() },
      { fileName: "Grade 7–8 General Science Notes", fileUrl: "https://www.ethiopianmoe.gov.et/textbooks/grade7-science.pdf", fileSize: 3200000, mimeType: "application/pdf", resourceType: "primary", gradeLevel: "5-8", subject: "Science", description: "Science notes for Grades 7–8.", uploadedBy: 1, createdAt: new Date("2025-03-10").toISOString(), updatedAt: new Date("2025-03-10").toISOString() },
    ]).run();
    console.log("[Seed] ✓ Study resources created");
  }

  saveDb();
  console.log("[Seed] Demo data ready.");
}
