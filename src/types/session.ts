export type SessionStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Missed';

export interface Session {
  id: string;
  studentId: string;
  tutorId: string;
  subjectId: string;
  subject: string;
  date: string; // ISO date string
  time: string; // e.g., "14:00 - 15:00"
  status: SessionStatus;
  cancelReason?: string;
}

export interface CancelSessionRequest {
  sessionId: string;
  reason: string;
}
