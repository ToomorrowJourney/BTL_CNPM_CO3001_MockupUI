import React from 'react';
import { FileText, CheckCircle, Clock, Archive } from 'lucide-react';
import type { Report } from '../../types/report';

interface ReportsCardProps {
  reports: Report[];
}

export const ReportsCard: React.FC<ReportsCardProps> = ({ reports }) => {
  const getReportTypeBadge = (type: Report['type']) => {
    switch (type) {
      case 'attendance':
        return 'bg-blue-100 text-blue-700';
      case 'performance':
        return 'bg-green-100 text-green-700';
      case 'feedback':
        return 'bg-purple-100 text-purple-700';
    }
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'archived':
        return <Archive className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reports</h2>

      {reports.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No reports available</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-semibold text-gray-900">
                      {report.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${getReportTypeBadge(report.type)}`}
                    >
                      {report.type.charAt(0).toUpperCase() +
                        report.type.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(report.date)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className="ml-1.5 text-xs text-gray-600 capitalize">
                        {report.status}
                      </span>
                    </div>
                    {report.status === 'available' && (
                      <button className="text-sm text-hcmut-blue hover:underline">
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};