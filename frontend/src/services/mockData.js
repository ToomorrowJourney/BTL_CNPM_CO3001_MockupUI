/**
 *** Dịch vụ Dữ liệu Mock
 *** Cung cấp dữ liệu mock cho phát triển và kiểm thử
 *** File này chứa tất cả dữ liệu mock được sử dụng trong toàn bộ ứng dụng
 **/

// ============================================================================
// MOCK USERS
// ============================================================================

export const MOCK_USERS= [
  {
    id: '2569004',
    name: 'Student Nguyen Vinh',
    email: 'nguyen.vinh@hcmut.edu.vn',
    role: 'Student',
    avatarUrl: 'https://ui-avatars.com/api/?name=Nguyen+Vinh&background=0D8ABC&color=fff',
    studentId: '2569004',
    faculty: 'Faculty of Computer Science and Engineering',
    joinedDate: new Date('2023-09-01')
  },
  {
    id: 'TUT001',
    name: 'Tutor Vinh Nguyen',
    email: 'tutor.vinh@hcmut.edu.vn',
    role: 'Tutor',
    avatarUrl: 'https://ui-avatars.com/api/?name=Vinh+Nguyen&background=eb4034&color=fff',
    department: 'Software Engineering Department',
    faculty: 'Faculty of Computer Science and Engineering',
    joinedDate: new Date('2020-01-15')
  },
  {
    id: 'TUT002',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hcmut.edu.vn',
    role: 'Tutor',
    avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=eb4034&color=fff',
    department: 'Database Systems Department',
    faculty: 'Faculty of Computer Science and Engineering',
    joinedDate: new Date('2019-08-20')
  },
  {
    id: 'TUT003',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@hcmut.edu.vn',
    role: 'Tutor',
    avatarUrl: 'https://ui-avatars.com/api/?name=Michael+Chen&background=eb4034&color=fff',
    department: 'Advanced Programming Department',
    faculty: 'Faculty of Computer Science and Engineering',
    joinedDate: new Date('2018-03-10')
  },
  {
    id: 'ADM001',
    name: 'Administrator Nguyen Vinh',
    email: 'admin@hcmut.edu.vn',
    role: 'Admin',
    avatarUrl: 'https://ui-avatars.com/api/?name=Admin&background=333&color=fff',
    department: 'Administration Department',
    faculty: 'Faculty of Computer Science and Engineering',
    joinedDate: new Date('2017-06-01')
  }
];

