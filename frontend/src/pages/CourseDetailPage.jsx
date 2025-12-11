import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CourseDetailPage.css';
import {
  getCourseById,
  getMaterialsByCourseId,
  uploadMaterial,
  deleteMaterial,
  getSyllabusByCourseId,
  getTeachingPlanByCourseId,
  MOCK_USERS
} from '../services/mockData';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  File,
  Image,
  FileCode,
  AlertCircle
} from 'lucide-react';
import SyllabusView from '../components/courses/SyllabusView';
import TeachingPlanView from '../components/courses/TeachingPlanView';
import FeedbackView from '../components/courses/FeedbackView';
const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState('materials');
  const [syllabus, setSyllabus] = useState(null);
  const [teachingPlan, setTeachingPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Mock user for development
  const mockUser = {
    id: '2569004',
    role: 'Student'
  };
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Check if current user is the tutor for this course
  const isTutor = user?.role === 'Tutor' && course?.tutorId === user?.id;

  useEffect(() => {
    if (courseId) {
      const foundCourse = getCourseById(courseId);
      setCourse(foundCourse || null);

      if (!foundCourse) {
        setError('Không tìm thấy khóa học');
        return;
      }

      // Load course materials
      const courseMaterials = getMaterialsByCourseId(courseId);
      setMaterials(courseMaterials);

      // Load syllabus and teaching plan
      setIsLoading(true);
      Promise.all([
        getSyllabusByCourseId(courseId),
        getTeachingPlanByCourseId(courseId)
      ]).then(([syllabusData, planData]) => {
        setSyllabus(syllabusData);
        setTeachingPlan(planData);
      }).catch(err => {
        console.error('Lỗi khi tải dữ liệu khóa học:', err);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [courseId]);

  // Format file size to human-readable format
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return <FileText className="w-8 h-8 text-red-500" />;
    }
    if (fileType.includes('image')) {
      return <Image className="w-8 h-8 text-blue-500" />;
    }
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) {
      return <FileCode className="w-8 h-8 text-orange-500" />;
    }
    if (fileType.includes('document') || fileType.includes('word')) {
      return <FileText className="w-8 h-8 text-blue-600" />;
    }
    return <File className="w-8 h-8 text-gray-500" />;
  };

  // Get uploader name
  const getUploaderName = (userId) => {
    const uploader = MOCK_USERS.find(u => u.id === userId);
    return uploader?.name || 'Không rõ';
  };

  // Handle file selection
  const handleFileSelect = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !courseId || !user) return;

    const file = files[0];

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Loại file không được hỗ trợ. Vui lòng tải lên file PDF, DOCX, PPTX, TXT, hoặc file ảnh.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Kích thước file vượt quá giới hạn 10MB.');
      return;
    }

    setIsUploading(true);
    setUploadProgress('Đang tải file lên...');
    setError('');

    try {
      const newMaterial = await uploadMaterial(courseId, file, user.id);
      setMaterials(prev => [...prev, newMaterial]);
      setUploadProgress('Tải file lên thành công!');

      setTimeout(() => {
        setUploadProgress('');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải file lên');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle file download
  const handleDownload = (material) => {
    if (!material.fileData) {
      setError('Dữ liệu file không khả dụng');
      return;
    }

    try {
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = material.fileData;
      link.download = material.fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
      // Show success message
      setUploadProgress(`Đang tải xuống ${material.fileName}...`);
      setTimeout(() => {
        setUploadProgress('');
      }, 2000);
    } catch (err) {
      console.error('Error downloading file:', err);
      setError('Không thể tải file xuống. Vui lòng thử lại.');
    }
  };

  // Handle file deletion
  const handleDelete = async (materialId) => {
    if (!window.confirm('Bạn có chắc muốn xóa file này?')) {
      return;
    }

    setDeletingId(materialId);
    setError('');

    try {
      await deleteMaterial(materialId);
      setMaterials(prev => prev.filter(m => m.id !== materialId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể xóa file');
    } finally {
      setDeletingId(null);
    }
  };

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Không Tìm Thấy Khóa Học</h2>
          <p className="text-gray-500 mb-4">
            Khóa học bạn tìm kiếm không tồn tại.
          </p>
          <Link
            to="/dashboard"
            className="text-hcmut-blue hover:underline"
          >
            Quay lại Bảng Điều Khiển
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-hcmut-blue to-blue-600">
          <h1 className="text-2xl font-bold text-white">{course.name}</h1>
          <p className="text-sm text-blue-100 mt-1">
            {course.code} - {course.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation */}
          <div className="md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'syllabus'
                    ? 'bg-hcmut-blue text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đề Cương
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'plan'
                    ? 'bg-hcmut-blue text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Kế Hoạch Giảng Dạy
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'materials'
                    ? 'bg-hcmut-blue text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tài Liệu
              </button>
              {/* Feedback tab - chỉ hiển thị cho sinh viên */}
              {!isTutor && (
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'feedback'
                      ? 'bg-hcmut-blue text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Phản Hồi
                </button>
              )}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {activeTab === 'syllabus' && (
              <SyllabusView syllabus={syllabus} isLoading={isLoading} />
            )}

            {activeTab === 'plan' && (
              <TeachingPlanView teachingPlan={teachingPlan} isLoading={isLoading} />
            )}

            {activeTab === 'materials' && (
              <div className="space-y-6">
                {/* Upload Section (Tutor Only) */}
                {isTutor && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Tải Lên Tài Liệu
                      </h3>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        accept=".pdf,.docx,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className={`flex items-center px-4 py-2 bg-hcmut-blue text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer ${
                          isUploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Chèn Tài Liệu
                      </label>
                      {uploadProgress && (
                        <span className="text-sm text-green-600 flex items-center">
                          {uploadProgress}
                        </span>
                      )}
                      {isUploading && (
                        <span className="inline-block w-4 h-4 border-2 border-hcmut-blue border-t-transparent rounded-full animate-spin"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Định dạng chấp nhận: PDF, DOCX, PPTX, TXT, Ảnh (Tối đa 10MB)
                    </p>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Materials List */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tài Liệu Khóa Học
                  </h3>

                  {materials.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <File className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">
                        Chưa có tài liệu nào được tải lên.
                      </p>
                      {isTutor && (
                        <p className="text-sm text-gray-400 mt-2">
                          Tải lên tài liệu đầu tiên để bắt đầu.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {materials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center flex-1 min-w-0">
                            {/* File Icon */}
                            <div className="flex-shrink-0">
                              {getFileIcon(material.fileType)}
                            </div>

                            {/* File Info */}
                            <div className="ml-4 flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {material.fileName}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                                <span>{formatFileSize(material.fileSize)}</span>
                                <span>•</span>
                                <span>{formatDate(material.uploadedAt)}</span>
                                <span>•</span>
                                <span>Bởi {getUploaderName(material.uploadedBy)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2 ml-4">
                            {/* Download Button */}
                            <button
                              onClick={() => handleDownload(material)}
                              disabled={!material.fileData}
                              className="p-2 text-hcmut-blue hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Tải xuống"
                            >
                              <Download className="w-5 h-5" />
                            </button>

                            {/* Delete Button (Tutor Only) */}
                            {isTutor && (
                              <button
                                onClick={() => handleDelete(material.id)}
                                disabled={deletingId === material.id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                                title="Xóa"
                              >
                                {deletingId === material.id ? (
                                  <span className="inline-block w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                  <Trash2 className="w-5 h-5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <FeedbackView courseId={courseId} userRole={mockUser.role} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
