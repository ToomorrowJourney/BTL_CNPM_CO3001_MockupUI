export interface LoginActivity {
  id: string;
  timestamp: Date;
  ipAddress: string;
  device: string;
  location: string;
  status: 'success' | 'failed';
}