export const MOCK_SESSIONS= [
  {
    id: 'SES001',
    studentId: '2569004',
    tutorId: 'TUT001',
    subjectId: 'CO3001',
    subject: 'Công nghệ phần mềm',
    date: '2025-12-02',
    time: '14:00 - 15:00',
    status: 'Completed'
  },
  {
    id: 'SES002',
    studentId: '2569004',
    tutorId: 'TUT002',
    subjectId: 'CO2013',
    subject: 'Hệ cơ sở dữ liệu',
    date: '2025-12-05',
    time: '10:00 - 11:30',
    status: 'Completed'
  },
  {
    id: 'SES003',
    studentId: '2569004',
    tutorId: 'TUT003',
    subjectId: 'CO2039',
    subject: 'Lập trình nâng cao',
    date: '2025-12-08',
    time: '15:00 - 16:30',
    status: 'Completed'
  },
  {
    id: 'SES004',
    studentId: '2569004',
    tutorId: 'TUT001',
    subjectId: 'CO3001',
    subject: 'Công nghệ phần mềm',
    date: '2025-11-20',
    time: '09:00 - 10:00',
    status: 'Completed'
  },
  {
    id: 'SES005',
    studentId: '2569004',
    tutorId: 'TUT002',
    subjectId: 'CO2013',
    subject: 'Hệ cơ sở dữ liệu',
    date: '2025-11-18',
    time: '13:00 - 14:30',
    status: 'Completed'
  },
  {
    id: 'SES006',
    studentId: '2569004',
    tutorId: 'TUT003',
    subjectId: 'CO2039',
    subject: 'Lập trình nâng cao',
    date: '2025-11-15',
    time: '11:00 - 12:00',
    status: 'Cancelled',
    cancelReason: 'Student had a conflicting exam'
  },
  {
    id: 'SES007',
    studentId: '2569004',
    tutorId: 'TUT001',
    subjectId: 'CO3001',
    subject: 'Công nghệ phần mềm',
    date: '2025-11-10',
    time: '16:00 - 17:30',
    status: 'Cancelled',
    cancelReason: 'Tutor was unavailable due to illness'
  },
  {
    id: 'SES008',
    studentId: '2569004',
    tutorId: 'TUT002',
    subjectId: 'CO2013',
    subject: 'Hệ cơ sở dữ liệu',
    date: '2025-11-12',
    time: '14:00 - 15:30',
    status: 'Completed'
  },
  {
    id: 'SES009',
    studentId: '2569004',
    tutorId: 'TUT001',
    subjectId: 'CO3001',
    subject: 'Công nghệ phần mềm',
    date: '2025-11-08',
    time: '10:00 - 11:00',
    status: 'Completed'
  },
  {
    id: 'SES010',
    studentId: '2569004',
    tutorId: 'TUT003',
    subjectId: 'CO2039',
    subject: 'Lập trình nâng cao',
    date: '2025-11-05',
    time: '13:00 - 14:30',
    status: 'Missed'
  },
  {
    id: 'SES011',
    studentId: '2569004',
    tutorId: 'TUT001',
    subjectId: 'CO3001',
    subject: 'Công nghệ phần mềm',
    date: '2025-11-28',
    time: '14:00 - 15:30',
    status: 'Completed'
  },
  {
    id: 'SES012',
    studentId: '2569004',
    tutorId: 'TUT001',
    subjectId: 'CO3001',
    subject: 'Công nghệ phần mềm',
    date: '2025-11-25',
    time: '09:00 - 10:30',
    status: 'Completed'
  },
  {
    id: 'SES013',
    studentId: '2569004',
    tutorId: 'TUT001',
    subjectId: 'CO3001',
    subject: 'Công nghệ phần mềm',
    date: '2025-11-22',
    time: '13:00 - 14:30',
    status: 'Completed'
  },
  {
    id: 'SES014',
    studentId: '2569004',
    tutorId: 'TUT001',
    subjectId: 'CO3001',
    subject: 'Công nghệ phần mềm',
    date: '2025-12-01',
    time: '15:00 - 16:30',
    status: 'Completed'
  }
];

// Mock login activities
export const MOCK_LOGIN_ACTIVITIES= [
  {
    id: 'LA001',
    timestamp: new Date('2025-11-26T08:30:00Z'),
    ipAddress: '171.244.32.15',
    device: 'Chrome 120.0 on Windows 11',
    location: 'Ho Chi Minh City, Vietnam',
    status: 'success'
  },
  {
    id: 'LA002',
    timestamp: new Date('2025-11-25T14:15:00Z'),
    ipAddress: '171.244.32.15',
    device: 'Chrome 120.0 on Windows 11',
    location: 'Ho Chi Minh City, Vietnam',
    status: 'success'
  },
  {
    id: 'LA003',
    timestamp: new Date('2025-11-24T09:45:00Z'),
    ipAddress: '103.56.158.42',
    device: 'Safari 17.0 on macOS',
    location: 'Hanoi, Vietnam',
    status: 'success'
  },
  {
    id: 'LA004',
    timestamp: new Date('2025-11-22T16:20:00Z'),
    ipAddress: '171.244.32.15',
    device: 'Firefox 121.0 on Windows 11',
    location: 'Ho Chi Minh City, Vietnam',
    status: 'success'
  },
  {
    id: 'LA005',
    timestamp: new Date('2025-11-20T11:05:00Z'),
    ipAddress: '42.118.223.10',
    device: 'Chrome Mobile 120.0 on Android',
    location: 'Da Nang, Vietnam',
    status: 'success'
  },
  {
    id: 'LA006',
    timestamp: new Date('2025-11-18T13:30:00Z'),
    ipAddress: '171.244.32.15',
    device: 'Chrome 120.0 on Windows 11',
    location: 'Ho Chi Minh City, Vietnam',
    status: 'success'
  },
  {
    id: 'LA007',
    timestamp: new Date('2025-11-15T10:10:00Z'),
    ipAddress: '14.241.122.88',
    device: 'Edge 120.0 on Windows 11',
    location: 'Ho Chi Minh City, Vietnam',
    status: 'success'
  }
];

