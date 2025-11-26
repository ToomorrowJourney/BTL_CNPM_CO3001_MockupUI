import { MOCK_SESSIONS, MOCK_FEEDBACK, MOCK_SUBJECTS } from "./mockData";

export const getSystemStats = () => {
    const totalSessions = MOCK_SESSIONS.length;

    const activeStudents = new Set(
        MOCK_SESSIONS.map((session) => session.studentId)
    ).size;

    const totalRating = MOCK_FEEDBACK.reduce(
        (acc, curr) => acc + curr.ratingOverall,
        0
    );
    const avgSatisfaction = MOCK_FEEDBACK.length
        ? (totalRating / MOCK_FEEDBACK.length).toFixed(1)
        : "N/A";

    return {
        totalSessions,
        activeStudents,
        avgSatisfaction,
        totalTutors: 3,
    };
};

// Data for Pie Chart (Session Statuses)
export const getSessionStatusData = () => {
    const statusCounts = MOCK_SESSIONS.reduce((acc, session) => {
        acc[session.status] = (acc[session.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return [
        {
            name: "Completed",
            value: statusCounts["Completed"] || 0,
            color: "#10B981",
        }, // Green
        {
            name: "Scheduled",
            value: statusCounts["Scheduled"] || 0,
            color: "#3B82F6",
        }, // Blue
        {
            name: "Cancelled",
            value: statusCounts["Cancelled"] || 0,
            color: "#EF4444",
        }, // Red
        {
            name: "Missed",
            value: statusCounts["Missed"] || 0,
            color: "#9CA3AF",
        },
    ];
};

// Data for Bar Chart (Sessions per Subject)
export const getSessionBySubject = () => {
    const subjectCounts = MOCK_SESSIONS.reduce((acc, session) => {
        acc[session.subjectId] = (acc[session.subjectId] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Map subject IDs to names
    return Object.keys(subjectCounts).map((subjectId) => {
        const subject = MOCK_SUBJECTS.find((s) => s.id === subjectId);
        return {
            name: subject ? subject.code : subjectId,
            sessions: subjectCounts[subjectId],
        };
    });
};

// Tutor performance stats
export const getTutorStats = (tutorId: string) => {
    // Filter feedback for this tutor
    const tutorFeedback = MOCK_FEEDBACK.filter((f) => {
        const session = MOCK_SESSIONS.find((s) => s.id === f.sessionId);
        return session?.tutorId === tutorId;
    });

    const totalRating = tutorFeedback.reduce(
        (acc, curr) => acc + curr.ratingTutor,
        0
    );
    const avgRating = tutorFeedback.length
        ? (totalRating / tutorFeedback.length).toFixed(1)
        : "0.0";

    return {
        avgRating,
        reviewCount: tutorFeedback.length,
    };
};

// Student progress stats
export const getStudentStats = (studentId: string) => {
    const mySessions = MOCK_SESSIONS.filter((s) => s.studentId === studentId);
    const completedSessions = mySessions.filter(
        (s) => s.status === "Completed"
    ).length;

    const hoursLearned = completedSessions * 2;

    return {
        totalSessions: mySessions.length,
        completedSessions,
        hoursLearned,
    };
};
