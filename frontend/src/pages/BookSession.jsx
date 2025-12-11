import React, { useState, useMemo } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_SUBJECTS, MOCK_TUTORS, getAllSessions, bookSession, getTutorAvailability } from '../services/mockData';
import './BookSession.css';

const BookSession = () => {
    const { user } = useAuth();
    
    // State
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTutorId, setSelectedTutorId] = useState('');
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [conflictError, setConflictError] = useState('');

    // Filter tutors by selected subject
    const availableTutors = useMemo(() => {
        if (!selectedSubject) return [];
        return MOCK_TUTORS.filter(t => t.subjects.includes(selectedSubject));
    }, [selectedSubject]);

    // Get slots for selected tutor and date
    const availableSlots= useMemo(() => {
        if (!selectedTutorId) return [];
        const tutor = MOCK_TUTORS.find(t => t.id === selectedTutorId);
        if (!tutor) return [];
        
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        
        // Get availability from localStorage or default
        const availability = getTutorAvailability(tutor.userId);
        const slots = availability[dateKey] || [];
        
        // Lấy sessions từ localStorage
        const allSessions = getAllSessions();
        
        // Đánh dấu các slot đã được book bởi user này
        return slots.map(slot => {
            const hasConflict = allSessions.some(session => {
                if (session.studentId !== user?.id) return false;
                if (session.status !== 'Scheduled') return false;
                if (session.date !== dateKey) return false;
                // So sánh với userId của tutor
                if (session.tutorId !== tutor.userId) return false;
                
                // Kiểm tra trùng khung giờ
                return session.time === `${slot.startTime} - ${slot.endTime}`;
            });
            
            return {
                ...slot,
                isBooked: slot.isBooked || hasConflict,
                hasUserConflict: hasConflict
            };
        });
    }, [selectedTutorId, selectedDate, user]);

    // Kiểm tra xung đột trước khi book
    const checkConflict = () => {
        if (!selectedSlot || !selectedTutorId) return false;
        
        const tutor = MOCK_TUTORS.find(t => t.id === selectedTutorId);
        if (!tutor) return false;
        
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        const slot = availableSlots.find(s => s.id === selectedSlot);
        
        // Lấy sessions từ localStorage
        const allSessions = getAllSessions();
        
        const conflict = allSessions.find(session => {
            if (session.studentId !== user?.id) return false;
            if (session.status !== 'Scheduled') return false;
            if (session.date !== dateKey) return false;
            // So sánh với userId của tutor
            if (session.tutorId !== tutor.userId) return false;
            
            return session.time === `${slot.startTime} - ${slot.endTime}`;
        });
        
        if (conflict) {
            const subject = MOCK_SUBJECTS.find(s => s.id === conflict.subjectId);
            setConflictError(
                `Bạn đã có buổi học ${subject?.name || conflict.subject} với giảng viên này vào khung giờ này!`
            );
            return true;
        }
        
        setConflictError('');
        return false;
    };

    // Handlers
    const handleBook = async () => {
        // Kiểm tra xung đột
        if (checkConflict()) {
            return;
        }
        
        setShowConfirmation(true);
        
        try {
            const slot = availableSlots.find(s => s.id === selectedSlot);
            const subject = MOCK_SUBJECTS.find(s => s.id === selectedSubject);
            const dateKey = format(selectedDate, 'yyyy-MM-dd');
            
            // Get tutor userId from tutor profile
            const tutor = MOCK_TUTORS.find(t => t.id === selectedTutorId);
            
            // Tạo session mới
            await bookSession({
                studentId: user?.id,
                tutorId: tutor?.userId || selectedTutorId,
                subjectId: selectedSubject,
                subject: subject?.name || '',
                date: dateKey,
                time: `${slot.startTime} - ${slot.endTime}`
            });
            
            setTimeout(() => {
                alert('Booking Request Sent!');
                setShowConfirmation(false);
                // Reset selections
                setSelectedSubject('');
                setSelectedTutorId('');
                setSelectedDate(startOfToday());
                setSelectedSlot(null);
                setConflictError('');
            }, 500);
        } catch (error) {
            console.error('Error booking session:', error);
            alert('Có lỗi xảy ra khi đặt buổi học. Vui lòng thử lại!');
            setShowConfirmation(false);
        }
    };

    return (
        <div className="space-y-6">
      <h1 className="text-3xl font-bold text-hcmut-blue">Đặt Buổi Học</h1>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        
        {/* --- Section 1: Filters--- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn môn học</label>
            <select 
              value={selectedSubject}
              onChange={(e) => { setSelectedSubject(e.target.value); setSelectedTutorId(''); }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-hcmut-blue focus:border-hcmut-blue"
            >
              <option value="">Chọn môn học...</option>
              {MOCK_SUBJECTS.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.code} - {sub.name}</option>
              ))}
            </select>
          </div>

          {/* Tutor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn gia sư</label>
            <select 
              value={selectedTutorId}
              onChange={(e) => setSelectedTutorId(e.target.value)}
              disabled={!selectedSubject}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-hcmut-blue focus:border-hcmut-blue disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">{selectedSubject ? 'Chọn gia sư...' : 'Chọn môn học trước'}</option>
              {availableTutors.map(t => (
                <option key={t.id} value={t.id}>{t.user.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Section 2: Date & Time--- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Date Picker */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-hcmut-blue" /> Chọn Ngày
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['CN','T2','T3','T4','T5','T6','T7'].map(d => <span key={d} className="text-xs font-bold text-gray-500">{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {/* Generate next 14 days for demo */}
                {Array.from({ length: 14 }).map((_, i) => {
                  const date = addDays(startOfToday(), i);
                  const isSelected = isSameDay(date, selectedDate);
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`p-2 text-sm rounded-full hover:bg-blue-100 transition-colors ${
                        isSelected ? 'bg-hcmut-blue text-white hover:bg-blue-800' : 'text-gray-700'
                      }`}
                    >
                      {format(date, 'd')}
                    </button>
                  );
                })}
              </div>
              <p className="text-center mt-4 text-sm font-medium text-gray-600">
                {format(selectedDate, 'MMMM yyyy')}
              </p>
            </div>
          </div>

          {/* Right: Time Slots */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-semibold text-gray-900 flex items-center">
                 <Clock className="w-5 h-5 mr-2 text-hcmut-blue" /> Khung Giờ Trống
               </h3>
               {/* Auto Match Button from Mockup */}
               <button className="text-sm bg-blue-100 text-hcmut-blue px-3 py-1 rounded-full hover:bg-blue-200 font-medium">
                 Ghép Tự Động
               </button>
            </div>

            {!selectedTutorId ? (
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-400">
                Chọn gia sư để xem lịch trống
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="h-48 flex items-center justify-center bg-red-50 rounded-lg text-red-500">
                Không có khung giờ trống cho ngày này
              </div>
            ) : (
              <div className="space-y-4">
                {['Sáng', 'Chiều', 'Tối'].map((period) => {
                  const slotsInPeriod = availableSlots.filter(s => s.period === period);
                  if (slotsInPeriod.length === 0) return null;

                  return (
                    <div key={period}>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">{period}</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {slotsInPeriod.map(slot => (
                          <div key={slot.id} className="relative">
                            <button
                              disabled={slot.isBooked}
                              onClick={() => setSelectedSlot(slot.id)}
                              className={`w-full py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                                slot.isBooked 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : selectedSlot === slot.id
                                    ? 'bg-hcmut-blue text-white border-hcmut-blue shadow-md'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-hcmut-blue hover:text-hcmut-blue'
                              }`}
                            >
                              {slot.startTime} - {slot.endTime}
                            </button>
                            {slot.hasUserConflict && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                Đã đặt
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* --- Footer: Conflict Warning & Action Button --- */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          {/* Conflict Error Message */}
          {conflictError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800">Không thể đặt lịch</p>
                <p className="text-sm text-red-600 mt-1">{conflictError}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={handleBook}
              disabled={!selectedSlot}
              className="bg-hcmut-blue text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
            >
              {showConfirmation ? 'Đang xử lý...' : 'Đặt Buổi Học'}
              {!showConfirmation && <CheckCircle className="ml-2 w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
    )
};

export default BookSession;


