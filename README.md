# 📝 Blog API Project (Node.js)

This is a full-stack blog platform I built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api). It consists of a backend API built with Node.js and Express, and two frontends — one for blog readers and one for content authors.

---

## 🚀 About the Project

The project challenged me to build a fully functional blog API with separate frontends:

- A **reader-facing frontend** where anyone can view blog posts and submit comments.
- An **author dashboard** where authenticated users can create, edit, publish/unpublish posts, and manage comments.

The API handles authentication, CRUD operations for posts and comments, and supports role-based access to different features.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL (locally)
- **Authentication:** JSON Web Tokens (JWT) & Passport local Strategy
- **Frontends:** React (Vite) with TypeScript
- **Styling:** CSS Modules

---

## 🧩 Features I Implemented

### Backend

- Set up RESTful API routes for posts and comments.
- Connected to a PostgreSQL database using Prisma.
- Created relational models: `User`, `Post`, and `Comment`.
- Protected author routes with JWT authentication.
- Allowed nested querying (e.g. include comment authors in post responses).

### Reader Frontend

- Displayed a list of published blog posts.
- Rendered HTML post content safely using `dangerouslySetInnerHTML`.
- Enabled users to add comments to posts.
- Fetched and displayed comments with author info.

### Author Frontend

- Built a dashboard to create, edit, delete, and toggle post visibility.
- Added login functionality and protected routes with tokens.
- Displayed post comments with the ability to delete them.

---

## 💭 What I Gained from This Project

- A deeper understanding of RESTful design and Express middleware.
- Confidence in setting up secure user authentication with JWT.
- Experience integrating a frontend with a real backend API.
- Practice with Prisma relations and nested queries.
- A clearer grasp of managing full-stack projects with multiple UIs.

---

## ✅ Status

✅ Completed  
🔄 Might revisit later to add proper styling

---

Thanks for checking it out!