// Mock reports
export const MOCK_REPORTS= [
  {
    id: 'REP001',
    title: 'November Attendance Summary',
    type: 'attendance',
    date: new Date('2025-11-25'),
    status: 'available'
  },
  {
    id: 'REP002',
    title: 'Software Engineering Performance Report',
    type: 'performance',
    date: new Date('2025-11-20'),
    status: 'available',
    sessionId: 'SES004'
  },
  {
    id: 'REP003',
    title: 'Database Systems Feedback Analysis',
    type: 'feedback',
    date: new Date('2025-11-18'),
    status: 'available',
    sessionId: 'SES005'
  },
  {
    id: 'REP004',
    title: 'Q4 2025 Performance Review',
    type: 'performance',
    date: new Date('2025-11-15'),
    status: 'pending'
  },
  {
    id: 'REP005',
    title: 'Advanced Programming Progress Report',
    type: 'performance',
    date: new Date('2025-11-12'),
    status: 'available',
    sessionId: 'SES008'
  },
  {
    id: 'REP006',
    title: 'Mid-Semester Attendance Report',
    type: 'attendance',
    date: new Date('2025-10-30'),
    status: 'archived'
  }
];

// Mock feedback data
export const MOCK_FEEDBACK= [
  {
    id: 'FB001',
    sessionId: 'SES004',
    studentId: '2569004',
    rating: 5,
    ratingOverall: 5,
    ratingTutor: 5,
    ratingContent: 4,
    comments: 'Excellent session! Very clear explanations.',
    createdAt: '2025-11-20T10:30:00Z'
  },
  {
    id: 'FB002',
    sessionId: 'SES005',
    studentId: '2569004',
    rating: 4,
    ratingOverall: 4,
    ratingTutor: 5,
    ratingContent: 4,
    comments: 'Great tutor, helpful content.',
    createdAt: '2025-11-18T15:00:00Z'
  },
  {
    id: 'FB003',
    sessionId: 'SES008',
    studentId: '2569004',
    rating: 5,
    ratingOverall: 5,
    ratingTutor: 5,
    ratingContent: 5,
    comments: 'Outstanding! Best session so far.',
    createdAt: '2025-11-12T16:00:00Z'
  },
  {
    id: 'FB004',
    sessionId: 'SES009',
    studentId: '2569004',
    rating: 4,
    ratingOverall: 4,
    ratingTutor: 4,
    ratingContent: 4,
    comments: 'Very good session, learned a lot.',
    createdAt: '2025-11-08T11:30:00Z'
  }
];

// Mock course enrollments
export const MOCK_ENROLLMENTS= [
  {
    id: 'ENR001',
    studentId: '2569004',
    courseId: 'CO3001',
    enrolledAt: '2025-09-01T00:00:00Z',
    status: 'active'
  },
  {
    id: 'ENR002',
    studentId: '2569004',
    courseId: 'CO2013',
    enrolledAt: '2025-09-01T00:00:00Z',
    status: 'active'
  },
  {
    id: 'ENR003',
    studentId: '2569004',
    courseId: 'CO2039',
    enrolledAt: '2025-09-01T00:00:00Z',
    status: 'active'
  }
];

