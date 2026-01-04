export type CourseType = 'core' | 'elective' | 'gen-ed';

export interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
    type: CourseType;
    prerequisites?: string[]; // Array of course codes
    corequisites?: string[];
    description?: string;
    tags?: string[]; // e.g., 'AI', 'Systems', 'Theory'
}

export interface StudentProfile {
    name: string;
    major: string;
    totalCreditsRequired: number;
    completedCredits: number;
    preferredCourses: string[]; // List of specific courses user wants to take
    interests: string[]; // e.g., 'Artificial Intelligence', 'Web Development'
    maxCreditsPerSemester: number;
}

export interface Semester {
    id: number;
    year: number;
    term: 'Fall' | 'Spring' | 'Summer';
    courses: Course[];
    totalCredits: number;
}

export interface DegreePlan {
    semesters: Semester[];
}
