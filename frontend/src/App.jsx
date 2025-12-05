import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import './App.css';

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AdminReports from "./pages/AdminReports";
import MySessions from "./pages/MySessions";
import BookSession from "./pages/BookSession";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import SessionFeedback from "./pages/SessionFeedback";
import ProfilePage from "./pages/ProfilePage";
import SetAvailabilityPage from "./pages/SetAvailabilityPage";
import FeedbackPage from "./pages/FeedbackPage";

/**
 *** Component ProtectedRoute
 *** Bọc các route được bảo vệ để kiểm tra trạng thái xác thực
 *** Chuyển hướng đến trang đăng nhập nếu người dùng chưa xác thực
 **/


const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="loading-container">
				<div className="loading-content">
					<div className="loading-spinner"></div>
					<p className="loading-text">Loading...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

/**
 *** Component App
 *** Component chính của ứng dụng với cấu hình routing
 **/
function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					{/* Public Routes */}
					<Route path="/login" element={<LoginPage />} />

					{/* Protected Routes */}
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<MainLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<HomePage />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="reports" element={<AdminReports />} />
						<Route path="my-sessions" element={<MySessions />} />
						<Route path="book-session" element={<BookSession />} />
						<Route
							path="set-availability"
							element={<SetAvailabilityPage />}
						/>
						<Route path="feedback" element={<FeedbackPage />} />
						<Route
							path="feedback/:sessionId"
							element={<SessionFeedback />}
						/>
						<Route path="courses" element={<CoursesPage />} />
						<Route
							path="courses/:courseId"
							element={<CourseDetailPage />}
						/>
						<Route path="profile" element={<ProfilePage />} />
					</Route>

					{/* Fallback Route */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;