// Mock course syllabi
export const MOCK_SYLLABI= [
  {
    id: 'SYL001',
    courseId: 'CO3001',
    courseObjectives: [
      'Understand software development life cycle and methodologies',
      'Apply design patterns and SOLID principles',
      'Master version control and collaboration tools',
      'Develop team-based software projects',
      'Write clean, maintainable, and testable code'
    ],
    courseDescription: 'Comprehensive introduction to software engineering principles, methodologies, and best practices. Covers the entire software development lifecycle from requirements gathering to deployment and maintenance.',
    prerequisites: ['CO2039'],
    topics: [
      {
        week: 1,
        title: 'Introduction to Software Engineering',
        description: 'Overview of SDLC, software development models, and software engineering principles',
        learningOutcomes: ['Define software engineering', 'Compare development models', 'Understand software quality attributes']
      },
      {
        week: 2,
        title: 'Requirements Engineering',
        description: 'Gathering, documenting, and managing software requirements',
        learningOutcomes: ['Write user stories', 'Create use case diagrams', 'Perform requirements elicitation']
      },
      {
        week: 3,
        title: 'Software Design Principles',
        description: 'SOLID principles, design patterns, and architectural styles',
        learningOutcomes: ['Apply SOLID principles', 'Identify common design patterns', 'Design class diagrams']
      },
      {
        week: 4,
        title: 'Version Control with Git',
        description: 'Git fundamentals, branching strategies, and collaboration workflows',
        learningOutcomes: ['Use Git commands', 'Manage branches', 'Resolve merge conflicts']
      },
      {
        week: 5,
        title: 'Agile Methodologies',
        description: 'Scrum, Kanban, and agile practices',
        learningOutcomes: ['Understand Scrum framework', 'Plan sprints', 'Conduct stand-ups and retrospectives']
      }
    ],
    gradingScheme: [
      { component: 'Attendance & Participation', weight: 10, description: 'Class attendance and active participation' },
      { component: 'Assignments', weight: 20, description: 'Individual coding assignments' },
      { component: 'Midterm Exam', weight: 25, description: 'Written exam covering weeks 1-7' },
      { component: 'Final Project', weight: 25, description: 'Team-based software development project' },
      { component: 'Final Exam', weight: 20, description: 'Comprehensive written exam' }
    ],
    textbooks: [
      {
        title: 'Software Engineering: A Practitioner\'s Approach',
        author: 'Roger S. Pressman',
        edition: '9th Edition',
        isbn: '978-0078022128',
        required: true
      },
      {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        edition: '1st Edition',
        isbn: '978-0132350884',
        required: false
      }
    ],
    references: [
      'Design Patterns: Elements of Reusable Object-Oriented Software by Gang of Four',
      'The Pragmatic Programmer by Andrew Hunt and David Thomas'
    ],
    syllabusDocuments: [
      {
        id: 'SYLDOC001',
        fileName: 'CO3001-Syllabus-Fall2025.pdf',
        fileUrl: '#',
        uploadedAt: '2025-08-15T00:00:00Z',
        fileSize: 245600
      }
    ],
    lastUpdated: '2025-08-15T00:00:00Z',
    academicYear: '2025-2026'
  }
];

// Mock teaching plans
export const MOCK_TEACHING_PLANS= [
  {
    id: 'TP001',
    courseId: 'CO3001',
    semester: 'Fall 2025',
    sessions: [
      {
        sessionNumber: 1,
        week: 1,
        date: '2025-09-02',
        topic: 'Course Introduction & SDLC Overview',
        activities: ['Lecture', 'Discussion'],
        materials: ['Slides Chapter 1', 'Course Syllabus'],
        status: 'completed'
      },
      {
        sessionNumber: 2,
        week: 2,
        date: '2025-09-09',
        topic: 'Requirements Engineering',
        activities: ['Lecture', 'Lab: Requirements Workshop'],
        materials: ['Slides Chapter 2', 'Lab Handout'],
        assignments: ['Assignment 1: User Stories'],
        status: 'completed'
      },
      {
        sessionNumber: 3,
        week: 3,
        date: '2025-09-16',
        topic: 'Software Design Principles',
        activities: ['Lecture', 'Code Review Exercise'],
        materials: ['Slides Chapter 3', 'Code Examples'],
        status: 'completed'
      },
      {
        sessionNumber: 4,
        week: 4,
        date: '2025-09-23',
        topic: 'Version Control with Git',
        activities: ['Lecture', 'Hands-on Git Lab'],
        materials: ['Git Tutorial', 'Lab Repository'],
        assignments: ['Assignment 2: Git Workflow'],
        status: 'scheduled'
      },
      {
        sessionNumber: 5,
        week: 5,
        date: '2025-09-30',
        topic: 'Agile Methodologies',
        activities: ['Lecture', 'Scrum Simulation'],
        materials: ['Slides Chapter 5', 'Scrum Guide'],
        status: 'scheduled'
      }
    ],
    planDocuments: [
      {
        id: 'PLANDOC001',
        fileName: 'CO3001-Teaching-Plan-Fall2025.pdf',
        fileUrl: '#',
        uploadedAt: '2025-08-20T00:00:00Z',
        fileSize: 189400
      }
    ],
    lastUpdated: '2025-11-01T00:00:00Z'
  }
];

