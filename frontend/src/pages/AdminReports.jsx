import React, { useMemo } from "react";
import './AdminReports.css';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import {
	Download,
	Users,
	Calendar,
	Star,
	BookOpen,
	TrendingUp,
	Award,
	Clock,
} from "lucide-react";
import {
	getStudentStats,
	getTutorStats,
	getSystemStats,
	getSessionStatusData,
	getSessionBySubject,
} from "../services/statsService";
import { useAuth } from "../context/AuthContext";
import { MOCK_SESSIONS, MOCK_FEEDBACK } from "../services/mockData";

const AdminReports = () => {
	const { user } = useAuth();

	// System stats for admin
	const systemStats = useMemo(() => getSystemStats(), []);
	const sessionStatusData = useMemo(() => getSessionStatusData(), []);
	const sessionBySubject = useMemo(() => getSessionBySubject(), []);

	// Role-specific stats
	const studentStats = useMemo(
		() => (user?.role === "Student" ? getStudentStats(user.id) : null),
		[user]
	);

	const tutorStats = useMemo(
		() => (user?.role === "Tutor" ? getTutorStats(user.id) : null),
		[user]
	);

	// Export to CSV function
	const exportToCSV = () => {
		let csvContent = "";

		if (user?.role === "Admin") {
			csvContent = "Metric,Value\n";
			csvContent += `Total Sessions,${systemStats.totalSessions}\n`;
			csvContent += `Active Students,${systemStats.activeStudents}\n`;
			csvContent += `Total Tutors,${systemStats.totalTutors}\n`;
			csvContent += `Average Satisfaction,${systemStats.avgSatisfaction}\n`;
		} else if (user?.role === "Tutor") {
			csvContent = "Metric,Value\n";
			csvContent += `Average Rating,${tutorStats?.avgRating}\n`;
			csvContent += `Total Reviews,${tutorStats?.reviewCount}\n`;
		} else if (user?.role === "Student") {
			csvContent = "Metric,Value\n";
			csvContent += `Total Sessions,${studentStats?.totalSessions}\n`;
			csvContent += `Completed Sessions,${studentStats?.completedSessions}\n`;
			csvContent += `Hours Learned,${studentStats?.hoursLearned}\n`;
		}

		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${user?.role.toLowerCase()}_report_${
			new Date().toISOString().split("T")[0]
		}.csv`;
		a.click();
		window.URL.revokeObjectURL(url);
	};

	// Render Admin Dashboard
	const renderAdminDashboard = () => (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Báo Cáo & Phân Tích Hệ Thống
					</h1>
					<p className="text-gray-600 mt-1">
						Tổng quan toàn diện về hiệu suất hệ thống dạy kèm
					</p>
				</div>
				<button
					onClick={exportToCSV}
					className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					<Download className="w-4 h-4" />
					Xuất Báo Cáo
				</button>
			</div>

			{/* Key Metrics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">
								Tổng Buổi Học
							</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">
								{systemStats.totalSessions}
							</p>
						</div>
						<div className="bg-blue-100 p-3 rounded-lg">
							<Calendar className="w-6 h-6 text-blue-600" />
						</div>
					</div>
					<p className="text-xs text-gray-500 mt-4">
						Tổng cộng tất cả thời gian
					</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">
								Sinh Viên Hoạt Động
							</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">
								{systemStats.activeStudents}
							</p>
						</div>
						<div className="bg-green-100 p-3 rounded-lg">
							<Users className="w-6 h-6 text-green-600" />
						</div>
					</div>
					<p className="text-xs text-gray-500 mt-4">
						Đang đăng ký học
					</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">
								Tổng Gia Sư
							</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">
								{systemStats.totalTutors}
							</p>
						</div>
						<div className="bg-purple-100 p-3 rounded-lg">
							<Award className="w-6 h-6 text-purple-600" />
						</div>
					</div>
					<p className="text-xs text-gray-500 mt-4">
						Gia sư có sẵn
					</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">
								Độ Hài Lòng TB
							</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">
								{systemStats.avgSatisfaction}
							</p>
						</div>
						<div className="bg-yellow-100 p-3 rounded-lg">
							<Star className="w-6 h-6 text-yellow-600" />
						</div>
					</div>
					<p className="text-xs text-gray-500 mt-4">Trên 5.0</p>
				</div>
			</div>

			{/* Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Session Status Pie Chart */}
				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Phân Bố Trạng Thái Buổi Học
					</h3>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={sessionStatusData}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ name, percent }) =>
									`${name}: ${
										percent ? (percent * 100).toFixed(0) : 0
									}%`
								}
								outerRadius={80}
								fill="#8884d8"
								dataKey="value"
							>
								{sessionStatusData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.color}
									/>
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
					<div className="mt-4 grid grid-cols-2 gap-2">
						{sessionStatusData.map((item) => (
							<div
								key={item.name}
								className="flex items-center gap-2"
							>
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: item.color }}
								></div>
								<span className="text-sm text-gray-600">
									{item.name}: {item.value}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Sessions by Subject Bar Chart */}
				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Buổi Học Theo Môn Học
					</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={sessionBySubject}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="sessions" fill="#3B82F6" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);

	// Render Tutor Dashboard
	const renderTutorDashboard = () => {
		const mySessions = MOCK_SESSIONS.filter((s) => s.tutorId === user?.id);
		const myFeedback = MOCK_FEEDBACK.filter((f) => {
			const session = MOCK_SESSIONS.find((s) => s.id === f.sessionId);
			return session?.tutorId === user?.id;
		});

		const recentFeedback = myFeedback.slice(-5).reverse();

		return (
			<div className="space-y-6">
				{/* Header */}
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Bảng Điều Khiển Hiệu Suất Gia Sư
						</h1>
						<p className="text-gray-600 mt-1">
							Theo dõi hiệu suất giảng dạy và phản hồi của sinh viên
						</p>
					</div>
					<button
						onClick={exportToCSV}
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						<Download className="w-4 h-4" />
						Export Report
					</button>
				</div>

				{/* Key Metrics Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Tổng Buổi Học
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-1">
									{mySessions.length}
								</p>
							</div>
							<div className="bg-blue-100 p-3 rounded-lg">
								<Calendar className="w-6 h-6 text-blue-600" />
							</div>
						</div>
						<p className="text-xs text-gray-500 mt-4">
							Tất cả buổi học đã dạy
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Đánh Giá Trung Bình
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-1">
									{tutorStats?.avgRating || "0.0"}
								</p>
							</div>
							<div className="bg-yellow-100 p-3 rounded-lg">
								<Star className="w-6 h-6 text-yellow-600" />
							</div>
						</div>
						<p className="text-xs text-gray-500 mt-4">Trên 5.0</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Tổng Đánh Giá
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-1">
									{tutorStats?.reviewCount || 0}
								</p>
							</div>
							<div className="bg-green-100 p-3 rounded-lg">
								<Users className="w-6 h-6 text-green-600" />
							</div>
						</div>
						<p className="text-xs text-gray-500 mt-4">
							Phản hồi từ sinh viên
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Tỉ Lệ Hoàn Thành
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-1">
									{mySessions.length > 0
										? Math.round(
												(mySessions.filter(
													(s) =>
														s.status === "Completed"
												).length /
													mySessions.length) *
													100
										  )
										: 0}
									%
								</p>
							</div>
							<div className="bg-purple-100 p-3 rounded-lg">
								<TrendingUp className="w-6 h-6 text-purple-600" />
							</div>
						</div>
						<p className="text-xs text-gray-500 mt-4">
							Buổi học đã hoàn thành
						</p>
					</div>
				</div>

				{/* Recent Feedback */}
				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Phản Hồi Gần Đây Từ Sinh Viên
					</h3>
					<div className="space-y-4">
						{recentFeedback.length > 0 ? (
							recentFeedback.map((feedback) => {
								const session = MOCK_SESSIONS.find(
									(s) => s.id === feedback.sessionId
								);
								return (
									<div
										key={feedback.id}
										className="border-b border-gray-200 pb-4 last:border-0"
									>
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-2">
													<span className="font-medium text-gray-900">
														{session?.subject}
													</span>
													<div className="flex items-center gap-1">
														{[...Array(5)].map(
															(_, i) => (
																<Star
																	key={i}
																	className={`w-4 h-4 ${
																		i <
																		feedback.ratingTutor
																			? "fill-yellow-400 text-yellow-400"
																			: "text-gray-300"
																	}`}
																/>
															)
														)}
													</div>
												</div>
												<p className="text-sm text-gray-600 mt-1">
													{feedback.comments}
												</p>
												<p className="text-xs text-gray-400 mt-2">
													{new Date(
														feedback.createdAt
													).toLocaleDateString()}
												</p>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<p className="text-gray-500 text-center py-4">
								Chưa có phản hồi nào
							</p>
						)}
					</div>
				</div>
			</div>
		);
	};

	// Render Student Dashboard
	const renderStudentDashboard = () => {
		const mySessions = MOCK_SESSIONS.filter(
			(s) => s.studentId === user?.id
		);
		const myFeedback = MOCK_FEEDBACK.filter(
			(f) => f.studentId === user?.id
		);

		const subjectProgress = mySessions.reduce((acc, session) => {
			if (!acc[session.subject]) {
				acc[session.subject] = { total: 0, completed: 0 };
			}
			acc[session.subject].total++;
			if (session.status === "Completed") {
				acc[session.subject].completed++;
			}
			return acc;
		}, {} );

		const progressData = Object.entries(subjectProgress).map(
			([subject, data]) => ({
				subject,
				progress: Math.round((data.completed / data.total) * 100),
			})
		);

		return (
			<div className="space-y-6">
				{/* Header */}
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Bảng Điều Khiển Tiến Trình Học Tập
						</h1>
						<p className="text-gray-600 mt-1">
							Theo dõi hành trình học tập và thành tích của bạn
						</p>
					</div>
					<button
						onClick={exportToCSV}
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						<Download className="w-4 h-4" />
						Export Report
					</button>
				</div>

				{/* Key Metrics Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Tổng Buổi Học
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-1">
									{studentStats?.totalSessions || 0}
								</p>
							</div>
							<div className="bg-blue-100 p-3 rounded-lg">
								<Calendar className="w-6 h-6 text-blue-600" />
							</div>
						</div>
						<p className="text-xs text-gray-500 mt-4">
							Buổi học đã đặt
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Đã Hoàn Thành
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-1">
									{studentStats?.completedSessions || 0}
								</p>
							</div>
							<div className="bg-green-100 p-3 rounded-lg">
								<Award className="w-6 h-6 text-green-600" />
							</div>
						</div>
						<p className="text-xs text-gray-500 mt-4">
							Buổi học đã kết thúc
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Số Giờ Học
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-1">
									{studentStats?.hoursLearned || 0}
								</p>
							</div>
							<div className="bg-purple-100 p-3 rounded-lg">
								<Clock className="w-6 h-6 text-purple-600" />
							</div>
						</div>
						<p className="text-xs text-gray-500 mt-4">
							Thời gian học
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">
									Môn Học
								</p>
								<p className="text-3xl font-bold text-gray-900 mt-1">
									{Object.keys(subjectProgress).length}
								</p>
							</div>
							<div className="bg-yellow-100 p-3 rounded-lg">
								<BookOpen className="w-6 h-6 text-yellow-600" />
							</div>
						</div>
						<p className="text-xs text-gray-500 mt-4">Đang học</p>
					</div>
				</div>

				{/* Progress Chart */}
				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Tiến Trình Theo Môn Học
					</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={progressData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="subject" />
							<YAxis domain={[0, 100]} />
							<Tooltip formatter={(value) => `${value}%`} />
							<Legend />
							<Bar
								dataKey="progress"
								fill="#10B981"
								name="Hoàn thành %"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Feedback Given */}
				<div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Your Feedback History
					</h3>
					<div className="space-y-4">
						{myFeedback.length > 0 ? (
							myFeedback.map((feedback) => {
								const session = MOCK_SESSIONS.find(
									(s) => s.id === feedback.sessionId
								);
								return (
									<div
										key={feedback.id}
										className="border-b border-gray-200 pb-4 last:border-0"
									>
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-2">
													<span className="font-medium text-gray-900">
														{session?.subject}
													</span>
													<div className="flex items-center gap-1">
														{[...Array(5)].map(
															(_, i) => (
																<Star
																	key={i}
																	className={`w-4 h-4 ${
																		i <
																		feedback.ratingOverall
																			? "fill-yellow-400 text-yellow-400"
																			: "text-gray-300"
																	}`}
																/>
															)
														)}
													</div>
												</div>
												<p className="text-sm text-gray-600 mt-1">
													{feedback.comments}
												</p>
												<p className="text-xs text-gray-400 mt-2">
													{new Date(
														feedback.createdAt
													).toLocaleDateString()}
												</p>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<p className="text-gray-500 text-center py-4">
								No feedback submitted yet
							</p>
						)}
					</div>
				</div>
			</div>
		);
	};

	// Render appropriate dashboard based on role
	if (!user) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-gray-500">Please log in to view reports</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{user.role === "Admin" && renderAdminDashboard()}
			{user.role === "Tutor" && renderTutorDashboard()}
			{user.role === "Student" && renderStudentDashboard()}
		</div>
	);
};

export default AdminReports;


