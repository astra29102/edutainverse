import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';
import CoursesPage from './pages/public/CoursesPage';
import CourseDetailPage from './pages/public/CourseDetailPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyLearningPage from './pages/student/MyLearningPage';
import CoursePlayerPage from './pages/student/CoursePlayerPage';
import CartPage from './pages/student/CartPage';
import StudentProfilePage from './pages/student/StudentProfilePage';

// Educator Pages
import EducatorDashboard from './pages/educator/EducatorDashboard';
import EducatorCoursesPage from './pages/educator/EducatorCoursesPage';
import AddCoursePage from './pages/educator/AddCoursePage';
import EditCoursePage from './pages/educator/EditCoursePage';
import EducatorProfilePage from './pages/educator/EducatorProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsListPage from './pages/admin/StudentsListPage';
import EducatorsListPage from './pages/admin/EducatorsListPage';
import CoursesListPage from './pages/admin/CoursesListPage';
import CourseApprovalsPage from './pages/admin/CourseApprovalsPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === 'student') {
      return <Navigate to="/dashboard" />;
    } else if (user?.role === 'educator') {
      return <Navigate to="/educator/dashboard" />;
    } else if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    }
    
    // Fallback to landing page if role is unknown
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:slug" element={<CourseDetailPage />} />
            
            {/* Student Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-learning" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <MyLearningPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/course/:courseId/learn" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <CoursePlayerPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <CartPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Educator Routes */}
            <Route 
              path="/educator/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['educator']}>
                  <EducatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/educator/courses" 
              element={
                <ProtectedRoute allowedRoles={['educator']}>
                  <EducatorCoursesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/educator/courses/new" 
              element={
                <ProtectedRoute allowedRoles={['educator']}>
                  <AddCoursePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/educator/courses/:courseId/edit" 
              element={
                <ProtectedRoute allowedRoles={['educator']}>
                  <EditCoursePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/educator/profile" 
              element={
                <ProtectedRoute allowedRoles={['educator']}>
                  <EducatorProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <StudentsListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/educators" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <EducatorsListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CoursesListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/course-approvals" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CourseApprovalsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/profile" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;