// Sessions Storage Key
const SESSIONS_KEY = 'sessions';

// Get all sessions from localStorage or MOCK_SESSIONS
export const getAllSessions = () => {
  const stored = localStorage.getItem(SESSIONS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with mock data
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(MOCK_SESSIONS));
  return MOCK_SESSIONS;
};

// Book a new session
export const bookSession = async (sessionData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const sessions = getAllSessions();
  
  // Generate new session ID
  const newId = `SES${String(sessions.length + 1).padStart(3, '0')}`;
  
  const newSession = {
    id: newId,
    studentId: sessionData.studentId,
    tutorId: sessionData.tutorId,
    subjectId: sessionData.subjectId,
    subject: sessionData.subject,
    date: sessionData.date,
    time: sessionData.time,
    status: 'Scheduled'
  };
  
  sessions.push(newSession);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  
  return newSession;
};

export const cancelSession = async (sessionId, reason) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const sessions = getAllSessions();
  const sessionIndex = sessions.findIndex(session => session.id === sessionId);

  if (sessionIndex === -1) {
    throw new Error('Session not found');
  }

  if (sessions[sessionIndex].status !== 'Scheduled') {
    throw new Error('Only scheduled sessions can be cancelled');
  }

  sessions[sessionIndex] = {
    ...sessions[sessionIndex],
    status: 'Cancelled',
    cancelReason: reason
  };
  
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));

  return sessions[sessionIndex];
};
export const MOCK_SUBJECTS= [
  { id: 'CO3001', code: 'CO3001', name: 'Công nghệ phần mềm' },
  { id: 'CO2013', code: 'CO2013', name: 'Hệ cơ sở dữ liệu' },
  { id: 'CO2039', code: 'CO2039', name: 'Lập trình nâng cao' },
];

const generateSlots = () => [
  { id: '1', startTime: '08:00', endTime: '10:00', period: 'Morning', isBooked: false },
  { id: '2', startTime: '10:00', endTime: '12:00', period: 'Morning', isBooked: true }, // Already booked
  { id: '3', startTime: '13:00', endTime: '15:00', period: 'Afternoon', isBooked: false },
];

export const MOCK_TUTORS= [
  {
    id: 'TP1',
    userId: 'TUT001', // Vinh Nguyen
    user: MOCK_USERS.find(u => u.id === 'TUT001'),
    subjects: ['CO3001', 'CO2013'],
    availability: {
      '2025-12-05': generateSlots(),
      '2025-12-06': generateSlots(),
      '2025-12-07': generateSlots(),
      '2025-12-08': generateSlots(),
      '2025-12-09': generateSlots(),
      '2025-12-10': generateSlots(),
      '2025-12-11': generateSlots(),
      '2025-12-12': generateSlots(),
      '2025-12-13': generateSlots(),
      '2025-12-14': generateSlots(),
      '2025-12-15': generateSlots(),
      '2025-12-16': generateSlots(),
      '2025-12-17': generateSlots(),
      '2025-12-18': generateSlots(),
    }
  },
  {
    id: 'TP2',
    userId: 'TUT002', // Lisa Lee
    user: MOCK_USERS.find(u => u.id === 'TUT002'),
    subjects: ['CO3001', 'CO2039'],
    availability: {
      '2025-12-05': generateSlots(),
      '2025-12-06': generateSlots(),
      '2025-12-07': generateSlots(),
      '2025-12-08': generateSlots(),
      '2025-12-09': generateSlots(),
      '2025-12-10': generateSlots(),
      '2025-12-11': generateSlots(),
      '2025-12-12': generateSlots(),
      '2025-12-13': generateSlots(),
      '2025-12-14': generateSlots(),
    }
  }
];

