import type { Course } from './courseMaterial';

export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
  finalGrade?: string;
}

export interface UserCourses {
  enrolledCourses: Course[];
  teachingCourses: Course[];
  allCourses: Course[];
}