# AccessForge
AccessForge is a MERN stack-based User Access Management System featuring secure JWT authentication, role-based access control (RBAC), and an admin dashboard. Easily manage users, roles, and permissions with a scalable backend and protected React frontend. Ideal for modern web apps.

| Method | Route            | Description           | Access                         |
| ------ | ---------------- | --------------------- | ------------------------------ |
| GET    | `/api/users`     | Get all users         | `view_users`                   |
| GET    | `/api/users/:id` | Get single user by ID | `view_users` or `view_self`    |
| PUT    | `/api/users/:id` | Update user info      | `update_user` or `update_self` |
| DELETE | `/api/users/:id` | Delete user           | `delete_user`                  |


| Role    | Can View All Users | Update Others | Delete Users | View/Update Self |
| ------- | ------------------ | ------------- | ------------ | ---------------- |
| Admin   | ✅                  | ✅             | ✅            | ✅                |
| Manager | ✅                  | ✅             | ❌            | ✅                |
| User    | ❌                  | ❌             | ❌            | ✅                |
