import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Public pages
import HomePage from '../pages/public/HomePage';
import CoursesPage from '../pages/public/CoursesPage';
import LoginPage from '../pages/public/LoginPage';
import SignupPage from '../pages/public/SignupPage';

// Student pages
import StudentDashboard from '../pages/student/DashboardPage';
import MyLearningPage from '../pages/student/MyLearningPage';
import WishlistPage from '../pages/student/WishlistPage';
import ProfilePage from '../pages/student/ProfilePage';
import CourseViewPage from '../pages/student/CourseViewPage';

// Admin pages
import AdminDashboard from '../pages/admin/DashboardPage';
import CourseManagement from '../pages/admin/CourseManagementPage';
import UserAnalyticsPage from '../pages/admin/UserAnalyticsPage';
import CourseAnalyticsPage from '../pages/admin/CourseAnalyticsPage';
import CourseEditor from '../pages/admin/CourseEditorPage';

const ProtectedRoute: React.FC<{
  element: React.ReactNode;
  requiredRole?: 'student' | 'admin';
}> = ({ element, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect students to student dashboard and admins to admin dashboard
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{element}</>;
};

const Router: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Student routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" />}
        />
        <Route
          path="/my-learning"
          element={<ProtectedRoute element={<MyLearningPage />} requiredRole="student" />}
        />
        <Route
          path="/my-learning/:courseId"
          element={<ProtectedRoute element={<CourseViewPage />} requiredRole="student" />}
        />
        <Route
          path="/wishlist"
          element={<ProtectedRoute element={<WishlistPage />} requiredRole="student" />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} requiredRole="student" />}
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}
        />
        <Route
          path="/admin/courses"
          element={<ProtectedRoute element={<CourseManagement />} requiredRole="admin" />}
        />
        <Route
          path="/admin/courses/:courseId"
          element={<ProtectedRoute element={<CourseEditor />} requiredRole="admin" />}
        />
        <Route
          path="/admin/analytics/users"
          element={<ProtectedRoute element={<UserAnalyticsPage />} requiredRole="admin" />}
        />
        <Route
          path="/admin/analytics/courses"
          element={<ProtectedRoute element={<CourseAnalyticsPage />} requiredRole="admin" />}
        />

        {/* Redirect to appropriate dashboard based on role */}
        <Route
          path="*"
          element={
            <Navigate
              to={user?.role === 'admin' ? '/admin' : user ? '/dashboard' : '/'}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;