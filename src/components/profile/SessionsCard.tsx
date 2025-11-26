import React from 'react';
import { BookOpen, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Session } from '../../types/session';

interface SessionsCardProps {
  sessions: Session[];
}

export const SessionsCard: React.FC<SessionsCardProps> = ({ sessions }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const upcomingSessions = sessions.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
        <Link
          to="/my-sessions"
          className="text-sm text-hcmut-blue hover:underline"
        >
          View All
        </Link>
      </div>

      {upcomingSessions.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No upcoming sessions</p>
          <Link
            to="/book-session"
            className="inline-block mt-3 text-sm text-hcmut-blue hover:underline"
          >
            Book a session
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <Link
              key={session.id}
              to={`/sessions/${session.id}`}
              className="block p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-hcmut-blue hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-4 h-4 text-hcmut-blue mr-2" />
                    <span className="font-semibold text-gray-900">
                      {session.subject}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    <span>{formatDate(session.date)}</span>
                    <span className="mx-2">•</span>
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                      {session.id}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};