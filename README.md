# AccessForge
AccessForge is a MERN stack-based User Access Management System featuring secure JWT authentication, role-based access control (RBAC), and an admin dashboard. Easily manage users, roles, and permissions with a scalable backend and protected React frontend. Ideal for modern web apps.
Absolutely! Here's a detailed and professional **README section** explaining the **backend** for your project **AccessForge** — suitable to add in your `README.md` file on GitHub.

## 🛠️ Backend – AccessForge

The backend of **AccessForge** is a powerful, secure, and scalable **Node.js + Express.js API** built with the following key features:

* **JWT-based Authentication**
* **Role-Based Access Control (RBAC)**
* **Permission Management**
* **GitHub OAuth Integration** (optional/coming next)
* **MongoDB/Mongoose ODM**
* Modular MVC architecture and clean middleware layering.

---

### 📁 Project Structure

```bash
server/
├── config/               # DB config and constants
│   └── db.js
├── controllers/          # All controller logic
│   ├── authController.js
│   ├── userController.js
│   └── roleController.js
├── middleware/           # Auth & permission middleware
│   ├── authMiddleware.js
│   └── authorize.js
├── models/               # Mongoose models
│   ├── User.js
│   ├── Role.js
│   └── Permission.js
├── routes/               # Express routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── roleRoutes.js
├── utils/                # Utility functions (e.g., token generation)
│   └── generateToken.js
├── .env                  # Environment variables
├── app.js                # Main Express app
└── server.js             # Entry point
```

---

### 📦 Tech Stack

* **Node.js** + **Express.js** – RESTful API framework
* **MongoDB** + **Mongoose** – NoSQL database
* **JWT** – Token-based authentication
* **bcryptjs** – Password hashing
* **dotenv** – Environment variable management
* **Cors** – Cross-Origin Resource Sharing
* **GitHub OAuth (soon)** – For social login

---

### 🔐 Authentication & Authorization

#### ✅ JWT Auth

* Login issues a **signed JWT**.
* Protects private routes via `authMiddleware`.

#### 🛂 Role-Based Access Control (RBAC)

* Users are assigned **roles**, each with associated **permissions**.
* Middleware `authorizePermission("permission_name")` checks whether a user can access a given resource.

---

### 🧠 Models Overview

#### 🧑‍💼 `User`

```js
{
  name: String,
  email: String,
  password: String,
  role: ObjectId → Role
}
```

#### 🔑 `Role`

```js
{
  name: String,
  permissions: [ObjectId → Permission]
}
```

#### 🔐 `Permission`

```js
{
  name: String,
  description: String
}
```

---

### 🔌 API Endpoints

#### 🔑 Auth Routes (`/api/auth`)

* `POST /register` – Register a new user
* `POST /login` – Login with email/password
* `GET /me` – Get current logged-in user info

#### 👥 User Management (`/api/users`)

* `GET /` – List all users
* `PUT /assign-role` – Assign role to user
* *(All protected by `manage_users` or `manage_roles` permissions)*

#### 🏷️ Role Management (`/api/roles`)

* `GET /` – List all roles
* `GET /:id` – Get one role
* `POST /` – Create a role
* `PUT /:id` – Update a role
* `DELETE /:id` – Delete a role

> All role routes require the `manage_roles` permission.

---

### ⚙️ How to Run the Backend

#### 1. Clone the repo and install dependencies

```bash
cd server
npm install
```

#### 2. Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/accessforge
JWT_SECRET=yourSecretKeyHere
```

#### 3. Start the server

```bash
npm run dev
```

---

### 🧪 Seed Initial Roles & Permissions (Optional)

You can run a script to insert predefined roles and permissions:

```bash
node scripts/seedRoles.js
```

---

### 📘 Permissions Reference

| Role      | Permissions                                                 |
| --------- | ----------------------------------------------------------- |
| `admin`   | `manage_users`, `manage_roles`, `view_users`, `delete_user` |
| `manager` | `view_users`, `update_user`                                 |
| `user`    | `view_self`, `update_self`                                  |

---

### 🛡️ Middleware Stack

* `protect` → Verifies JWT token
* `authorizePermission("permission_name")` → Ensures user has required permission
* Cleanly separated for flexibility and reusability.

---

### 🚀 Future Features (Planned)

* 🔗 GitHub OAuth Login
* 📊 Admin Dashboard UI
* 🧾 Audit Logs
* 🧩 Plugin-based Permissions

---

