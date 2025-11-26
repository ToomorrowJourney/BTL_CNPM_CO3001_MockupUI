export type UserRole = 'Student' | 'Tutor' | 'Admin';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatarUrl?: string;
    studentId?: string;      // For students
    department?: string;     // For instructors
    faculty: string;
    joinedDate: Date;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}