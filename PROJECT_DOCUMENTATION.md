# Addis Ketema Secondary School Website - Project Documentation

## Project Overview

This is a comprehensive full-stack website for Addis Ketema Secondary School built with modern web technologies. The project includes a public-facing website with multiple pages, a resource hub for students, and a secure admin panel for school staff management.

## Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Wouter** - Lightweight routing
- **Sonner** - Toast notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express 4** - Web framework
- **tRPC 11** - Type-safe API
- **TypeScript** - Type safety

### Database
- **MySQL** - Relational database
- **Drizzle ORM** - Database toolkit

### Authentication
- **Manus OAuth** - User authentication
- **JWT** - Session management

## Project Structure

```
addis-ketema-school/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Academics.tsx
│   │   │   ├── Admissions.tsx
│   │   │   ├── News.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── PrimaryResources.tsx
│   │   │   ├── SecondaryResources.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminNews.tsx
│   │   │   ├── AdminApplications.tsx
│   │   │   └── AdminResources.tsx
│   │   ├── components/             # Reusable components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AdminLayout.tsx
│   │   ├── App.tsx                 # Main app component
│   │   ├── index.css               # Global styles
│   │   └── lib/trpc.ts             # tRPC client
│   └── public/                     # Static assets
├── server/                         # Express backend
│   ├── routers.ts                  # tRPC procedures
│   ├── db.ts                       # Database queries
│   ├── api.test.ts                 # API tests
│   └── _core/                      # Core infrastructure
├── drizzle/                        # Database schema
│   ├── schema.ts                   # Table definitions
│   └── migrations/                 # SQL migrations
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Database Schema

### Applications Table
Stores student admission applications.
- `id` - Primary key
- `name` - Student name
- `email` - Student email
- `phone` - Contact phone
- `grade` - Applied grade level
- `message` - Additional message
- `status` - Application status (pending, reviewed, accepted, rejected)
- `createdAt` - Submission timestamp
- `updatedAt` - Last update timestamp

### News Events Table
Manages school news, events, and announcements.
- `id` - Primary key
- `title` - Event/news title
- `content` - Event/news content
- `imageUrl` - Associated image URL
- `eventDate` - Event date (for events)
- `category` - Type (news, event, announcement)
- `featured` - Featured flag
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Uploaded Files Table
Stores resource files for the resource hub.
- `id` - Primary key
- `fileName` - File name
- `fileUrl` - File URL (S3 or external storage)
- `fileSize` - File size in bytes
- `mimeType` - File MIME type
- `resourceType` - primary or secondary
- `gradeLevel` - Target grade level
- `subject` - Subject area
- `description` - File description
- `uploadedBy` - User ID who uploaded
- `createdAt` - Upload timestamp
- `updatedAt` - Last update timestamp

## API Endpoints

### Applications
- `POST /api/trpc/applications.submit` - Submit application (public)
- `GET /api/trpc/applications.list` - List applications (admin only)
- `POST /api/trpc/applications.updateStatus` - Update application status (admin only)

### News & Events
- `GET /api/trpc/newsEvents.list` - List news/events (public)
- `GET /api/trpc/newsEvents.getById` - Get single news/event (public)
- `POST /api/trpc/newsEvents.create` - Create news/event (admin only)
- `POST /api/trpc/newsEvents.update` - Update news/event (admin only)
- `POST /api/trpc/newsEvents.delete` - Delete news/event (admin only)

### Resources
- `GET /api/trpc/resources.list` - List resources (public)
- `GET /api/trpc/resources.getById` - Get single resource (public)
- `POST /api/trpc/resources.upload` - Upload resource (admin only)
- `POST /api/trpc/resources.delete` - Delete resource (admin only)

### Authentication
- `GET /api/trpc/auth.me` - Get current user (public)
- `POST /api/trpc/auth.logout` - Logout user (public)

## Pages Overview

### Public Pages

#### Home Page
- Hero section with school tagline
- School introduction
- Highlights section (Academics, Facilities, Achievements)
- Featured news/events
- Call-to-action buttons

#### About Page
- School history
- Mission and vision statements
- Core values
- Principal's message

#### Academics Page
- Programs overview (Grades 9-10, 11-12)
- Curriculum structure
- Teaching methodology
- Assessment and evaluation

#### Admissions Page
- Admission requirements
- Application form (connected to backend)
- Important dates
- Contact information

#### News & Events Page
- Dynamic news and events from database
- Category filtering (News, Events, Announcements)
- Newsletter subscription placeholder

#### Contact Page
- Contact information (phone, email, address)
- Contact form
- FAQ section
- Map placeholder

#### Resources Hub
- Main resources page with Primary and Secondary sections
- **Primary Resources** (Grades 1-8)
  - Grade level filtering (1-4, 5-8)
  - Subject selection (Math, English, Science, etc.)
  - Uploaded files display
  - Links to external Ethiopian resources
- **Secondary Resources** (Grades 9-12)
  - Grade level filtering (9-10, 11-12)
  - Subject selection (Mathematics, Physics, Chemistry, etc.)
  - Uploaded files display
  - Links to external Ethiopian resources

### Admin Pages

#### Admin Dashboard
- Statistics overview (applications, news/events, resources)
- Recent applications list
- Recent news/events list
- Quick action links

#### News & Events Management
- Create new news/events
- View all news/events in table format
- Delete news/events
- Status indicators

#### Applications Management
- View all applications
- Filter by status (pending, reviewed, accepted, rejected)
- Update application status
- View application details

#### Resources Management
- Upload new resources
- Select resource type (primary/secondary)
- Choose grade level and subject
- Manage uploaded resources
- Delete resources

## Features

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional academic theme
- ✅ Form validation
- ✅ Toast notifications
- ✅ Dynamic content loading
- ✅ Category filtering
- ✅ Grade level filtering
- ✅ Subject-based filtering
- ✅ External resource links

### Backend Features
- ✅ Type-safe API with tRPC
- ✅ Role-based access control (admin/user)
- ✅ Form submission handling
- ✅ CRUD operations for news/events
- ✅ CRUD operations for resources
- ✅ Application status management
- ✅ JWT authentication
- ✅ Database query optimization

### Admin Features
- ✅ Secure admin authentication
- ✅ Dashboard with statistics
- ✅ News/events management
- ✅ Application management
- ✅ Resource upload and management
- ✅ User profile and logout
- ✅ Responsive admin interface

## Development Setup

### Prerequisites
- Node.js 22+
- pnpm 10+
- MySQL database

### Installation

1. Clone the repository
```bash
cd /home/ubuntu/addis-ketema-school
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
# Database connection
DATABASE_URL=mysql://user:password@localhost:3306/addis_ketema

