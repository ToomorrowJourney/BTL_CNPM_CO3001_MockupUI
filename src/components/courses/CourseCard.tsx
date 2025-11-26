import type { Course } from '../../types/courseMaterial';
import type { UserRole } from '../../types/user';
import { Book, Users, GraduationCap } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  userRole: UserRole;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, userRole }) => {
  const getCategoryIcon = (category: string | undefined) => {
    switch (category) {
      case 'Programming':
      case 'Software Engineering':
        return <GraduationCap className="w-8 h-8 text-white" />;
      case 'Database':
        return <Book className="w-8 h-8 text-white" />;
      default:
        return <Book className="w-8 h-8 text-white" />;
    }
  };

  const getCategoryColor = (category: string | undefined) => {
    switch (category) {
      case 'Programming':
        return 'from-blue-500 to-blue-600';
      case 'Database':
        return 'from-green-500 to-green-600';
      case 'Software Engineering':
        return 'from-purple-500 to-purple-600';
      case 'AI & Machine Learning':
        return 'from-pink-500 to-pink-600';
      case 'Networks':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group"
    >
      {/* Thumbnail/Icon Header */}
      <div className={`aspect-video bg-gradient-to-br ${getCategoryColor(course.category)} flex items-center justify-center`}>
        {getCategoryIcon(course.category)}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Course Code */}
        <div className="text-sm font-semibold text-hcmut-blue mb-1">
          {course.code}
        </div>

        {/* Course Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-hcmut-blue transition-colors line-clamp-2">
          {course.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Book className="w-4 h-4" />
            <span>{course.credits || 3} Credits</span>
          </div>
          
          {userRole === 'Tutor' && course.enrolledStudents && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.enrolledStudents.length} Students</span>
            </div>
          )}
        </div>

        {/* Category Badge */}
        {course.category && (
          <div className="mt-3">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
              {course.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;