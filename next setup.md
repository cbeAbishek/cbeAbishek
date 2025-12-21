# Project Setup Guide (Concise)

## Backend Setup (Node.js + Prisma v6)
**Keywords**: Node.js, Express, Prisma ORM (@6), SQLite/Postgres, Nodemon

### 1. Initialize & Install
```bash
mkdir backend
cd backend
npm init -y
# Install dependencies (Prisma v6)
npm install express dotenv cors @prisma/client@6
npm install -D prisma@6 nodemon
```

### 2. Initialize Prisma
```bash
npx prisma init
```

### 3. Setup Schema (prisma/schema.prisma)
**Keywords**: Generator, Datasource, Models
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // or postgresql
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

### 4. Database Commands
```bash
# Migration (Local Dev)
npx prisma migrate dev --name init

# Generate Client
npx prisma generate

# View Data (GUI)
npx prisma studio
```

### 5. Server (index.js)
```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
// ... routes ...
app.listen(3000);
```

---

## Frontend Setup (Next.js + Shadcn UI + Lucide)
**Keywords**: Next.js 14/15, TailwindCSS, Shadcn UI, Lucide Icons

### 1. Initialize Next.js
```bash
npx create-next-app@latest frontend --typescript --tailwind --eslint
cd frontend
```

### 2. Initialize Shadcn UI
```bash
npx shadcn-ui@latest init
# Prompts:
# Style: Default
# Base Color: Slate
# CSS Variables: Yes
```

### 3. Install Icons
```bash
npm install lucide-react
```

### 4. Add Components (Shadcn)
```bash
npx shadcn-ui@latest add button input card sheet
```

### 5. Usage Example
```tsx
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function Home() {
  return (
    <div>
      <Button>
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </Button>
    </div>
  )
}
```

### 6. Run Dev Server
```bash
npm run dev
```
