# 🦉 NightOwl — Journal App

A minimal, modern, distraction-free journaling experience designed for night thinkers.

badges:
  - name: Next.js
    url: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"
  - name: TailwindCSS
    url: "https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"
  - name: Clerk
    url: "https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white"
  - name: Prisma
    url: "https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"
  - name: Arcjet
    url: "https://img.shields.io/badge/Arcjet-0A71FF?style=for-the-badge&logoColor=white"

---

description: |
  NightOwl is a sleek journaling app crafted for thoughtful writing in peaceful nighttime environments.
  Built with Next.js App Router, styled using Tailwind, secured with Clerk authentication,
  and structured with Prisma ORM.

features:
  - 📝 Rich Text Editor with React Quill
  - 🔐 Secure authentication using Clerk
  - 🌙 Minimal, dark, aesthetic UI
  - ⚡ Built on top of Next.js App Router
  - 📁 Day-wise journal entries
  - 🧭 Smooth UX and elegant transitions

tech_stack:
  frontend:
    - Next.js 14
    - React
    - Tailwind CSS
    - ShadCN UI
    - React-Quill
  backend:
    - Prisma ORM
    - Clerk Authentication
    - Arcjet Security
  utilities:
    - Inter Google Font

folder_structure: |
  nightowl-journal-app/
   ├─ app/
   │   ├─ (auth)/
   │   ├─ editor/
   │   ├─ layout.js
   │   └─ page.js
   ├─ components/
   ├─ public/
   ├─ prisma/
   ├─ styles/
   ├─ package.json
   └─ README.md

setup:
  clone: "git clone https://github.com/krishnapschauhan/nightowl-journal-app.git"
  install: "npm install"
  environment_variables: |
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
    CLERK_SECRET_KEY=your_key
  dev: "npm run dev"

future_enhancements:
  - 📊 Mood tracking
  - 🗂️ Folder organization
  - 🔔 Daily notifications
  - 📤 Export entries to PDF/TXT

author: "Made with 💙 by Krishna"
