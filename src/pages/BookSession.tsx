import React, { useState, useMemo } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { MOCK_SUBJECTS, MOCK_TUTORS } from '../services/mockData';
import type { TimeSlot } from '../types/booking';

const BookSession: React.FC = () => {
    // State
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [selectedTutorId, setSelectedTutorId] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Filter tutors by selected subject
    const availableTutors = useMemo(() => {
        if (!selectedSubject) return [];
        return MOCK_TUTORS.filter(t => t.subjects.includes(selectedSubject));
    }, [selectedSubject]);

    // Get slots for selected tutor and date
    const availableSlots: TimeSlot[] = useMemo(() => {
        if (!selectedTutorId) return [];
        const tutor = MOCK_TUTORS.find(t => t.id === selectedTutorId);
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        return tutor?.availability[dateKey] || [];
    }, [selectedTutorId, selectedDate]);

    // Handlers
    const handleBook = () => {
        setShowConfirmation(true);
        setTimeout(() => {
            alert('Booking Request Sent!');
            setShowConfirmation(false);
            // Reset selections
            setSelectedSubject('');
            setSelectedTutorId('');
            setSelectedDate(startOfToday());
            setSelectedSlot(null);
        }, 1000);
    };

    return (
        <div className="space-y-6">
      <h1 className="text-3xl font-bold text-hcmut-blue">Book a session</h1>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        
        {/* --- Section 1: Filters--- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose a subject</label>
            <select 
              value={selectedSubject}
              onChange={(e) => { setSelectedSubject(e.target.value); setSelectedTutorId(''); }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-hcmut-blue focus:border-hcmut-blue"
            >
              <option value="">Select a Subject...</option>
              {MOCK_SUBJECTS.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.code} - {sub.name}</option>
              ))}
            </select>
          </div>

          {/* Tutor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a tutor</label>
            <select 
              value={selectedTutorId}
              onChange={(e) => setSelectedTutorId(e.target.value)}
              disabled={!selectedSubject}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-hcmut-blue focus:border-hcmut-blue disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">{selectedSubject ? 'Select a Tutor...' : 'Choose subject first'}</option>
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
              <CalendarIcon className="w-5 h-5 mr-2 text-hcmut-blue" /> Select Date
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <span key={d} className="text-xs font-bold text-gray-500">{d}</span>)}
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
                 <Clock className="w-5 h-5 mr-2 text-hcmut-blue" /> Available Slots
               </h3>
               {/* Auto Match Button from Mockup */}
               <button className="text-sm bg-blue-100 text-hcmut-blue px-3 py-1 rounded-full hover:bg-blue-200 font-medium">
                 Automatic Matching
               </button>
            </div>

            {!selectedTutorId ? (
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-400">
                Select a tutor to view availability
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="h-48 flex items-center justify-center bg-red-50 rounded-lg text-red-500">
                No slots available for this date
              </div>
            ) : (
              <div className="space-y-4">
                {['Morning', 'Afternoon', 'Evening'].map((period) => {
                  const slotsInPeriod = availableSlots.filter(s => s.period === period);
                  if (slotsInPeriod.length === 0) return null;

                  return (
                    <div key={period}>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">{period}</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {slotsInPeriod.map(slot => (
                          <button
                            key={slot.id}
                            disabled={slot.isBooked}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                              slot.isBooked 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : selectedSlot === slot.id
                                  ? 'bg-hcmut-blue text-white border-hcmut-blue shadow-md'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-hcmut-blue hover:text-hcmut-blue'
                            }`}
                          >
                            {slot.startTime} - {slot.endTime}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* --- Footer: Action Button --- */}
        <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
          <button
            onClick={handleBook}
            disabled={!selectedSlot}
            className="bg-hcmut-blue text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
          >
            {showConfirmation ? 'Processing...' : 'Book Session'}
            {!showConfirmation && <CheckCircle className="ml-2 w-5 h-5" />}
          </button>
        </div>

      </div>
    </div>
    )
};

export default BookSession;
