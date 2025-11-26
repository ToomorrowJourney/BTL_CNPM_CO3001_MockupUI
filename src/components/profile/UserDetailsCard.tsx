import React from 'react';
import { Mail, User as UserIcon, Building2, Calendar } from 'lucide-react';
import type { User } from '../../types/user';

interface UserDetailsCardProps {
  user: User;
}

export const UserDetailsCard: React.FC<UserDetailsCardProps> = ({ user }) => {
  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'Student':
        return 'bg-blue-100 text-blue-800';
      case 'Tutor':
        return 'bg-purple-100 text-purple-800';
      case 'Admin':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatJoinedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>

      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className="w-10 h-10 text-gray-500" />
          )}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor()}`}
          >
            {user.role}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <Mail className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
          <span className="text-gray-700">{user.email}</span>
        </div>

        {user.role === 'Student' && user.studentId && (
          <div className="flex items-center text-sm">
            <UserIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-700">Student ID: {user.studentId}</span>
          </div>
        )}

        {user.role === 'Student' && user.faculty && (
          <div className="flex items-center text-sm">
            <Building2 className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{user.faculty}</span>
          </div>
        )}

        {(user.role === 'Tutor' || user.role === 'Admin') && user.department && (
          <div className="flex items-center text-sm">
            <Building2 className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{user.department}</span>
          </div>
        )}

        {user.joinedDate && (
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-700">
              Joined {formatJoinedDate(user.joinedDate)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};