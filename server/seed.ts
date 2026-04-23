import { getDb, countRows } from "./db";
import { eq } from "drizzle-orm";
import { applications, newsEvents, uploadedFiles, users } from "../drizzle/schema";

export async function seedIfEmpty() {
  const newsCount = await countRows("news_events");
  const appCount = await countRows("applications");
  const fileCount = await countRows("uploaded_files");

  if (newsCount > 0 && appCount > 0 && fileCount > 0) return; // already seeded

  console.log("[Seed] Populating demo data...");
  const db = getDb();

  // ── Ensure admin user exists ──────────────────────────────────────────────
  const adminExists = db.select().from(users).where(eq(users.openId, "local-admin")).all();
  if (adminExists.length === 0) {
    db.insert(users).values({
      openId: "local-admin",
      name: "Admin",
      email: "admin@addisketema.edu.et",
      loginMethod: "local",
      role: "admin",
      lastSignedIn: new Date().toISOString(),
    }).run();
  }

  // ── News & Events ─────────────────────────────────────────────────────────
  if (newsCount === 0) {
    db.insert(newsEvents).values([
      {
        title: "National Exam Results — Outstanding Performance",
        content: "We are proud to announce that Addis Ketema General Secondary School achieved a 97% pass rate in the 2025 Ethiopian University Entrance Examination. Over 120 students scored above 500 points, with 15 students achieving perfect scores in Mathematics and Natural Sciences. This remarkable achievement reflects the dedication of our students and the tireless efforts of our teaching staff.",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
        category: "news",
        featured: 1,
        createdAt: new Date("2025-07-15").toISOString(),
        updatedAt: new Date("2025-07-15").toISOString(),
      },
      {
        title: "Annual Science Fair — Registration Open",
        content: "The 12th Annual Addis Ketema Science Fair will be held on September 20, 2025. Students from Grades 9–12 are invited to submit project proposals by September 1st. This year's theme is 'Technology for Sustainable Ethiopia'. Winners will represent the school at the Addis Ababa Regional Science Competition. Registration forms are available at the school office.",
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543559c5f185?w=800&q=80",
        category: "event",
        eventDate: new Date("2025-09-20").toISOString(),
        featured: 1,
        createdAt: new Date("2025-08-01").toISOString(),
        updatedAt: new Date("2025-08-01").toISOString(),
      },
      {
        title: "New Computer Lab Inauguration",
        content: "Addis Ketema Secondary School is pleased to announce the opening of our brand-new computer laboratory, equipped with 40 modern workstations and high-speed internet access. The lab will be available to all students for research, coding classes, and digital literacy programs. Special after-school sessions will be offered for students preparing for ICT-related university programs.",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        category: "announcement",
        featured: 0,
        createdAt: new Date("2025-06-10").toISOString(),
        updatedAt: new Date("2025-06-10").toISOString(),
      },
      {
        title: "Parent-Teacher Conference — August 2025",
        content: "The school administration cordially invites all parents and guardians to the upcoming Parent-Teacher Conference scheduled for August 25–26, 2025. This is an important opportunity to discuss your child's academic progress, address any concerns, and collaborate on strategies for improvement. Please bring your child's most recent report card. Sessions will be held from 8:00 AM to 5:00 PM.",
        imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
        category: "event",
        eventDate: new Date("2025-08-25").toISOString(),
        featured: 0,
        createdAt: new Date("2025-08-05").toISOString(),
        updatedAt: new Date("2025-08-05").toISOString(),
      },
      {
        title: "Scholarship Opportunities for Grade 12 Students",
        content: "Several scholarship opportunities are now available for outstanding Grade 12 students. The Ethiopian Education Fund is offering full scholarships for students pursuing STEM fields at Ethiopian universities. Additionally, the Addis Ababa City Administration is providing partial scholarships for students from low-income families. Interested students should visit the school counselor's office for application details and deadlines.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        category: "announcement",
        featured: 1,
        createdAt: new Date("2025-07-28").toISOString(),
        updatedAt: new Date("2025-07-28").toISOString(),
      },
    ]).run();
    console.log("[Seed] ✓ News & events created");
  }

  // ── Applications ──────────────────────────────────────────────────────────
  if (appCount === 0) {
    db.insert(applications).values([
      {
        name: "Abebe Girma",
        email: "abebe.girma@gmail.com",
        phone: "+251911234567",
        grade: "Grade 9",
        message: "I am very excited to join Addis Ketema Secondary School. I have always been passionate about mathematics and science.",
        status: "accepted",
        createdAt: new Date("2025-05-10").toISOString(),
        updatedAt: new Date("2025-05-20").toISOString(),
      },
      {
        name: "Tigist Haile",
        email: "tigist.haile@yahoo.com",
        phone: "+251922345678",
        grade: "Grade 10",
        message: "I transferred from Bole Secondary School and I am looking forward to continuing my education here.",
        status: "reviewed",
        createdAt: new Date("2025-05-15").toISOString(),
        updatedAt: new Date("2025-05-22").toISOString(),
      },
      {
        name: "Dawit Bekele",
        email: "dawit.bekele@gmail.com",
        phone: "+251933456789",
        grade: "Grade 11",
        message: "I am applying for the natural science stream. I scored 95% in my Grade 10 national exam.",
        status: "pending",
        createdAt: new Date("2025-06-01").toISOString(),
        updatedAt: new Date("2025-06-01").toISOString(),
      },
      {
        name: "Meron Tadesse",
        email: "meron.tadesse@gmail.com",
        phone: "+251944567890",
        grade: "Grade 9",
        message: "My family recently moved to Addis Ketema sub-city and I would like to enroll in your school.",
        status: "pending",
        createdAt: new Date("2025-06-05").toISOString(),
        updatedAt: new Date("2025-06-05").toISOString(),
      },
      {
        name: "Yonas Alemu",
        email: "yonas.alemu@hotmail.com",
        phone: "+251955678901",
        grade: "Grade 12",
        message: "I am applying for the social science stream. I am particularly interested in economics and history.",
        status: "rejected",
        createdAt: new Date("2025-04-20").toISOString(),
        updatedAt: new Date("2025-05-01").toISOString(),
      },
      {
        name: "Hana Worku",
        email: "hana.worku@gmail.com",
        phone: "+251966789012",
        grade: "Grade 9",
        message: "I completed Grade 8 at Lideta Primary School with distinction. I am eager to join your school.",
        status: "accepted",
        createdAt: new Date("2025-05-25").toISOString(),
        updatedAt: new Date("2025-06-02").toISOString(),
      },
    ]).run();
    console.log("[Seed] ✓ Applications created");
  }

  // ── Study Resources ───────────────────────────────────────────────────────
  if (fileCount === 0) {
    db.insert(uploadedFiles).values([
      // Secondary — Mathematics
      {
        fileName: "Grade 9 Mathematics Textbook",
        fileUrl: "https://www.ethiopianmoe.gov.et/textbooks/grade9-math.pdf",
        fileSize: 4200000,
        mimeType: "application/pdf",
        resourceType: "secondary",
        gradeLevel: "9-10",
        subject: "Mathematics",
        description: "Official Ethiopian Ministry of Education Grade 9 Mathematics textbook covering algebra, geometry, and statistics.",
        uploadedBy: 1,
        createdAt: new Date("2025-01-10").toISOString(),
        updatedAt: new Date("2025-01-10").toISOString(),
      },
      {
        fileName: "Grade 10 Mathematics Past Exam Papers (2020–2024)",
        fileUrl: "https://drive.google.com/file/d/1BxiMVs0XRA5nFXdX65uFdoX0d1Xmfwi/view",
        fileSize: 2800000,
        mimeType: "application/pdf",
        resourceType: "secondary",
        gradeLevel: "9-10",
        subject: "Mathematics",
        description: "Collection of Grade 10 national exam past papers with answer keys for exam preparation.",
        uploadedBy: 1,
        createdAt: new Date("2025-01-12").toISOString(),
        updatedAt: new Date("2025-01-12").toISOString(),
      },
      // Secondary — Physics
      {
        fileName: "Grade 11 Physics Textbook",
        fileUrl: "https://www.ethiopianmoe.gov.et/textbooks/grade11-physics.pdf",
        fileSize: 5100000,
        mimeType: "application/pdf",
        resourceType: "secondary",
        gradeLevel: "11-12",
        subject: "Physics",
        description: "Official Grade 11 Physics textbook covering mechanics, thermodynamics, waves, and electricity.",
        uploadedBy: 1,
        createdAt: new Date("2025-01-15").toISOString(),
        updatedAt: new Date("2025-01-15").toISOString(),
      },
      {
        fileName: "Physics Formula Sheet & Quick Reference",
        fileUrl: "https://www.physicsclassroom.com/getattachment/curriculum/newtlaws/NL-Packet.pdf",
        fileSize: 850000,
        mimeType: "application/pdf",
        resourceType: "secondary",
        gradeLevel: "11-12",
        subject: "Physics",
        description: "Comprehensive formula sheet covering all major physics topics for Grades 11–12 exam preparation.",
        uploadedBy: 1,
        createdAt: new Date("2025-02-01").toISOString(),
        updatedAt: new Date("2025-02-01").toISOString(),
      },
      // Secondary — Chemistry
      {
        fileName: "Grade 12 Chemistry Textbook",
        fileUrl: "https://www.ethiopianmoe.gov.et/textbooks/grade12-chemistry.pdf",
        fileSize: 4700000,
        mimeType: "application/pdf",
        resourceType: "secondary",
        gradeLevel: "11-12",
        subject: "Chemistry",
        description: "Official Grade 12 Chemistry textbook covering organic chemistry, electrochemistry, and industrial chemistry.",
        uploadedBy: 1,
        createdAt: new Date("2025-01-20").toISOString(),
        updatedAt: new Date("2025-01-20").toISOString(),
      },
      // Secondary — English
      {
        fileName: "Grade 9–10 English Grammar Workbook",
        fileUrl: "https://www.englishgrammar.org/wp-content/uploads/2012/09/grammar-exercises.pdf",
        fileSize: 1200000,
        mimeType: "application/pdf",
        resourceType: "secondary",
        gradeLevel: "9-10",
        subject: "English",
        description: "Comprehensive English grammar exercises covering tenses, sentence structure, vocabulary, and writing skills.",
        uploadedBy: 1,
        createdAt: new Date("2025-02-10").toISOString(),
        updatedAt: new Date("2025-02-10").toISOString(),
      },
      // Primary — Math
      {
        fileName: "Grade 5–6 Mathematics Worksheet Pack",
        fileUrl: "https://www.k5learning.com/sites/all/files/worksheets/grade-5-math-word-problems-mixed.pdf",
        fileSize: 980000,
        mimeType: "application/pdf",
        resourceType: "primary",
        gradeLevel: "5-8",
        subject: "Math",
        description: "Practice worksheets for Grades 5–6 covering fractions, decimals, word problems, and basic geometry.",
        uploadedBy: 1,
        createdAt: new Date("2025-03-01").toISOString(),
        updatedAt: new Date("2025-03-01").toISOString(),
      },
      // Primary — English
      {
        fileName: "Grade 3–4 English Reading Comprehension",
        fileUrl: "https://www.k5learning.com/sites/all/files/worksheets/grade-3-reading-comprehension-worksheet.pdf",
        fileSize: 760000,
        mimeType: "application/pdf",
        resourceType: "primary",
        gradeLevel: "1-4",
        subject: "English",
        description: "Reading comprehension passages and exercises for Grades 3–4 to build vocabulary and understanding.",
        uploadedBy: 1,
        createdAt: new Date("2025-03-05").toISOString(),
        updatedAt: new Date("2025-03-05").toISOString(),
      },
      // Primary — Science
      {
        fileName: "Grade 7–8 General Science Notes",
        fileUrl: "https://www.ethiopianmoe.gov.et/textbooks/grade7-science.pdf",
        fileSize: 3200000,
        mimeType: "application/pdf",
        resourceType: "primary",
        gradeLevel: "5-8",
        subject: "Science",
        description: "Comprehensive science notes for Grades 7–8 covering biology, chemistry basics, and earth science.",
        uploadedBy: 1,
        createdAt: new Date("2025-03-10").toISOString(),
        updatedAt: new Date("2025-03-10").toISOString(),
      },
      // Secondary — Biology
      {
        fileName: "Grade 11–12 Biology Study Guide",
        fileUrl: "https://www.ck12.org/book/ck-12-biology/",
        fileSize: 6100000,
        mimeType: "application/pdf",
        resourceType: "secondary",
        gradeLevel: "11-12",
        subject: "Biology",
        description: "Complete biology study guide covering cell biology, genetics, evolution, ecology, and human physiology.",
        uploadedBy: 1,
        createdAt: new Date("2025-02-20").toISOString(),
        updatedAt: new Date("2025-02-20").toISOString(),
      },
    ]).run();
    console.log("[Seed] ✓ Study resources created");
  }

  console.log("[Seed] Demo data ready.");
}
