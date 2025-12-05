import React from 'react';
import { Clock, Monitor, MapPin } from 'lucide-react';
import './LoginActivityCard.css';


export const LoginActivityCard = ({
  activities,
}) => {
  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const recentActivities = activities.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Hoạt Động Đăng Nhập</h2>

      {recentActivities.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Không có hoạt động đăng nhập</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700 font-medium">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                  {activity.status === 'failed' && (
                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                      Thất bại
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <Monitor className="w-3 h-3 mr-1.5" />
                  <span>{activity.device}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1.5" />
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
