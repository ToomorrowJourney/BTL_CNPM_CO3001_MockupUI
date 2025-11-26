import type { User } from "./user";

export interface Subject {
    id: string;
    code: string;
    name: string;
}

export interface TimeSlot {
    id: string;
    startTime: string; // "08:00"
    endTime: string;   // "10:00"
    period: 'Morning' | 'Afternoon' | 'Evening';
    isBooked: boolean;
}

export interface TutorProfile {
  id: string;
  userId: string;
  user: User; // Link to the User info
  subjects: string[]; // Array of Subject IDs
  availability: Record<string, TimeSlot[]>; // Key: "YYYY-MM-DD", Value: Slots
}