import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCourses } from '../services/mockData';
import CourseCard from '../components/courses/CourseCard';
import { Search, Filter } from 'lucide-react';
import './CoursesPage.css';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock user data - in real app, this would come from auth context
  const mockUser = {
    id: '2569004',
    role: 'Student'
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchQuery, selectedCategory]);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const data = await getUserCourses(mockUser.id, mockUser.role);
      setCourses(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải khóa học');
      console.error('Error loading courses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        course =>
          course.code.toLowerCase().includes(query) ||
          course.name.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const categories = [
    { value: 'all', label: 'Tất cả danh mục' },
    { value: 'Programming', label: 'Lập trình' },
    { value: 'Database', label: 'Cơ sở dữ liệu' },
    { value: 'Software Engineering', label: 'Công nghệ phần mềm' },
    { value: 'AI & Machine Learning', label: 'AI & Học máy' },
    { value: 'Networks', label: 'Mạng máy tính' },
    { value: 'Other', label: 'Khác' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hcmut-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải khóa học...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadCourses}
            className="px-4 py-2 bg-hcmut-blue text-white rounded-lg hover:bg-blue-700"
          >
            Thử Lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Khóa Học</h1>
        <p className="text-gray-600">
          {mockUser.role === 'Student' 
            ? 'Duyệt các khóa học bạn đã đăng ký'
            : mockUser.role === 'Tutor'
            ? 'Quản lý các khóa học bạn giảng dạy'
            : 'Duyệt tất cả các khóa học có sẵn'}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học theo mã hoặc tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hcmut-blue focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="relative sm:w-64">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hcmut-blue focus:border-transparent appearance-none bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">Không tìm thấy khóa học nào</p>
          {searchQuery || selectedCategory !== 'all' ? (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-hcmut-blue hover:underline"
            >
              Xóa bộ lọc
            </button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => handleCourseClick(course.id)}
              userRole={mockUser.role}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
