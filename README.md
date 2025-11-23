# Job Agency System

A comprehensive job agency platform connecting job seekers, employers, and training centers.

## 🎯 Project Overview

**Student:** Htet Naing (ID: 001474419)
**Course:** B.Sc (Hons) Computing - Final Year Project
**Project Title:** Research and Development of Job Agency System

### Features

#### For Job Seekers
- ✅ Single resume/CV upload (no repetitive paperwork)
- ✅ Personalized job recommendations
- ✅ Application progress tracking
- ✅ Employer feedback on applications
- ✅ Advanced job search with filters

#### For Employers
- ✅ Centralized job posting platform
- ✅ Filtered candidate applications
- ✅ Interview scheduling system
- ✅ Application management dashboard
- ✅ Track hiring outcomes

#### For Training Centers (Planned)
- 🔄 List training courses
- 🔄 Connect with employers
- 🔄 Revenue through commissions

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.5.3 (React 19)
- **UI Library:** Ant Design 5.27.3
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand 5.0.8
- **Language:** TypeScript 5

### Backend
- **Runtime:** Node.js with Express 4.16.1
- **Database:** MongoDB with Mongoose 8.18.2
- **Authentication:** JWT (jsonwebtoken 9.0.2) + bcryptjs 3.0.2
- **File Uploads:** Multer 2.0.2
- **CORS:** Enabled for local development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **pnpm** (comes with Node.js)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HtetNaing1/job-agency.git
cd job-agency
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file (already created as .env.development.local)
# Edit if you need to change the MongoDB URI or ports

# Start MongoDB (if not already running)
# On macOS with Homebrew:
brew services start mongodb-community

# On Windows, MongoDB should start automatically as a service
# Or manually: mongod --dbpath <path-to-data-directory>

# On Linux:
sudo systemctl start mongod

# Run the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# The environment file is already created as .env.local
# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
job-agency/
├── client/                    # Frontend (Next.js)
│   ├── src/
│   │   ├── app/              # App router pages
│   │   │   ├── applicant-profile/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── employer-dashboard/
│   │   │   ├── job-dashboard/
│   │   │   ├── job-post/
│   │   │   ├── jobs/
│   │   │   ├── onboarding/
│   │   │   └── profile/
│   │   ├── components/       # React components
│   │   │   ├── atoms/        # Basic UI components
│   │   │   ├── molecules/    # Composite components
│   │   │   ├── organisms/    # Complex components
│   │   │   └── templates/    # Page templates
│   │   ├── config/           # API configuration
│   │   ├── lib/              # Utility libraries (auth, etc.)
│   │   └── utils/            # Helper functions
│   ├── .env.local            # Frontend environment variables
│   └── package.json
│
├── server/                    # Backend (Express)
│   ├── config/               # Configuration files
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Express middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── services/             # Business logic
│   ├── uploads/              # File upload storage
│   ├── utils/                # Utility functions
│   ├── .env.development.local # Backend environment variables
│   ├── index.js              # Server entry point
│   └── package.json
│
└── README.md                  # This file
```

## 🔑 Environment Variables

### Backend (.env.development.local)

```env
PORT=5000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/job-agency
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production-67890
CLIENT_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🗄️ Database Models

### User
- Supports three roles: `jobseeker`, `employer`, `trainingProvider`
- Password hashing with bcryptjs
- Email uniqueness validation

### JobPosting
- Complete job details (title, description, requirements, etc.)
- Salary range and benefits
- Skills, experience, and education requirements
- Employment type and work mode (remote/hybrid/on-site)
- Application deadline tracking

### Application
- Job seeker applications to job postings
- Status tracking (pending, reviewed, shortlisted, interviewed, hired, rejected)
- Resume/cover letter file uploads
- Employer notes and feedback

### RefreshToken
- Secure token rotation for authentication

## 🔐 API Endpoints

### Authentication (`/auth`)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

### Jobs (`/api/v1/jobs`)
- `GET /api/v1/jobs` - Get all jobs (with filters)
- `POST /api/v1/jobs` - Create job (employer only)
- `GET /api/v1/jobs/:id` - Get job by ID
- `PUT /api/v1/jobs/:id` - Update job (employer only)
- `DELETE /api/v1/jobs/:id` - Delete job (employer only)
- `GET /api/v1/jobs/my-postings` - Get employer's jobs
- `GET /api/v1/jobs/:id/applications` - Get job applications (employer only)

### Applications (`/api/v1/applications`)
- `POST /api/v1/applications` - Submit application (job seeker)
- `GET /api/v1/applications` - Get my applications
- `GET /api/v1/applications/:id` - Get application by ID
- `PUT /api/v1/applications/:id/status` - Update status (employer)
- `PUT /api/v1/applications/:id/withdraw` - Withdraw application (job seeker)
- `DELETE /api/v1/applications/:id` - Delete application (job seeker)

### Uploads (`/api/v1/upload`)
- `POST /api/v1/upload` - Upload files (resume, cover letter, etc.)

## 🧪 Testing

### Test User Accounts

You can create test accounts using the registration endpoint:

**Job Seeker:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "jobseeker"
}
```

**Employer:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "employer",
  "companyName": "Tech Corp"
}
```

## 📝 Development Workflow

### Atomic Design Pattern

The project follows atomic design principles:
- **Atoms:** Basic building blocks (buttons, inputs, icons)
- **Molecules:** Simple component combinations
- **Organisms:** Complex UI sections
- **Templates:** Page-level layouts
- **Pages:** Specific instances of templates

### Agile Methodology

Development follows Agile Scrum with:
- Sprint-based development
- MoSCoW prioritization
- Timeboxing for features

## 🚧 Known Issues & Limitations

1. **Training Center Module:** Not yet implemented (planned feature)
2. **Email Notifications:** Backend has nodemailer but not configured
3. **File Storage:** Currently local storage (uploads folder)
4. **Smart Job Matching:** Basic filtering implemented, AI-based recommendations pending

## 🔮 Future Enhancements

- [ ] Training center integration
- [ ] AI-powered job recommendations
- [ ] Email notification system
- [ ] Calendar integration for interviews
- [ ] Video interview scheduling
- [ ] Advanced analytics dashboard
- [ ] Cloud file storage (AWS S3)
- [ ] Mobile app (React Native)

## 🤝 Contributing

This is a university project. For feedback or suggestions:
- Create an issue on GitHub
- Contact: Htet Naing (ID: 001474419)

## 📄 License

This project is for academic purposes (B.Sc Computing Final Year Project)

## 🙏 Acknowledgments

- University project supervisor
- Next.js and React documentation
- MongoDB documentation
- Ant Design component library

## 📞 Support

For issues or questions:
1. Check the [Issues](https://github.com/HtetNaing1/job-agency/issues) page
2. Review the project proposal document
3. Contact the project supervisor

---

**Built with ❤️ by Htet Naing** | B.Sc (Hons) Computing Final Year Project
