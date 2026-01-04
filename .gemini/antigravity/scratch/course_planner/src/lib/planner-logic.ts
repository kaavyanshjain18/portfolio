import { Course, DegreePlan, Semester, StudentProfile } from "@/types";
import { COURSES } from "@/data/courses";

export function generateDegreePlan(profile: StudentProfile): DegreePlan {
    const allCourses = [...COURSES];

    // Identify Preferred Courses
    const preferredSet = new Set(
        profile.preferredCourses.map(c => c.toUpperCase().trim())
    );

    // 1. Identify Target Electives based on Interests AND Preferences
    const interestSet = new Set(
        profile.interests.map(i => i.toLowerCase().trim())
    );

    let electives = allCourses.filter(c => c.type === 'elective');
    let coreCourses = allCourses.filter(c => c.type === 'core' || c.type === 'gen-ed');

    // Sort electives: High priority to PREFERRED, then INTERESTS
    electives.sort((a, b) => {
        // 1. Check Preference Match (Highest Priority)
        const aPref = preferredSet.has(a.code.toUpperCase()) ? 1 : 0;
        const bPref = preferredSet.has(b.code.toUpperCase()) ? 1 : 0;
        if (aPref !== bPref) return bPref - aPref;

        // 2. Check Interest Match (Secondary)
        const aMatch = a.tags?.filter(t => interestSet.has(t.toLowerCase())).length || 0;
        const bMatch = b.tags?.filter(t => interestSet.has(t.toLowerCase())).length || 0;
        return bMatch - aMatch;
    });

    // Pick top electives (e.g., top 6)
    // If a user explicitly prefers an elective, it will be at the top now.
    const targetElectives = electives.slice(0, 6);

    // Combine courses
    let coursesToPlan = [...coreCourses, ...targetElectives];

    // 3. Topological Sort / Dependency Resolution
    const semesters: Semester[] = [];
    let currentYear = 1;
    let currentTerm: 'Fall' | 'Spring' = 'Fall';
    let termCount = 1;
    // Set of "completed" courses for prerequisite checking (starts empty as we removed previous completed logic)
    const completedPrereqs = new Set<string>();

    while (coursesToPlan.length > 0 && semesters.length < 10) {
        const semesterCourses: Course[] = [];
        let semesterCredits = 0;

        // Find available courses (prereqs met)
        const available = coursesToPlan.filter(course => {
            if (!course.prerequisites || course.prerequisites.length === 0) return true;

            // Check if all prereqs are in completedPrereqs (which accumulates as we plan)
            return course.prerequisites.every(prereqCode => {
                return completedPrereqs.has(prereqCode.toUpperCase());
            });
        });

        // Sort: PRIORITIZE PREFERRED COURSES even within available slot
        available.sort((a, b) => {
            const aPref = preferredSet.has(a.code.toUpperCase()) ? 1 : 0;
            const bPref = preferredSet.has(b.code.toUpperCase()) ? 1 : 0;
            if (aPref !== bPref) return bPref - aPref;

            // Then Core priority
            if (a.type === 'core' && b.type !== 'core') return -1;
            if (a.type !== 'core' && b.type === 'core') return 1;
            return 0;
        });

        // Fill semester
        for (const course of available) {
            if (semesterCredits + course.credits <= profile.maxCreditsPerSemester) {
                semesterCourses.push(course);
                semesterCredits += course.credits;
            }
        }

        // Remove planned courses from coursesToPlan & Add to completedPrereqs
        for (const planned of semesterCourses) {
            completedPrereqs.add(planned.code.toUpperCase());
        }
        coursesToPlan = coursesToPlan.filter(c => !semesterCourses.some(planned => planned.code === c.code));

        // Add to semester list
        semesters.push({
            id: termCount,
            year: currentYear,
            term: currentTerm,
            courses: semesterCourses,
            totalCredits: semesterCredits
        });

        // Advance time
        if (currentTerm === 'Fall') {
            currentTerm = 'Spring';
        } else {
            currentTerm = 'Fall';
            currentYear++;
        }
        termCount++;

        if (semesterCourses.length === 0 && coursesToPlan.length > 0) {
            console.warn("Scheduling stuck. Remaining:", coursesToPlan.map(c => c.code));
            break;
        }
    }

    return { semesters };
}
