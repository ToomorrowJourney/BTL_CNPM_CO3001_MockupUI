import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AdminReports from './pages/AdminReports';
import MySessions from './pages/MySessions';
import BookSession from './pages/BookSession';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import SessionFeedback from './pages/SessionFeedback';
import ProfilePage from './pages/ProfilePage';
import SetAvailabilityPage from './pages/SetAvailabilityPage';
import FeedbackPage from './pages/FeedbackPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children}) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route: Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes: Wrapped in MainLayout */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            {/* Future routes for Dashboards will go here */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="my-sessions" element={<MySessions />} />
            <Route path="book-session" element={<BookSession />} />
            <Route path="set-availability" element={<SetAvailabilityPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="feedback/:sessionId" element={<SessionFeedback />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:courseId" element={<CourseDetailPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;