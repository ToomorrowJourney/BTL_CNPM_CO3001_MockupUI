export interface TeachingPlan {
  id: string;
  courseId: string;
  
  // Schedule
  sessions: TeachingSession[];
  
  // Resources
  planDocuments?: PlanDocument[];
  
  // Metadata
  semester: string;
  lastUpdated: string;
}

export interface TeachingSession {
  sessionNumber: number;
  week: number;
  date: string;
  topic: string;
  activities: string[];
  materials?: string[];
  assignments?: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface PlanDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  fileSize: number;
}