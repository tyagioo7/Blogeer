# Blogeer

A full-stack blogging platform built from scratch using **HTML, CSS, JavaScript, Node.js, Express.js, and MySQL**.

Blogeer has a public blog interface where users can read posts, along with an admin panel where posts can be created, edited, and deleted.

## About the Project

I built Blogeer as a full-stack project to practice and demonstrate how a real-world web application works from frontend to backend and database.

The project includes:

* Public blog pages
* Admin login
* Admin dashboard
* Create, edit, and delete posts
* Categories and tags
* MySQL database
* REST APIs
* JWT-based authentication
* Protected admin routes
* Backend validation and error handling

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* Bootstrap

### Backend

* Node.js
* Express.js
* JWT
* bcryptjs
* CORS
* dotenv

### Database

* MySQL

### Development Tools

* VS Code
* MySQL Workbench
* Thunder Client
* Git & GitHub

## Project Structure

```text
Blogeer/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── HTML files
│   ├── CSS files
│   ├── JavaScript files
│   └── img/
│
├── .gitignore
└── README.md
```

## How Blogeer Works

The project follows a simple full-stack flow:

```text
Frontend
   ↓
REST API
   ↓
Express.js Server
   ↓
Controllers
   ↓
MySQL Database
```

For example, when an admin creates a post:

```text
Admin Form
    ↓
POST /api/posts
    ↓
Express Route
    ↓
Post Controller
    ↓
MySQL
    ↓
Post Created
```

## Main API Endpoints

### Authentication

```text
POST /api/auth/login
```

Used for admin authentication.

### Posts

```text
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
```

These endpoints handle reading and managing blog posts.

## Database

The project uses MySQL with the following main tables:

```text
users
categories
tags
posts
post_tags
```

The `post_tags` table connects posts and tags using a many-to-many relationship.

The `posts` table stores information such as:

* Title
* Slug
* Content
* Cover image
* Status
* Author
* Category
* Created date
* Updated date

## Authentication

The admin panel uses authentication to protect administrative operations.

Passwords are hashed using **bcryptjs**, while **JWT** is used to authenticate protected API requests.

The basic flow is:

```text
Admin Login
    ↓
Server verifies credentials
    ↓
JWT token generated
    ↓
Frontend stores token
    ↓
Protected requests include token
    ↓
Middleware verifies token
    ↓
Request allowed
```

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/tyagioo7/Blogeer.git
cd Blogeer
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder.

Example:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=blogeer_db
DB_PORT=3306
JWT_SECRET=your_secret_key
PORT=3000
```

### 4. Start the backend

```bash
node server.js
```

The server runs on:

```text
http://localhost:3000
```

### 5. Open the frontend

Open the frontend HTML files using VS Code Live Server or another local development server.

## Admin Panel

The admin panel allows the administrator to:

* Login
* View existing posts
* Add new posts
* Edit posts
* Delete posts
* Manage post status

The admin dashboard communicates with the Express backend through REST APIs.

## What I Learned

While building Blogeer, I worked with:

* REST API development
* Express routing
* Controllers and middleware
* MySQL relationships
* SQL queries
* Authentication and authorization
* Password hashing
* JWT
* Frontend API integration
* CRUD operations
* Error handling
* Git and GitHub
* Connecting frontend, backend, and database

## Current Status

The core full-stack Blogeer application is working with:

* Public blog interface
* Admin authentication
* Admin dashboard
* Post CRUD operations
* MySQL database
* REST API
* Protected backend routes

## Future Improvements

Some improvements I would like to add later:

* Image upload instead of image URLs
* Rich text editor for writing posts
* Better form validation
* Pagination
* Search improvements
* Deployment
* Production database
* Better admin analytics

## Author

**Vaibhav Tyagi**

GitHub: https://github.com/tyagioo7

git statusgit status

Built as a learning project to understand how a complete full-stack application is designed and connected together.
