import { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  useLocation
} from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

// Simple auth check function
const isAuthenticated = () => !!localStorage.getItem("token");

function PrivateRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized! Please login");
    }
  }, [token, location]);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

// Redirect logged-in users away from login
function PublicRoute({ children }) {
  return !isAuthenticated() ? children : <Navigate to="/" />;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Public routes */}
        <Route path="login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="register" element={<PublicRoute><RegisterForm /></PublicRoute>} />

        {/* Public pages */}
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:id" element={<JobPage />} />

        {/* Protected pages */}
        <Route
          path="add-job"
          element={<PrivateRoute><AddJobPage /></PrivateRoute>}
        />
        <Route
          path="edit-job/:id"
          element={<PrivateRoute><EditJobPage /></PrivateRoute>}
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