# OAuth configuration
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://manus.im/login

# Other secrets
JWT_SECRET=your_jwt_secret
```

4. Run database migrations
```bash
pnpm drizzle-kit migrate
```

5. Start development server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Running Tests

```bash
pnpm test
```

Tests include:
- Authentication tests
- API endpoint tests
- Authorization tests
- Form validation tests

## Building for Production

```bash
pnpm build
pnpm start
```

## Key Implementation Details

### Application Form Integration
The admissions page includes a fully functional application form that:
- Validates user input
- Submits to the backend API
- Displays success/error messages
- Stores data in the MySQL database

### News & Events Management
The news/events system allows admins to:
- Create news, events, and announcements
- Set featured status
- Schedule event dates
- Delete entries
- Public users can view and filter by category

### Resources Hub
The resources section provides:
- Organized by grade level (Primary/Secondary)
- Filtered by subject
- Display of uploaded files with download links
- Links to external Ethiopian educational resources
- Admin interface for file upload

### Admin Authentication
- Uses Manus OAuth for secure login
- JWT tokens for session management
- Role-based access control (admin/user)
- Protected admin routes

## External Resources

The Resources hub includes links to:
- Ethiopian Ministry of Education
- Addis Ababa Science & Technology Park
- Ethiopian Education Network
- Open Educational Resources

## Styling

The website uses:
- Tailwind CSS 4 for utility-first styling
- Professional blue color scheme
- Responsive grid layouts
- Custom component styles
- Google Fonts (Inter, Poppins)

## Performance Considerations

- Lazy loading of images
- Optimized database queries
- Efficient component rendering
- Minimal JavaScript bundle
- Server-side rendering ready

## Security Measures

- JWT token-based authentication
- Role-based access control
- Input validation on forms
- SQL injection prevention (via ORM)
- CORS configuration
- Secure password handling

## Future Enhancements

Potential features for future development:
- Student portal with grades and attendance
- Parent communication system
- Online class scheduling
- Automated email notifications
- Payment processing for fees
- Advanced analytics dashboard
- Multi-language support
- Mobile app

## Support & Maintenance

For issues or questions:
- Check the project documentation
- Review the API test suite
- Check database migrations
- Review error logs

## License

This project is developed for Addis Ketema Secondary School.

## Contact

For more information about the school:
- 📞 +251 11 123 4567
- ✉️ info@addisketema.edu.et
- 📍 Addis Ababa, Ethiopia