// Storage Keys
const COURSE_MATERIALS_KEY = 'courseMaterials';
const COURSES_KEY = 'courses';
const TUTOR_AVAILABILITY_KEY = 'tutorAvailability';
const LOGIN_ACTIVITIES_KEY = 'loginActivities';

// Initialize mock courses
const initializeCourses = () => {
  const stored = localStorage.getItem(COURSES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const courses= [
    {
      id: 'CO3001',
      code: 'CO3001',
      name: 'Công nghệ phần mềm',
      tutorId: 'TUT001',
      description: 'Giới thiệu về nguyên lý và thực hành công nghệ phần mềm',
      credits: 4,
      semester: 'Fall 2025',
      enrolledStudents: ['2569004'],
      category: 'Công nghệ phần mềm'
    },
    {
      id: 'CO2013',
      code: 'CO2013',
      name: 'Hệ cơ sở dữ liệu',
      tutorId: 'TUT002',
      description: 'Cơ bản về thiết kế và quản lý cơ sở dữ liệu',
      credits: 3,
      semester: 'Fall 2025',
      enrolledStudents: ['2569004'],
      category: 'Cơ sở dữ liệu'
    },
    {
      id: 'CO2039',
      code: 'CO2039',
      name: 'Lập trình nâng cao',
      tutorId: 'TUT003',
      description: 'Các khái niệm và kỹ thuật lập trình nâng cao',
      credits: 3,
      semester: 'Fall 2025',
      enrolledStudents: ['2569004'],
      category: 'Lập trình'
    }
  ];

  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  return courses;
};

// Helper function to create dummy file data for mock materials
const createDummyFileData = (fileName, fileType) => {
  // Create a simple text content based on file type
  let content = `Mock file: ${fileName}\n\nThis is a demonstration file for the HCMUT Course Management System.\n\n`;
  
  if (fileType.includes('pdf')) {
    content += 'This would be a PDF document containing course materials, syllabus, or lecture notes.';
  } else if (fileType.includes('presentation') || fileType.includes('powerpoint')) {
    content += 'This would be a PowerPoint presentation with lecture slides.';
  } else if (fileType.includes('word') || fileType.includes('document')) {
    content += 'This would be a Word document with course information.';
  }
  
  // Create a blob and convert to data URL
  const blob = new Blob([content], { type: 'text/plain' });
  return URL.createObjectURL(blob);
};

// Initialize mock course materials
const initializeCourseMaterials = () => {
  const stored = localStorage.getItem(COURSE_MATERIALS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const materials= [
    {
      id: 'MAT001',
      courseId: 'CO3001',
      fileName: 'Software-Engineering-Syllabus.pdf',
      fileSize: 245600,
      fileType: 'application/pdf',
      uploadedBy: 'TUT001',
      uploadedAt: '2025-11-20T10:00:00Z',
      downloadUrl: '#',
      fileData: createDummyFileData('Software-Engineering-Syllabus.pdf', 'application/pdf')
    },
    {
      id: 'MAT002',
      courseId: 'CO3001',
      fileName: 'Week1-Introduction.pptx',
      fileSize: 1024000,
      fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      uploadedBy: 'TUT001',
      uploadedAt: '2025-11-21T14:30:00Z',
      downloadUrl: '#',
      fileData: createDummyFileData('Week1-Introduction.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
    },
    {
      id: 'MAT003',
      courseId: 'CO2013',
      fileName: 'Database-Fundamentals.pdf',
      fileSize: 512000,
      fileType: 'application/pdf',
      uploadedBy: 'TUT002',
      uploadedAt: '2025-11-22T09:15:00Z',
      downloadUrl: '#',
      fileData: createDummyFileData('Database-Fundamentals.pdf', 'application/pdf')
    }
  ];

  localStorage.setItem(COURSE_MATERIALS_KEY, JSON.stringify(materials));
  return materials;
};

export const MOCK_COURSES = initializeCourses();

// Get course by ID
export const getCourseById = (courseId) => {
  const courses = initializeCourses();
  return courses.find(course => course.id === courseId);
};

// Get materials by course ID
export const getMaterialsByCourseId = (courseId) => {
  const materials = initializeCourseMaterials();
  
  // Filter by courseId and ensure fileData exists for mock materials
  return materials
    .filter(material => material.courseId === courseId)
    .map(material => {
      // If fileData is missing or empty, regenerate it for mock materials
      if (!material.fileData || material.fileData === '') {
        return {
          ...material,
          fileData: createDummyFileData(material.fileName, material.fileType)
        };
      }
      return material;
    });
};

// Upload material
export const uploadMaterial = async (
  courseId,
  file,
  uploadedBy) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const materials = initializeCourseMaterials();
      const newMaterial= {
        id: `MAT${Date.now()}`,
        courseId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedBy,
        uploadedAt: new Date().toISOString(),
        downloadUrl: '#',
        fileData: reader.result
      };

      materials.push(newMaterial);
      localStorage.setItem(COURSE_MATERIALS_KEY, JSON.stringify(materials));
      resolve(newMaterial);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

// Delete material
export const deleteMaterial = async (materialId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const materials = initializeCourseMaterials();
  const filteredMaterials = materials.filter(m => m.id !== materialId);

  if (materials.length === filteredMaterials.length) {
    throw new Error('Material not found');
  }

  localStorage.setItem(COURSE_MATERIALS_KEY, JSON.stringify(filteredMaterials));
};

// Tutor Availability Functions
// Get tutor availability from localStorage ONLY (no fallback to mock data)
export const getTutorAvailability = (userId) => {
  const stored = localStorage.getItem(TUTOR_AVAILABILITY_KEY);
  
  if (!stored) {
    return {}; // Return empty if nothing stored
  }
  
  const availabilityData = JSON.parse(stored);
  
  // Return stored availability for this user, or empty object
  return availabilityData[userId] || {};
};

// Save tutor availability to localStorage
export const saveTutorAvailability = async (userId, availability) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const stored = localStorage.getItem(TUTOR_AVAILABILITY_KEY);
  let availabilityData = stored ? JSON.parse(stored) : {};
  
  // Update availability for this user
  availabilityData[userId] = availability;
  
  // Save to localStorage
  localStorage.setItem(TUTOR_AVAILABILITY_KEY, JSON.stringify(availabilityData));
  
  return true;
};

// Feedback Storage Functions
const FEEDBACK_STORAGE_KEY = 'tutoring_feedbacks';

// Initialize feedback storage
const initializeFeedbackStorage = () => {
  const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify([]));
    return [];
  }
  return JSON.parse(stored);
};

