import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllSessions, MOCK_USERS, MOCK_TUTORS, cancelSession, getFeedbackBySessionId } from '../services/mockData';
import { Calendar, Clock, XCircle, User, MessageSquare, Loader2 } from 'lucide-react';
import './MySessions.css';

const MySessions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load sessions from localStorage on mount
  useEffect(() => {
    setSessions(getAllSessions());
  }, []);

  // Filter sessions dựa trên tab và role
  const filteredSessions = useMemo(() => {
    if (!sessions) return [];
    
    const userSessions = sessions.filter((session) => {
      if (user?.role === 'Student') {
        return session.studentId === user.id;
      } else {
        return session.tutorId === user.id;
      }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filtered;
    if (activeTab === 'upcoming') {
      filtered = userSessions.filter(
        (session) =>
          session.status === 'Scheduled' &&
          new Date(session.date) >= today
      );
      // Sort upcoming: gần nhất trước (ascending)
      return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      filtered = userSessions.filter(
        (session) =>
          session.status === 'Completed' ||
          session.status === 'Cancelled' ||
          (session.status === 'Scheduled' && new Date(session.date) < today)
      );
      // Sort history: mới nhất trước (descending - từ hiện tại về quá khứ)
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [sessions, activeTab, user]);

  // Get user name từ session data
  const getUserName = (session, role) => {
    if (role === 'Student') {
      // Try to find by userId first
      let tutor = MOCK_USERS.find(u => u.id === session.tutorId);
      
      // If not found, tutorId might be a tutor profile id, try to find the user
      if (!tutor) {
        const tutorProfile = MOCK_TUTORS.find(t => t.id === session.tutorId);
        if (tutorProfile) {
          tutor = MOCK_USERS.find(u => u.id === tutorProfile.userId);
        }
      }
      
      return tutor?.name || 'Unknown Tutor';
    } else {
      const student = MOCK_USERS.find(u => u.id === session.studentId);
      return student?.name || 'Unknown Student';
    }
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

  // Handle cancel button click
  const handleCancelClick = (session) => {
    setSelectedSession(session);
    setCancelReason('');
    setError('');
    setShowCancelModal(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowCancelModal(false);
    setSelectedSession(null);
    setCancelReason('');
    setError('');
  };

  // Handle submit cancel
  const handleSubmitCancel = async () => {
    if (!cancelReason.trim()) {
      setError('Please provide a reason for cancellation');
      return;
    }

    if (!selectedSession) return;

    try {
      setIsSubmitting(true);
      setError('');
      
      const updatedSession = await cancelSession(selectedSession.id, cancelReason);

      // Update sessions in state
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === updatedSession.id ? updatedSession : session
        )
      );

      handleModalClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel session');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the other party's name
  const getOtherPartyName = (session) => {
    return getUserName(session, user?.role);
  };

  const getOtherPartyLabel = () => {
    return user?.role === 'Student' ? 'Gia sư' : 'Sinh viên';
  };

  // Check if feedback has been submitted
  const hasFeedback = (sessionId) => {
    return getFeedbackBySessionId(sessionId) !== null;
  };

  // Handle feedback button click
  const handleGiveFeedback = (sessionId) => {
    navigate(`/feedback/${sessionId}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Buổi Học Của Tôi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý các buổi học của bạn
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'text-hcmut-blue border-b-2 border-hcmut-blue bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sắp Tới
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-hcmut-blue border-b-2 border-hcmut-blue bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Lịch Sử
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="divide-y">
          {filteredSessions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">
                {activeTab === 'upcoming'
                  ? 'Không có buổi học sắp tới'
                  : 'Không có lịch sử buổi học'}
              </p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Date and Time */}
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">{formatDate(session.date)}</span>
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      <span>{session.time}</span>
                    </div>

                    {/* Subject */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {session.subject}
                    </h3>

                    {/* Other party (Tutor or Student) */}
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <User className="w-4 h-4 mr-2" />
                      <span>
                        {getOtherPartyLabel()}: {getOtherPartyName(session)}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          session.status === 'Scheduled'
                            ? 'bg-green-100 text-green-800'
                            : session.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {session.status}
                      </span>
                      {session.cancelReason && (
                        <span className="ml-3 text-xs text-gray-500">
                          Lý do: {session.cancelReason}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="ml-4 flex flex-col space-y-2">
                    {/* Cancel Button (only for upcoming sessions) */}
                    {activeTab === 'upcoming' && session.status === 'Scheduled' && (
                      <button
                        onClick={() => handleCancelClick(session)}
                        className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors text-sm font-medium flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Hủy
                      </button>
                    )}

                    {/* Give Feedback Button (only for completed sessions without feedback, and only for students) */}
                    {activeTab === 'history' &&
                     session.status === 'Completed' &&
                     user?.role === 'Student' &&
                     !hasFeedback(session.id) && (
                      <button
                        onClick={() => handleGiveFeedback(session.id)}
                        className="px-4 py-2 bg-blue-50 text-hcmut-blue border border-blue-200 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium flex items-center"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Đánh Giá
                      </button>
                    )}

                    {/* Feedback Submitted Badge */}
                    {activeTab === 'history' &&
                     session.status.toLowerCase() === 'completed' &&
                     user?.role === 'Student' &&
                     hasFeedback(session.id) && (
                      <span className="px-4 py-2 bg-green-50 text-green-600 border border-green-200 rounded-md text-sm font-medium flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Đã Đánh Giá
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Hủy Buổi Học</h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedSession.subject_name} - {formatDate(selectedSession.session_date)}
              </p>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              <label
                htmlFor="cancelReason"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Lý do hủy <span className="text-red-500">*</span>
              </label>
              <textarea
                id="cancelReason"
                rows={4}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Vui lòng giải thích tại sao bạn cần hủy buổi học này..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hcmut-blue focus:border-transparent resize-none"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <button
                onClick={handleModalClose}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Giữ Buổi Học
              </button>
              <button
                onClick={handleSubmitCancel}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang hủy...
                  </>
                ) : (
                  'Xác Nhận Hủy'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySessions;

