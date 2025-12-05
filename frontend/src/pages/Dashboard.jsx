import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, BookOpen, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  // Student Dashboard View
  const StudentView = () => (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bảng Điều Khiển Sinh Viên</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Action Buttons */}
          <Link to="/book-session" className="flex items-center p-4 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors group">
            <div className="p-3 bg-hcmut-blue text-white rounded-full group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Đặt buổi học</h3>
              <p className="text-sm text-gray-500">Tìm gia sư và lên lịch buổi học mới</p>
            </div>
          </Link>

          <Link to="/my-sessions" className="flex items-center p-4 bg-orange-50 border border-orange-100 rounded-lg hover:bg-orange-100 transition-colors group">
            <div className="p-3 bg-orange-500 text-white rounded-full group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Hủy / Đổi Lịch</h3>
              <p className="text-sm text-gray-500">Quản lý các buổi học sắp tới</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Widget*/}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tài Liệu Gần Đây</h3>
        <div className="space-y-3">
           <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-700">Software Engineering Syllabus.pdf</span>
              </div>
              <button className="text-sm text-hcmut-blue hover:underline">Tải xuống</button>
           </div>
        </div>
      </div>
    </div>
  );

  // Tutor Dashboard View
  const TutorView = () => (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bảng Điều Khiển Gia Sư</h2>
        <p className="text-gray-600 mb-6">Chào mừng trở lại, Gia sư {user?.name}. Quản lý lịch dạy của bạn.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Action Buttons */}
          <Link to="/my-sessions" className="flex flex-col items-center p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-hcmut-blue hover:shadow-md transition-all text-center">
            <div className="p-4 bg-blue-100 text-hcmut-blue rounded-full mb-3">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-gray-900">Quản Lý Buổi Học</h3>
            <p className="text-xs text-gray-500 mt-1">Hủy hoặc đổi lịch các cuộc hẹn hiện tại</p>
          </Link>

          <Link to="/set-availability" className="flex flex-col items-center p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-hcmut-blue hover:shadow-md transition-all text-center">
            <div className="p-4 bg-green-100 text-green-600 rounded-full mb-3">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-gray-900">Cài Đặt Lịch Trống</h3>
            <p className="text-xs text-gray-500 mt-1">Cập nhật khung giờ dạy hàng tuần</p>
          </Link>

          <Link to="/feedback" className="flex flex-col items-center p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-hcmut-blue hover:shadow-md transition-all text-center">
            <div className="p-4 bg-purple-100 text-purple-600 rounded-full mb-3">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-gray-900">Đánh Giá & Phản Hồi</h3>
            <p className="text-xs text-gray-500 mt-1">Xem đánh giá sinh viên và ghi nhận tiến độ</p>
          </Link>
        </div>
      </div>
    </div>
  );

  // 3. Main Render Logic
  return (
    <div className="max-w-5xl mx-auto">
      {user?.role === 'Student' && <StudentView />}
      {user?.role === 'Tutor' && <TutorView />}
      {user?.role === 'Admin' && (
        <div className="p-10 text-center text-gray-500">
          <Settings className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-bold">Bảng Điều Khiển Quản Trị Viên</h2>
          <p>Các chức năng quản trị sẽ có trong Sprint 4.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
