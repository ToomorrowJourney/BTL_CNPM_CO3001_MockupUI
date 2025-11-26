export interface SessionFeedback {
  id: string;
  sessionId: string;
  studentId: string;
  rating: number; // 1-5 (overall satisfaction)
  ratingOverall: number; // 1-5
  ratingTutor: number; // 1-5
  ratingContent: number; // 1-5
  comments: string;
  createdAt: string; // ISO date string
}

export interface CreateFeedbackRequest {
  sessionId: string;
  studentId: string;
  rating: number;
  comments: string;
}
