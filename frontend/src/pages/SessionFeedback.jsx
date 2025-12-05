import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_SESSIONS, MOCK_USERS, createFeedback, getFeedbackBySessionId } from '../services/mockData';
import { Calendar, Clock, User, Star, MessageSquare, AlertCircle } from 'lucide-react';
import './SessionFeedback.css';

const SessionFeedback = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [session, setSession] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setError('Thiếu mã buổi học');
      return;
    }

    // Find the session
    const foundSession = MOCK_SESSIONS.find(s => s.id === sessionId);
    if (!foundSession) {
      setError('Không tìm thấy buổi học');
      return;
    }

    // Verify session belongs to current user (student)
    if (foundSession.studentId !== user?.id) {
      setError('Bạn không có quyền đánh giá buổi học này');
      return;
    }

    // Verify session is completed
    if (foundSession.status !== 'Completed') {
      setError('Chỉ có thể đánh giá cho các buổi học đã hoàn thành');
      return;
    }

    // Check if feedback already exists
    const existingFeedback = getFeedbackBySessionId(sessionId);
    if (existingFeedback) {
      setError('Đã gửi đánh giá cho buổi học này rồi');
      return;
    }

    setSession(foundSession);
  }, [sessionId, user]);

  // Get tutor name
  const getTutorName = (tutorId) => {
    const tutor = MOCK_USERS.find(u => u.id === tutorId);
    return tutor?.name || 'Không rõ';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle star click
  const handleStarClick = (value) => {
    setRating(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError('Vui lòng chọn điểm đánh giá');
      return;
    }

    if (!comments.trim()) {
      setError('Vui lòng nhập nhận xét');
      return;
    }

    if (!session || !user) return;

    setIsSubmitting(true);
    setError('');

    try {
      await createFeedback({
        sessionId: session.id,
        studentId: user.id,
        rating,
        comments: comments.trim(),
      });

      // Navigate back to sessions page
      navigate('/my-sessions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể gửi đánh giá');
      setIsSubmitting(false);
    }
  };

  // Show error if session not found or unauthorized
  if (error && !session) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-red-900 mb-2">Không thể gửi đánh giá</h2>
              <p className="text-red-700">{error}</p>
              <button
                onClick={() => navigate('/my-sessions')}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Quay lại Buổi Học Của Tôi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">Đang tải thông tin buổi học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Đánh Giá Buổi Học</h1>
          <p className="text-sm text-gray-500 mt-1">
            Chia sẻ trải nghiệm của bạn về buổi học này
          </p>
        </div>

        {/* Session Details */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{session.subject}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>Gia sư: {getTutorName(session.tutorId)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(session.date)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{session.time}</span>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          {/* Rating Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Đánh giá buổi học của bạn <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleStarClick(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      value <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-sm font-medium text-gray-600">
                  {rating === 1 && 'Kém'}
                  {rating === 2 && 'Trung bình'}
                  {rating === 3 && 'Tốt'}
                  {rating === 4 && 'Rất tốt'}
                  {rating === 5 && 'Xuất sắc'}
                </span>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <label
              htmlFor="comments"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nhận xét <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="comments"
                rows={6}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Chia sẻ suy nghĩ của bạn về buổi học. Điều gì tốt? Điều gì có thể cải thiện?"
                className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hcmut-blue focus:border-transparent resize-none"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Đánh giá của bạn giúp gia sư cải thiện và hỗ trợ sinh viên khác chọn đúng gia sư.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/my-sessions')}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="px-6 py-2 bg-hcmut-blue text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionFeedback;

