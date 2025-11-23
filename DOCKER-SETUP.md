# Docker Setup Guide for Job Agency System

## Prerequisites
- Docker installed on your system
- Docker Compose installed

## Quick Start

### 1. Stop any running local servers
```bash
# Kill any processes on ports 3001 and 5500
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:5500 | xargs kill -9 2>/dev/null
```

### 2. Build and start all services with Docker Compose
```bash
cd /Users/hydrrax/Projects/FinalPrj/job-agency
docker-compose up --build
```

Or run in detached mode (background):
```bash
docker-compose up -d --build
```

### 3. Access the application
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5500

## Docker Commands

### View running containers
```bash
docker-compose ps
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Stop all services
```bash
docker-compose down
```

### Restart a specific service
```bash
docker-compose restart frontend
docker-compose restart backend
```

### Rebuild a specific service
```bash
docker-compose up -d --build frontend
docker-compose up -d --build backend
```

### Access container shell
```bash
docker exec -it job-agency-frontend sh
docker exec -it job-agency-backend sh
```

### Clean up (remove containers, networks, and volumes)
```bash
docker-compose down -v
```

## Troubleshooting

### Port already in use
If you get "port already in use" errors:
```bash
# Find and kill the process
lsof -ti:3001 | xargs kill -9
lsof -ti:5500 | xargs kill -9

# Then restart docker-compose
docker-compose up
```

### Changes not reflecting
If your code changes aren't showing up:
```bash
# Rebuild the containers
docker-compose up --build

# Or rebuild specific service
docker-compose up -d --build frontend
```

### Clear everything and start fresh
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## Development Workflow

### Running locally (without Docker)
If you prefer to run without Docker:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### Switching between Docker and local
1. Stop Docker containers: `docker-compose down`
2. Start local servers as shown above

Or vice versa:
1. Stop local servers
2. Start Docker: `docker-compose up`

## Notes

- Both services use hot-reload, so code changes will reflect automatically
- MongoDB connection string should be in `server/.env.development.local`
- Frontend env vars should be in `client/.env.local`
- Uploaded files are persisted in `server/uploads/` directory
