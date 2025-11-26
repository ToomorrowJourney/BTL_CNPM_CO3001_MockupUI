import type { User } from './user';
import type { Session } from './session';
import type { LoginActivity } from './loginActivity';
import type { Report } from './report';

export interface UserProfile {
  user: User;
  recentSessions: Session[];
  loginActivities: LoginActivity[];
  reports: Report[];
}