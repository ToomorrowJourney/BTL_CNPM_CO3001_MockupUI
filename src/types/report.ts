export interface Report {
  id: string;
  title: string;
  type: 'attendance' | 'performance' | 'feedback';
  date: Date;
  status: 'available' | 'pending' | 'archived';
  sessionId?: string;
}