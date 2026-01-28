# Work Sweet

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [Code Style & Standards](#code-style--standards)
7. [Testing](#testing)
8. [Submitting Changes](#submitting-changes)
9. [Architecture Decisions](#architecture-decisions)
10. [Common Tasks](#common-tasks)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

Work Sweet is a full-stack project management application designed to solve the "cluttered UI" problem that plagues most PM tools. Our core differentiators:

- **Frictionless Task Creation**: Single-input interface that intelligently converts to title/description
- **Slash Commands**: Notion-style quick actions for adding metadata
- **Keyboard-First**: Power users shouldn't need a mouse
- **Visual Clarity**: Bold, eye-popping colors for instant task parsing
- **Modern Stack**: Built with the latest tools for performance and DX

### Design Philosophy

1. **Minimize friction** - Every feature should reduce cognitive load
2. **Keyboard accessibility** - Everything should work without a mouse
3. **Visual hierarchy** - Color and contrast convey information instantly
4. **Performance matters** - Fast is a feature
5. **Clean code** - Readable > clever

---

## Tech Stack

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken + bcryptjs)
- **Validation**: Custom utilities (see `src/utils/validation.ts`)

### Frontend (Day 2 - Coming Soon)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Lupine UI (custom shadcn library)
- **State Management**: Zustand + React Query
- **Drag & Drop**: @dnd-kit

### Infrastructure

- **Development**: Docker Compose (PostgreSQL)
- **Deployment**: Railway (backend), Vercel (frontend)
- **Version Control**: Git + GitHub

---

## Getting Started

### Prerequisites

```bash
# Required
node >= 18.0.0
npm >= 9.0.0
docker >= 20.0.0
docker-compose >= 2.0.0

# Optional but recommended
git >= 2.30.0
```

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:YOUR_USERNAME/work-sweet.git
   cd work-sweet
   ```

2. **Start the database**

   ```bash
   docker-compose up -d

   # Verify it's running
   docker ps
   # Should see: worksweet-db
   ```

3. **Set up the backend**

   ```bash
   cd backend
   npm install

   # Copy environment template
   cp .env.example .env

   # Edit .env if needed (defaults should work for local dev)

   # Run database migrations
   npm run prisma:migrate

   # Seed demo data
   npm run prisma:seed

   # Start development server
   npm run dev
   ```

4. **Verify backend is running**

   ```bash
   curl http://localhost:8080/api/health

   # Expected response:
   # {
   #   "status": "UP",
   #   "service": "Work Sweet API",
   #   "timestamp": "2025-01-28T..."
   # }
   ```

5. **Test with demo account**
   - Email: `demo@worksweet.dev`
   - Password: `demo123`

### Frontend Setup (Coming Day 2)

```bash
cd frontend
npm install
npm run dev
```

---

## Project Structure

```
work-sweet/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/            # Configuration (Prisma client, etc.)
│   │   │   └── prisma.ts
│   │   ├── controllers/       # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── projectController.ts
│   │   │   └── taskController.ts
│   │   ├── middleware/        # Express middleware
│   │   │   ├── auth.ts        # JWT authentication
│   │   │   └── errorHandler.ts
│   │   ├── routes/            # API route definitions
│   │   │   ├── authRoutes.ts
│   │   │   ├── projectRoutes.ts
│   │   │   └── taskRoutes.ts
│   │   ├── services/          # Business logic
│   │   │   ├── authService.ts
│   │   │   ├── projectService.ts
│   │   │   └── taskService.ts
│   │   ├── utils/             # Shared utilities
│   │   │   ├── errors.ts      # Custom error classes
│   │   │   ├── jwt.ts         # JWT token utilities
│   │   │   ├── password.ts    # Password hashing
│   │   │   └── validation.ts  # Input validation
│   │   └── index.ts           # Express app entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Demo data seeder
│   ├── docs/                  # API documentation
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
├── frontend/                   # Next.js app (Day 2)
│   └── [Coming soon]
├── docker-compose.yml          # Local PostgreSQL
├── .gitignore
└── README.md
```

### Key Files to Know

| File                              | Purpose                                  |
| --------------------------------- | ---------------------------------------- |
| `backend/src/index.ts`            | Express server setup, middleware, routes |
| `backend/prisma/schema.prisma`    | Database models & relationships          |
| `backend/src/middleware/auth.ts`  | JWT authentication logic                 |
| `backend/src/utils/validation.ts` | Reusable validation functions            |
| `backend/src/services/*.ts`       | Business logic (keep controllers thin)   |

---

## Development Workflow

### Branch Strategy

```bash
main              # Production-ready code
├── develop       # Integration branch (coming soon)
└── feature/*     # Feature branches
    └── bugfix/*  # Bug fix branches
```

### Creating a Feature Branch

```bash
# Always branch from main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/slash-command-menu

# Work on your feature...

# Commit with meaningful messages
git commit -m "feat: implement slash command menu component"
```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build config, etc.)

**Examples:**

```bash
feat(tasks): add drag and drop support
fix(auth): resolve JWT expiration edge case
docs(readme): update contributor guide
refactor(validation): extract common patterns
```

### Making Changes

1. **Create an issue first** (for non-trivial changes)
   - Describe the problem/feature
   - Propose a solution
   - Get feedback before coding

2. **Write tests** (when applicable)
   - Unit tests for utilities
   - Integration tests for API endpoints

3. **Follow code style** (see below)

4. **Update documentation**
   - README if setup changes
   - API docs if endpoints change
   - Code comments for complex logic

---

## Code Style & Standards

### TypeScript

```typescript
// ✅ Good: Explicit types
interface CreateTaskData {
  title: string;
  description?: string;
  projectId: string;
}

// ❌ Bad: Implicit any
const createTask = (data) => { ... }

// ✅ Good: Use const for immutable values
const API_URL = 'http://localhost:8080';

// ❌ Bad: Use let when const works
let API_URL = 'http://localhost:8080';
```

### Naming Conventions

```typescript
// Files: camelCase.ts
authService.ts;
projectController.ts;

// Interfaces: PascalCase
interface UserData {}
interface JwtPayload {}

// Functions: camelCase
const getUserById = () => {};
const validateEmail = () => {};

// Constants: UPPER_SNAKE_CASE
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

// Variables: camelCase
const currentUser = await getUser();
const isValid = validateInput(data);
```

### Error Handling

```typescript
// ✅ Good: Use custom error classes
import { NotFoundError, ValidationError } from "../utils/errors";

if (!user) {
  throw new NotFoundError("User not found");
}

// ✅ Good: Catch and pass to error handler
export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error); // Let error handler middleware deal with it
  }
};

// ❌ Bad: Silent failures
const user = await userService.getById(id);
if (!user) return; // Where did the error go?

// ❌ Bad: Generic error messages
throw new Error("Something went wrong"); // Not helpful
```

### Service Layer Pattern

Keep controllers thin, business logic in services:

```typescript
// ✅ Good: Thin controller
export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.createProject(req.user!.id, req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Service has the logic
export const createProject = async (userId: string, data: CreateProjectData) => {
  validateRequired(data.name, 'Project name');
  validateStringLength(data.name, 1, 100, 'Project name');

  // ... business logic ...

  return project;
};

// ❌ Bad: Fat controller with business logic
export const createProject = async (req, res, next) => {
  try {
    // Validation in controller
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name required' });
    }

    // Database logic in controller
    const project = await prisma.project.create({ ... });

    res.json(project);
  } catch (error) {
    next(error);
  }
};
```

### Validation Pattern

```typescript
// ✅ Good: Validate early in service layer
export const createTask = async (userId: string, data: CreateTaskData) => {
  // Validate first
  validateRequired(data.title, 'Title');
  validateStringLength(data.title, 1, 255, 'Title');
  validateRequired(data.projectId, 'Project ID');

  // Then business logic
  const project = await prisma.project.findFirst({ ... });
  if (!project) {
    throw new NotFoundError('Project not found');
  }

  // Finally, create
  return prisma.task.create({ ... });
};

// ❌ Bad: Mixed validation and logic
export const createTask = async (userId: string, data: CreateTaskData) => {
  const project = await prisma.project.findFirst({ ... });

  if (!data.title) throw new Error('Title required'); // Too late!

  return prisma.task.create({ ... });
};
```

### Database Queries

```typescript
// ✅ Good: Select only needed fields
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    name: true,
    email: true,
    // Don't fetch password!
  },
});

// ✅ Good: Include related data when needed
const task = await prisma.task.findFirst({
  where: { id: taskId },
  include: {
    project: {
      select: { id: true, name: true, color: true },
    },
    assignedTo: {
      select: { id: true, name: true, avatarColor: true },
    },
  },
});

// ❌ Bad: Fetch everything
const user = await prisma.user.findUnique({
  where: { id: userId },
  // Fetches password, all relations, etc.
});
```

### Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Calculate position as last in column to maintain sort order
const newPosition = maxPositionTask ? maxPositionTask.position + 1 : 0;

// ✅ Good: Document complex logic
/**
 * Generates JWT token with user payload
 * @param payload - User identification data
 * @returns Signed JWT token string
 * @throws Error if JWT_SECRET is not configured
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// ❌ Bad: Obvious comments
// Create a new user
const user = await prisma.user.create({ ... });

// ❌ Bad: Commented-out code
// const oldValidation = (email) => { ... }
// This was the old way, keeping for reference
```

---

## Testing

### Running Tests (Coming Soon)

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Manual Testing with Postman

1. Import collection: `backend/docs/Work-Sweet-API.postman_collection.json`
2. Set `baseUrl` variable to `http://localhost:8080`
3. Run "Auth" → "Login" to get token
4. Token auto-saves to `token` variable
5. Test other endpoints

### Testing Checklist for New Features

- [ ] Happy path works
- [ ] Error cases handled (validation, not found, unauthorized)
- [ ] Edge cases covered (empty strings, nulls, etc.)
- [ ] Authentication required where appropriate
- [ ] Authorization checks (can't access other users' data)
- [ ] Database transactions where needed

---

## Submitting Changes

### Pull Request Process

1. **Update your branch**

   ```bash
   git checkout main
   git pull origin main
   git checkout feature/your-feature
   git rebase main
   ```

2. **Run checks**

   ```bash
   # Type check
   npm run build

   # Lint (when configured)
   npm run lint

   # Tests (when available)
   npm run test
   ```

3. **Push your branch**

   ```bash
   git push origin feature/your-feature
   ```

4. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out PR template:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

How was this tested?

## Checklist

- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

5. **Address Review Comments**
   - Make requested changes
   - Push new commits
   - Reply to comments

6. **Merge**
   - Squash commits if requested
   - Delete feature branch after merge

---

## Architecture Decisions

### Why Prisma?

**Chosen over TypeORM/Sequelize because:**

- Type-safe database access
- Excellent TypeScript support
- Migration system is straightforward
- Great developer experience
- Active development

### Why Express over NestJS/Fastify?

**Chosen for:**

- Simplicity and familiarity
- Massive ecosystem
- Easy to understand for contributors
- Battle-tested in production
- Flexibility (no opinions forced)

### Why JWT over Sessions?

**Chosen for:**

- Stateless authentication
- Works across multiple servers
- Easy frontend integration
- No session storage needed
- Industry standard for APIs

### Why Separate Services from Controllers?

**Separation of concerns:**

- Controllers handle HTTP (req/res)
- Services handle business logic
- Easier to test services in isolation
- Can reuse services across controllers
- Cleaner code organization

### Why Custom Validation over Class-Validator?

**Chosen for:**

- Simpler for small project
- No decorators needed
- Clear error messages
- Easy to customize
- Explicit validation location

**Trade-off:** Less powerful than class-validator, but sufficient for our needs.

---

## Common Tasks

### Adding a New API Endpoint

1. **Update Prisma schema** (if new data model)

   ```prisma
   model NewModel {
     id        String   @id @default(cuid())
     name      String
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

2. **Run migration**

   ```bash
   npm run prisma:migrate
   ```

3. **Create service** (`src/services/newModelService.ts`)

   ```typescript
   export const getAllItems = async (userId: string) => { ... }
   export const createItem = async (userId: string, data: CreateData) => { ... }
   ```

4. **Create controller** (`src/controllers/newModelController.ts`)

   ```typescript
   export const getAllItems = async (
     req: AuthRequest,
     res: Response,
     next: NextFunction,
   ) => {
     try {
       const items = await newModelService.getAllItems(req.user!.id);
       res.json(items);
     } catch (error) {
       next(error);
     }
   };
   ```

5. **Create routes** (`src/routes/newModelRoutes.ts`)

   ```typescript
   import { Router } from "express";
   import { authenticate } from "../middleware/auth";
   import * as controller from "../controllers/newModelController";

   const router = Router();
   router.use(authenticate);
   router.get("/", controller.getAllItems);
   router.post("/", controller.createItem);

   export default router;
   ```

6. **Register routes** (`src/index.ts`)

   ```typescript
   import newModelRoutes from "./routes/newModelRoutes";
   app.use("/api/new-model", newModelRoutes);
   ```

7. **Test with Postman**

8. **Update API documentation**

### Adding Database Migrations

```bash
# Create migration from schema changes
npm run prisma:migrate

# Name your migration descriptively
# Example: "add_checklist_items_table"

# Apply migration
# (already done by migrate command)

# Regenerate Prisma Client
npm run prisma:generate
```

### Debugging Tips

**Enable Prisma query logging:**

```typescript
// src/config/prisma.ts
const prisma = new PrismaClient({
  log: ["query", "error", "warn"], // See all database queries
});
```

**Check database directly:**

```bash
# Open Prisma Studio (GUI)
npm run prisma:studio

# Or use psql
docker exec -it worksweet-db psql -U worksweet -d worksweet
```

**Check request/response:**

```typescript
// Add to middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

### Resetting Database

```bash
# WARNING: Deletes all data!

# Reset and rerun migrations
npm run prisma:migrate reset

# Re-seed data
npm run prisma:seed
```

---

## Troubleshooting

### Database Connection Issues

**Problem:** `Can't reach database server`

**Solution:**

```bash
# Check if PostgreSQL is running
docker ps

# If not, start it
docker-compose up -d

# Check logs
docker logs worksweet-db

# Verify connection string in .env
DATABASE_URL="postgresql://worksweet:worksweet_dev_pass@localhost:5432/worksweet"
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::8080`

**Solution:**

```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 [PID]

# Or change port in .env
PORT=8081
```

### Prisma Client Not Generated

**Problem:** `Cannot find module '@prisma/client'`

**Solution:**

```bash
# Generate Prisma Client
npm run prisma:generate

# If still failing, reinstall
rm -rf node_modules
npm install
```

### TypeScript Compilation Errors

**Problem:** Type errors when running `npm run dev`

**Solution:**

```bash
# Check TypeScript configuration
cat tsconfig.json

# Clear build cache
rm -rf dist/

# Rebuild
npm run build
```

### JWT Token Issues

**Problem:** `Invalid or expired token`

**Solutions:**

1. Check JWT_SECRET in `.env` matches what generated the token
2. Token might be expired (default 24h)
3. Check Authorization header format: `Bearer <token>`
4. Re-login to get fresh token

### Migration Conflicts

**Problem:** `Migration ... already applied`

**Solution:**

```bash
# Mark migration as applied without running
npx prisma migrate resolve --applied [migration-name]

# Or reset (WARNING: deletes data)
npm run prisma:migrate reset
```

---

## Getting Help

### Resources

- **Documentation**: Check `/backend/README.md` for API docs
- **Issues**: Search [GitHub Issues](https://github.com/YOUR_USERNAME/work-sweet/issues)
- **Prisma Docs**: https://www.prisma.io/docs
- **Express Docs**: https://expressjs.com
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/

### Asking Questions

When asking for help, please include:

1. **What you're trying to do**
2. **What you expected to happen**
3. **What actually happened**
4. **Error messages** (full stack trace)
5. **Code snippet** (relevant part)
6. **Environment** (OS, Node version, etc.)

**Good question:**

```
I'm trying to add a new field to the Task model. I updated the Prisma
schema and ran `npm run prisma:migrate`, but I'm getting this error:

Error: Type 'string | undefined' is not assignable to type 'string'

Here's my schema change:
[code snippet]

And the error occurs in taskService.ts line 45:
[code snippet]

Running on macOS, Node 18.17.0
```

**Bad question:**

```
It doesn't work. Help?
```

---

## Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Credited in release notes
- Thanked publicly (if they want)

Significant contributions may result in:

- Maintainer access
- Direct communication with project lead
- Input on roadmap decisions

---

## Code of Conduct

### Our Standards

- **Be respectful** - Disagreements happen, stay professional
- **Be inclusive** - Welcome contributors of all backgrounds
- **Be constructive** - Criticize code, not people
- **Be patient** - Everyone was new once
- **Be helpful** - Share knowledge freely

### Unacceptable Behavior

- Harassment, discrimination, or hate speech
- Personal attacks or insults
- Trolling or deliberately inflammatory comments
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Violations may result in:

1. Warning
2. Temporary ban
3. Permanent ban

Report issues to: [maintainer email]

---

## Project Roadmap

### Current Status (Day 1 Complete)

- ✅ Node.js + Express backend
- ✅ PostgreSQL + Prisma ORM
- ✅ JWT authentication
- ✅ Project CRUD
- ✅ Task CRUD with filters
- ✅ Drag & drop positioning

### Day 2 (In Progress)

- [ ] Next.js frontend
- [ ] Lupine UI integration
- [ ] QuickTaskInput component ⭐
- [ ] Slash command menu ⭐
- [ ] Kanban board
- [ ] Visual color system

### Phase 2 (Future)

- [ ] Keyboard shortcuts (Cmd+K palette)
- [ ] Multiple views (List, Calendar)
- [ ] Smart text import
- [ ] Real-time collaboration
- [ ] Mobile app

### Contribution Opportunities

**Good First Issues:**

- Add email validation to user registration
- Improve error messages
- Add API rate limiting
- Write unit tests for validation utilities
- Add API documentation

**Medium Complexity:**

- Implement checklist item CRUD
- Add task search functionality
- Implement task comments
- Add file attachments to tasks
- User profile endpoints

**Advanced:**

- Real-time updates (WebSockets)
- Notification system
- Activity feed
- Advanced filtering
- Bulk operations

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Thank You!

Every contribution, no matter how small, makes Work Sweet better. Whether you're:

- Fixing a typo in the docs
- Reporting a bug
- Suggesting a feature
- Submitting code

**You're making a difference.** Thank you for being part of this project! 🚀

---

**Questions?** Open an issue or reach out to the maintainers.

**Ready to contribute?** Pick an issue and let's build something awesome together!

---

_Last updated: January 28, 2025_ work-sweet
