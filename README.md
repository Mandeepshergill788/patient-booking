# Patient Booking App

## Overview

A simple patient appointment booking application built with Next.js, Prisma, SQLite, and Tailwind CSS.

The app allows patients to:
- Select a physician
- Choose an available appointment slot
- Submit booking details

It also includes a simple admin-facing bookings view.

---

## Features

- Physician selection
- Appointment slot booking
- Booking status tracking
- Admin bookings dashboard
- Responsive UI
- Prisma + SQLite database

---

## Tech Stack

- Next.js
- TypeScript
- Prisma ORM
- SQLite
- Tailwind CSS

---

## Running the Project

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## Database Setup

Run migrations:

```bash
npx prisma migrate dev
```

Seed sample data:

```bash
npx tsx prisma/seed.ts
```

---

## Key Technical Decisions

- Used SQLite for simplicity and fast setup
- Used Prisma ORM for clean database access
- Used Tailwind CSS for rapid UI development
- Focused on clean UX and clear booking flow rather than production-scale infrastructure

---

## Future Improvements

With more time, I would improve:

- Authentication and role-based access
- Real-time slot availability
- Calendar integrations
- Email confirmations
- Better form validation
- Pagination/filtering for admin dashboard
- Production database deployment
