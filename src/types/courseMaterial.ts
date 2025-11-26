export type CourseCategory =
  | 'Programming'
  | 'Database'
  | 'Software Engineering'
  | 'AI & Machine Learning'
  | 'Networks'
  | 'Other';

export interface CourseMaterial {
  id: string;
  courseId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  downloadUrl: string;
  fileData?: string; // base64 encoded file data
}

export interface Course {
  id: string;
  code: string;
  name: string;
  tutorId: string;
  description: string;
  credits?: number;
  semester?: string;
  enrolledStudents?: string[];
  thumbnailUrl?: string;
  category?: CourseCategory;
}

export interface UploadMaterialRequest {
  courseId: string;
  file: File;
  uploadedBy: string;
}
