import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_TUTORS } from '../services/mockData';
import type { TimeSlot } from '../types/booking';
import { ChevronLeft, ChevronRight, Clock, Check, Save } from 'lucide-react';

const SetAvailabilityPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<Record<string, TimeSlot[]>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const fetchAvailability = async () => {
        if (!user) return;
        
        // Find tutor profile matching the user
        const tutorProfile = MOCK_TUTORS.find(t => t.userId === user.id);
        
        if (tutorProfile) {
            // Deep copy to allow mutation in local state
            setAvailability(JSON.parse(JSON.stringify(tutorProfile.availability)));
        } else {
            // Initialize empty if not found
             setAvailability({});
        }
        setLoading(false);
    };

    fetchAvailability();
  }, [user]);

  const getDaysOfWeek = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    start.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const currentWeekDays = getDaysOfWeek(selectedDate);
  const selectedDateStr = formatDate(selectedDate);

  const POTENTIAL_SLOTS = [
      { id: 's1', startTime: '07:00', endTime: '09:00', period: 'Morning' },
      { id: 's2', startTime: '09:00', endTime: '11:00', period: 'Morning' },
      { id: 's3', startTime: '13:00', endTime: '15:00', period: 'Afternoon' },
      { id: 's4', startTime: '15:00', endTime: '17:00', period: 'Afternoon' },
      { id: 's5', startTime: '17:00', endTime: '19:00', period: 'Evening' },
  ] as const;

  const isSlotAvailable = (slotStartTime: string) => {
      return (availability[selectedDateStr] || []).some(s => s.startTime === slotStartTime);
  };

  const toggleSlot = (templateSlot: typeof POTENTIAL_SLOTS[number]) => {
      const currentDaySlots = [...(availability[selectedDateStr] || [])];
      const existingIndex = currentDaySlots.findIndex(s => s.startTime === templateSlot.startTime);

      if (existingIndex >= 0) {
          // Check if booked
          if (currentDaySlots[existingIndex].isBooked) {
              setMessage({ type: 'error', text: 'Cannot remove a booked slot.' });
              setTimeout(() => setMessage(null), 3000);
              return;
          }
          // Remove it
          currentDaySlots.splice(existingIndex, 1);
      } else {
          // Add it
          currentDaySlots.push({
              id: Date.now().toString(), // temp id
              startTime: templateSlot.startTime,
              endTime: templateSlot.endTime,
              period: templateSlot.period,
              isBooked: false
          });
      }
      
      setAvailability({
          ...availability,
          [selectedDateStr]: currentDaySlots
      });
  };

  const handleSave = () => {
      // In a real app, this would make an API call
      // For now, we just show a success message as we updated local state
      setMessage({ type: 'success', text: 'Availability saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
  };
  
  const changeWeek = (offset: number) => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + (offset * 7));
      setSelectedDate(newDate);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Set Availability</h1>
        <button 
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-hcmut-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <button onClick={() => changeWeek(-1)} className="p-2 hover:bg-gray-200 rounded-full">
                <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold text-lg">
                {currentWeekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {currentWeekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button onClick={() => changeWeek(1)} className="p-2 hover:bg-gray-200 rounded-full">
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>

        {/* Days Row */}
        <div className="grid grid-cols-7 border-b border-gray-200">
            {currentWeekDays.map((date) => {
                const isSelected = formatDate(date) === selectedDateStr;
                const isToday = formatDate(date) === formatDate(new Date());
                
                return (
                    <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`p-4 text-center border-r border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50 border-b-2 border-b-hcmut-blue' : ''}`}
                    >
                        <div className={`text-xs font-medium mb-1 ${isSelected ? 'text-hcmut-blue' : 'text-gray-500'}`}>
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className={`text-lg font-bold ${isSelected ? 'text-hcmut-blue' : isToday ? 'text-hcmut-blue' : 'text-gray-900'}`}>
                            {date.getDate()}
                        </div>
                    </button>
                );
            })}
        </div>

        {/* Time Slots Area */}
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                Time Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {POTENTIAL_SLOTS.map((slot) => {
                    const isActive = isSlotAvailable(slot.startTime);
                    const currentDaySlots = availability[selectedDateStr] || [];
                    const actualSlot = currentDaySlots.find(s => s.startTime === slot.startTime);
                    const isBooked = actualSlot?.isBooked;

                    return (
                        <button
                            key={slot.id}
                            onClick={() => toggleSlot(slot)}
                            disabled={isBooked}
                            className={`
                                relative flex items-center justify-between p-4 rounded-lg border-2 transition-all
                                ${isBooked 
                                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-70' 
                                    : isActive 
                                        ? 'bg-blue-50 border-hcmut-blue' 
                                        : 'bg-white border-gray-200 hover:border-gray-300'
                                }
                            `}
                        >
                            <div>
                                <div className={`font-semibold ${isActive ? 'text-hcmut-blue' : 'text-gray-700'}`}>
                                    {slot.startTime} - {slot.endTime}
                                </div>
                                <div className="text-xs text-gray-500">{slot.period}</div>
                            </div>
                            
                            {isBooked ? (
                                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded">Booked</span>
                            ) : (
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-hcmut-blue text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    {isActive ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                <p className="font-medium mb-1">Note:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Blue outlined slots are available for students to book.</li>
                    <li>Booked slots cannot be removed here. Please cancel the session from the Dashboard if needed.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SetAvailabilityPage;