// Get all feedbacks
const getFeedbacks = () => {
  return initializeFeedbackStorage();
};

// Get feedback by session ID
export const getFeedbackBySessionId = (sessionId) => {
  const feedbacks = getFeedbacks();
  return feedbacks.find(f => f.sessionId === sessionId) || null;
};

// Create new feedback
export const createFeedback = async (request) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if feedback already exists for this session
  const existingFeedback = getFeedbackBySessionId(request.sessionId);
  if (existingFeedback) {
    throw new Error('Feedback already submitted for this session');
  }

  // Validate rating
  if (request.rating < 1 || request.rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  // Create new feedback
  const newFeedback= {
    id: `FB${Date.now()}`,
    sessionId: request.sessionId,
    studentId: request.studentId,
    tutorId: request.tutorId,
    rating: request.rating,
    ratingOverall: request.rating,
    ratingTutor: request.rating,
    ratingContent: request.rating,
    comments: request.comments,
    createdAt: new Date().toISOString()
  };

  // Save to localStorage
  const feedbacks = getFeedbacks();
  feedbacks.push(newFeedback);
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbacks));

  return newFeedback;
};

/**
 *** Lưu login activity mới
 **/
export const saveLoginActivity = async (userId) => {
  try {
    // Get browser and OS info
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let os = 'Unknown';
    
    // Detect browser
    if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
    else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';
    
    // Detect OS
    if (userAgent.indexOf('Windows') > -1) os = 'Windows 11';
    else if (userAgent.indexOf('Mac') > -1) os = 'macOS';
    else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
    else if (userAgent.indexOf('Android') > -1) os = 'Android';
    else if (userAgent.indexOf('iOS') > -1) os = 'iOS';
    
    // Create new activity
    const newActivity = {
      id: `LA${Date.now()}`,
      userId,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1', // In real app, get from server
      device: `${browser} on ${os}`,
      location: 'Ho Chi Minh City, Vietnam', // In real app, get from IP geolocation
      status: 'success'
    };
    
    // Get existing activities
    const stored = localStorage.getItem(LOGIN_ACTIVITIES_KEY);
    let activities = stored ? JSON.parse(stored) : {};
    
    // Initialize user's activities if not exists
    if (!activities[userId]) {
      activities[userId] = [];
    }
    
    // Add new activity at the beginning
    activities[userId].unshift(newActivity);
    
    // Keep only last 10 activities per user
    activities[userId] = activities[userId].slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem(LOGIN_ACTIVITIES_KEY, JSON.stringify(activities));
    
    return newActivity;
  } catch (error) {
    console.error('Error saving login activity:', error);
    return null;
  }
};

