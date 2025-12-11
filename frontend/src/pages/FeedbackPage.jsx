import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllSessions, MOCK_USERS } from '../services/mockData';
import { Star, MessageSquare, Calendar, User as UserIcon } from 'lucide-react';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchFeedback = async () => {
      if (!user) return;

      // Get all feedbacks from localStorage
      const storedFeedbacks = localStorage.getItem('tutoring_feedbacks');
      let allFeedbacks = storedFeedbacks ? JSON.parse(storedFeedbacks) : [];
      
      // Filter feedbacks for this tutor's sessions
      const MOCK_SESSIONS = getAllSessions();
      const tutorSessions = MOCK_SESSIONS.filter(s => s.tutorId === user.id);
      const tutorSessionIds = tutorSessions.map(s => s.id);
      
      const relevantFeedback = allFeedbacks.filter(f => tutorSessionIds.includes(f.sessionId));
      
      // Sort by date descending
      relevantFeedback.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setFeedbacks(relevantFeedback);
      setLoading(false);
    };

    fetchFeedback();
  }, [user]);

  const getStudentName = (studentId) => {
      const student = MOCK_USERS.find(u => u.id === studentId);
      return student ? student.name : 'Không rõ';
  };

  const getSessionDate = (sessionId) => {
      const MOCK_SESSIONS = getAllSessions();
      const session = MOCK_SESSIONS.find(s => s.id === sessionId);
      return session ? session.date : 'Không rõ';
  };

  const calculateAverageRating = () => {
      if (feedbacks.length === 0) return 0;
      const total = feedbacks.reduce((acc, curr) => acc + curr.ratingOverall, 0);
      return (total / feedbacks.length).toFixed(1);
  };

  if (loading) return <div className="p-6 text-center">Đang tải đánh giá...</div>;

  const averageRating = calculateAverageRating();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Đánh Giá & Nhận Xét Từ Sinh Viên</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
            <div className="p-4 bg-yellow-50 text-yellow-500 rounded-full mr-4">
                <Star className="w-8 h-8 fill-current" />
            </div>
            <div>
                <div className="text-3xl font-bold text-gray-900">{averageRating}</div>
                <div className="text-sm text-gray-500">Điểm Trung Bình</div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
            <div className="p-4 bg-blue-50 text-blue-500 rounded-full mr-4">
                <MessageSquare className="w-8 h-8" />
            </div>
            <div>
                <div className="text-3xl font-bold text-gray-900">{feedbacks.length}</div>
                <div className="text-sm text-gray-500">Tổng Đánh Giá</div>
            </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Đánh Giá Gần Đây</h2>
        
        {feedbacks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">Chưa nhận được đánh giá nào.</p>
            </div>
        ) : (
            feedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
                    <div className="flex flex-col md:flex-row justify-between md:items-start mb-4">
                        <div className="flex items-start">
                            <div className="bg-gray-100 p-2 rounded-full mr-3">
                                <UserIcon className="w-6 h-6 text-gray-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{getStudentName(feedback.studentId)}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>Ngày học: {getSessionDate(feedback.sessionId)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                            <span className="font-bold text-yellow-700 mr-1">{feedback.ratingOverall}</span>
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed">"{feedback.comments}"</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500 block mb-1">Đánh giá Gia sư</span>
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < feedback.ratingTutor ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="text-gray-500 block mb-1">Đánh giá Nội dung</span>
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < feedback.ratingContent ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <div className="text-right text-gray-400 flex items-end justify-end">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
