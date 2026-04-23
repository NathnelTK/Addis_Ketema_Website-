# Addis Ketema General Secondary School Website

A modern, full-stack website for Addis Ketema General Secondary School built with React, TypeScript, Express, and MySQL.

## Features

- **Public Website**: Home, About, Academics, Admissions, News & Events, Resources, Contact pages
- **Admin Panel**: Secure admin dashboard to manage news, applications, and resources
- **Resource Hub**: Study materials for primary (Grades 1-8) and secondary (Grades 9-12) students
- **Application System**: Online admission application form with status tracking
- **News Management**: Create and manage school news, events, and announcements
- **Responsive Design**: Mobile-friendly interface with professional academic theme

## Tech Stack

### Frontend
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Wouter for routing
- tRPC for type-safe API calls
- Sonner for notifications

### Backend
- Node.js with Express
- tRPC 11 for API
- MySQL with Drizzle ORM
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- MySQL database

### Installation

1. Clone the repository:
```bash
cd addis-ketema-school
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL`: Your MySQL connection string
- `JWT_SECRET`: A long random string for session security
- `ADMIN_PASSWORD`: Password for admin panel login (default: `admin123`)

4. Run database migrations:
```bash
pnpm db:push
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Admin Panel Access

1. Navigate to `http://localhost:3000/admin/login`
2. Enter the admin password (set in `.env` as `ADMIN_PASSWORD`)
3. You'll be redirected to the admin dashboard

From the admin panel, you can:
- Create and manage news/events
- View and update application statuses
- Upload study resources for students
- View statistics and recent activity

## Project Structure

```
addis-ketema-school/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── lib/           # Utilities and tRPC client
│   └── public/            # Static assets (logo, images)
├── server/                # Express backend
│   ├── routers.ts         # tRPC API routes
│   ├── db.ts              # Database queries
│   └── _core/             # Core server infrastructure
├── drizzle/               # Database schema and migrations
│   ├── schema.ts          # Table definitions
│   └── migrations/        # SQL migrations
└── shared/                # Shared types and constants
```

## Database Schema

### Tables

- **users**: User accounts with roles (admin/user)
- **applications**: Student admission applications
- **news_events**: School news, events, and announcements
- **uploaded_files**: Study resources and materials

## Building for Production

```bash
pnpm build
pnpm start
```

## Running Tests

```bash
pnpm test
```

## Customization

### Logo and Branding

- Replace `/client/public/logo.svg` with your school logo
- Update school name and colors in `/client/src/index.css`

### Images

The website uses Unsplash images by default. Replace them with your own:
- Update image URLs in `/client/src/pages/Home.tsx`
- Add your images to `/client/public/` folder

### Admin Password

Change the admin password by updating `ADMIN_PASSWORD` in your `.env` file.

### School Information

Update school details in:
- `/client/src/components/Footer.tsx` (contact info)
- `/client/src/pages/About.tsx` (history, mission, vision)
- `/client/src/pages/Contact.tsx` (contact details)

## Security Notes

- Always use a strong `JWT_SECRET` in production
- Change the default `ADMIN_PASSWORD` immediately
- Use HTTPS in production
- Keep dependencies updated
- Never commit `.env` file to version control

## Support

For issues or questions, refer to the `PROJECT_DOCUMENTATION.md` file for detailed technical documentation.

## License

This project is developed for Addis Ketema General Secondary School.

---

**Contact Information:**
- 📞 +251 11 123 4567
- ✉️ info@addisketema.edu.et
- 📍 Addis Ababa, Ethiopia
