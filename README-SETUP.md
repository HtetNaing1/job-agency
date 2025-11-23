# Job Agency - Setup Instructions

## Prerequisites
- Node.js 18+ installed
- Docker and Docker Compose (for local MongoDB)
- OR MongoDB Atlas account (for cloud database)

## Setup Options

### Option 1: Local Development with Docker (Recommended)

1. **Install Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop

2. **Start MongoDB**
   ```bash
   docker-compose up -d
   ```

3. **Install Dependencies**
   ```bash
   # Backend
   cd server && npm install

   # Frontend (in a new terminal)
   cd client && npm install
   ```

4. **Start Development Servers**
   ```bash
   # Backend (from server directory)
   npm run dev

   # Frontend (from client directory, in a new terminal)
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Option 2: MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free tier cluster

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

3. **Update Backend Environment**
   - Edit `server/.env.development.local`
   - Replace `DB_URI` with your MongoDB Atlas connection string:
     ```
     DB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-agency
     ```

4. **Install Dependencies and Start Servers**
   ```bash
   # Backend
   cd server && npm install && npm run dev

   # Frontend (in a new terminal)
   cd client && npm install && npm run dev
   ```

## Environment Variables

### Backend (`server/.env.development.local`)
```env
PORT=5000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/job-agency  # or your MongoDB Atlas URI
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production-67890
CLIENT_URL=http://localhost:3000
```

### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Troubleshooting

### MongoDB Connection Issues
- **Error: `connect ECONNREFUSED 127.0.0.1:27017`**
  - Make sure MongoDB is running (`docker-compose up -d`)
  - Or check your MongoDB Atlas connection string

### Port Already in Use
- **Backend port 5000 in use:**
  ```bash
  # Find and kill the process
  lsof -ti:5000 | xargs kill -9
  ```
- **Frontend port 3000 in use:**
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

## Project Structure
```
job-agency/
├── client/           # Next.js frontend
│   ├── src/
│   │   ├── app/     # Next.js pages
│   │   ├── components/
│   │   ├── services/ # API service layer
│   │   └── config/   # Configuration
│   └── package.json
├── server/           # Express.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
└── docker-compose.yml
```

## API Endpoints
- POST `/auth/register` - User registration
- POST `/auth/login` - User login
- POST `/auth/refresh` - Refresh access token
- GET `/api/v1/jobs` - Get all jobs
- GET `/api/v1/jobs/:id` - Get job by ID
- POST `/api/v1/jobs` - Create job (employer only)
- POST `/api/v1/applications` - Apply for job
- GET `/api/v1/applications` - Get user applications
- POST `/api/v1/upload` - Upload resume/files
