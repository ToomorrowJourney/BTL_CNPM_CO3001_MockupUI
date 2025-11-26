export interface CourseSyllabus {
  id: string;
  courseId: string;
  
  // Course Overview
  courseObjectives: string[];
  courseDescription: string;
  prerequisites?: string[];
  
  // Course Content
  topics: SyllabusTopic[];
  
  // Assessment
  gradingScheme: GradingComponent[];
  
  // Resources
  textbooks: Textbook[];
  references?: string[];
  
  // Documents
  syllabusDocuments?: SyllabusDocument[];
  
  // Metadata
  lastUpdated: string;
  academicYear: string;
}

export interface SyllabusTopic {
  week: number;
  title: string;
  description: string;
  learningOutcomes?: string[];
}

export interface GradingComponent {
  component: string;
  weight: number;
  description?: string;
}

export interface Textbook {
  title: string;
  author: string;
  edition?: string;
  isbn?: string;
  required: boolean;
}

export interface SyllabusDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  fileSize: number;
}