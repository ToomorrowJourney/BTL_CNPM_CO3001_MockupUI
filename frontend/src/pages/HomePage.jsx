import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAllSessions, MOCK_USERS } from '../services/mockData';
import './HomePage.css';

const HomePage = () => {
    const { user } = useAuth();
    
    // Lấy upcoming sessions của user hiện tại (không áp dụng cho Admin)
    const upcomingSessions = useMemo(() => {
        if (user?.role === 'Admin') return [];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Lấy sessions từ localStorage
        const sessions = getAllSessions();
        
        return sessions
            .filter(session => {
                const sessionDate = new Date(session.date);
                // Student: lọc theo studentId, Tutor: lọc theo tutorId
                const isUserSession = user?.role === 'Student' 
                    ? session.studentId === user?.id
                    : session.tutorId === user?.id;
                
                return isUserSession && 
                       session.status === 'Scheduled' && 
                       sessionDate >= today;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3); // Chỉ lấy 3 sessions gần nhất
    }, [user]);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Chào mừng đến với Hệ thống Hỗ trợ Gia sư
        </h1>
        <p className="text-lg text-gray-600">
          Xin chào, <span className="font-semibold text-hcmut-blue">{user?.name}</span>.
        </p>
        <p className="mt-2 text-gray-600">
          Hệ thống này phục vụ như một trung tâm cho tất cả các hoạt động dạy kèm tại Đại học Bách Khoa TP.HCM.
          Từ đây, bạn có thể quản lý lịch học, tìm gia sư và theo dõi tiến độ học tập của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Upcoming Sessions Widget - Hidden for Admin */}
         {user?.role !== 'Admin' && (
         <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-hcmut-blue flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Buổi Học Sắp Tới
                </h2>
                <Link 
                    to="/my-sessions" 
                    className="text-sm text-hcmut-blue hover:underline"
                >
                    Xem Tất Cả
                </Link>
            </div>
            
            {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                    {upcomingSessions.map(session => {
                        // For Student: show tutor, For Tutor: show student
                        const otherUser = user?.role === 'Student'
                            ? MOCK_USERS.find(u => u.id === session.tutorId)
                            : MOCK_USERS.find(u => u.id === session.studentId);
                        const userLabel = user?.role === 'Student' ? 'Gia sư' : 'Sinh viên';
                        
                        return (
                            <div 
                                key={session.id}
                                className="bg-white p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {session.subject}
                                        </h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 mr-2" />
                                                <span>{userLabel}: {otherUser?.name || 'Unknown User'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>{formatDate(session.date)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-2" />
                                                <span>{session.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Đã Lên Lịch
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-500">Không có buổi học nào được lên lịch hôm nay.</p>
            )}
         </div>
         )}
         
         {/* Notifications Widget */}
         <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Thông Báo</h2>
            <p className="text-gray-500">Bạn không có thông báo mới nào.</p>
         </div>
      </div>
    </div>
    );
};
export default HomePage;
