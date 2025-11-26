import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/mockData';
import type { UserProfile } from '../types/profile';
import { Loader } from 'lucide-react';

// Import profile card components
import { UserDetailsCard } from '../components/profile/UserDetailsCard';
import { LoginActivityCard } from '../components/profile/LoginActivityCard';
import { SessionsCard } from '../components/profile/SessionsCard';
import { ReportsCard } from '../components/profile/ReportsCard';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getUserProfile(user.id);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-hcmut-blue animate-spin" />
          <span className="ml-3 text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-semibold mb-2">Error Loading Profile</p>
          <p className="text-red-600">{error || 'Profile data not available'}</p>
        </div>
      </div>
    );
  }

  // Main content with 2x2 grid layout
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <UserDetailsCard user={profile.user} />
          <LoginActivityCard activities={profile.loginActivities} />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <SessionsCard sessions={profile.recentSessions} />
          <ReportsCard reports={profile.reports} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;