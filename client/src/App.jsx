import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AdminHome from "./pages/Dashboard/AdminHome";
import ProtectedRoute from "./routes/ProtectedRoute";
import UsersPage from "./pages/Users/UsersPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import RolesPage from "./pages/Roles/RolesPage";
import PermissionsPage from "./pages/Permissions/PermissionsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
            <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
