import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to the Tutor Support System
        </h1>
        <p className="text-lg text-gray-600">
          Hello, <span className="font-semibold text-hcmut-blue">{user?.name}</span>.
        </p>
        <p className="mt-2 text-gray-600">
          This system serves as a central hub for all tutoring activities at HCMUT.
          From here, you can manage your schedule, find tutors, and track your academic progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Placeholder for future widgets */}
         <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-hcmut-blue mb-2">Upcoming Sessions</h2>
            <p className="text-gray-500">No sessions scheduled for today.</p>
         </div>
         <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Notifications</h2>
            <p className="text-gray-500">You have no new notifications.</p>
         </div>
      </div>
    </div>
    );
};
export default HomePage;