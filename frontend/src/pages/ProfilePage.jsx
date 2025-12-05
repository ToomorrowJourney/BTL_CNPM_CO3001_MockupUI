import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../services/mockData';
import { Loader } from 'lucide-react';
import './ProfilePage.css';

// Import profile card components
import { UserDetailsCard } from '../components/profile/UserDetailsCard';
import { LoginActivityCard } from '../components/profile/LoginActivityCard';
import { SessionsCard } from '../components/profile/SessionsCard';
import { ReportsCard } from '../components/profile/ReportsCard';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setError('Người dùng chưa xác thực');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getUserProfile(user.id);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không thể tải hồ sơ');
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
        <h1 className="text-3xl font-bold mb-6">Hồ Sơ Của Tôi</h1>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-hcmut-blue animate-spin" />
          <span className="ml-3 text-gray-600">Đang tải hồ sơ...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Hồ Sơ Của Tôi</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-semibold mb-2">Lỗi Tải Hồ Sơ</p>
          <p className="text-red-600">{error || 'Dữ liệu hồ sơ không khả dụng'}</p>
        </div>
      </div>
    );
  }

  // Main content with 2x2 grid layout
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Hồ Sơ Của Tôi</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <UserDetailsCard user={profile.user} />
          <LoginActivityCard activities={profile.loginActivities} />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Hide Sessions Card for Admin */}
          {user?.role !== 'Admin' && (
            <SessionsCard sessions={profile.recentSessions} />
          )}
          {/* Show Reports Card only for Admin */}
          {user?.role === 'Admin' && (
            <ReportsCard reports={profile.reports} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