/**
 *** Lấy lịch sử đăng nhập của người dùng
 **/
export const getLoginActivities = async (userId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get from localStorage
  const stored = localStorage.getItem(LOGIN_ACTIVITIES_KEY);
  
  if (stored) {
    const activities = JSON.parse(stored);
    if (activities[userId] && activities[userId].length > 0) {
      return activities[userId];
    }
  }
  
  // Return mock data for first time or if no stored data
  return MOCK_LOGIN_ACTIVITIES.slice(0, 5);
};

/**
 *** Lấy báo cáo của người dùng
 *** @param _userId - ID người dùng (hiện tại chưa sử dụng, trả về tất cả báo cáo cho demo)
 **/
export const getReports = async (_userId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return all reports (in a real app, you would filter by userId)
  return MOCK_REPORTS;
};

// Get user profile with all related data
export const getUserProfile = async (userId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get user by ID
  const user = MOCK_USERS.find(u => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Get all data in parallel using Promise.all
  const sessions = getAllSessions();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingSessions = sessions
    .filter(s => {
      const sessionDate = new Date(s.date);
      return (s.studentId === userId || s.tutorId === userId) && 
             s.status === 'Scheduled' &&
             sessionDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  const [loginActivities, reports] = await Promise.all([
    getLoginActivities(userId),
    getReports(userId)
  ]);
  
  const recentSessions = upcomingSessions;
  
  return {
    user,
    recentSessions,
    loginActivities,
    reports
  };
};

// Get user's courses based on role
export const getUserCourses = async (userId, userRole) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allCourses = initializeCourses();
  
  if (userRole === 'Student') {
    const enrollments = MOCK_ENROLLMENTS.filter(e => e.studentId === userId && e.status === 'active');
    return allCourses.filter(c => enrollments.some(e => e.courseId === c.id));
  } else if (userRole === 'Tutor') {
    return allCourses.filter(c => c.tutorId === userId);
  } else {
    return allCourses;
  }
};

// Get syllabus by course ID
export const getSyllabusByCourseId = async (courseId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_SYLLABI.find(s => s.courseId === courseId) || null;
};

// Get teaching plan by course ID
export const getTeachingPlanByCourseId = async (courseId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_TEACHING_PLANS.find(p => p.courseId === courseId) || null;
};

// Submit course feedback
export const submitCourseFeedback = async (
  courseId,
  studentId,
  rating,
  comments) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newFeedback = {
    id: `CF${Date.now()}`,
    courseId,
    studentId,
    rating,
    comments,
    createdAt: new Date().toISOString()
  };
  
  const feedbacks = JSON.parse(localStorage.getItem('courseFeedbacks') || '[]');
  feedbacks.push(newFeedback);
  localStorage.setItem('courseFeedbacks', JSON.stringify(feedbacks));
};

// Get course feedback (for tutors)
export const getCourseFeedback = async (courseId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const feedbacks = JSON.parse(localStorage.getItem('courseFeedbacks') || '[]');
  return feedbacks.filter((f) => f.courseId === courseId);
};


