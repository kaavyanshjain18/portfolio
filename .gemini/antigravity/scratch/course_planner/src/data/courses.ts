import { Course } from "@/types";

export const COURSES: Course[] = [
    // Freshman Year
    {
        id: 'cs101',
        code: 'CS101',
        name: 'Intro to Computer Science',
        credits: 4,
        type: 'core',
        tags: ['Programming'],
        description: "An introduction to the fundamental concepts of computer science and the art of programming.",
        syllabus: [
            "Introduction to Algorithms and Flowcharts",
            "Basics of C++/Python Syntax",
            "Control Structures: Loops and Conditionals",
            "Functions and Modular Programming",
            "Arrays and Strings",
            "Pointers and Memory Management Basics"
        ]
    },
    {
        id: 'math101',
        code: 'MATH101',
        name: 'Calculus I',
        credits: 4,
        type: 'core',
        tags: ['Math'],
        description: "The study of change, limits, derivatives, and integrals.",
        syllabus: [
            "Limits and Continuity",
            "The Derivative as a Rate of Change",
            "Differentiation Rules (Power, Product, Quotient)",
            "Applications of Derivatives (Optimization)",
            "Integrals and Area under Curves",
            "Fundamental Theorem of Calculus"
        ]
    },
    { id: 'eng101', code: 'ENG101', name: 'College Writing', credits: 3, type: 'gen-ed', description: "Foundational academic writing and research skills." },
    { id: 'phy101', code: 'PHY101', name: 'Physics I', credits: 4, type: 'core', tags: ['Science'], description: "Classical mechanics and thermodynamics." },

    // Freshman Spring
    {
        id: 'cs102',
        code: 'CS102',
        name: 'Data Structures',
        credits: 4,
        type: 'core',
        prerequisites: ['CS101'],
        tags: ['Programming'],
        description: "Organization and manipulation of data using standard structures.",
        syllabus: [
            "Time and Space Complexity Analysis (Big O)",
            "Arrays and Linked Lists",
            "Stacks and Queues",
            "Trees (Binary Trees, BST, AVL)",
            "Graphs and Traversals (BFS, DFS)",
            "Hashing and Hash Tables"
        ]
    },
    { id: 'math102', code: 'MATH102', name: 'Calculus II', credits: 4, type: 'core', prerequisites: ['MATH101'], tags: ['Math'], description: "Integration techniques and sequences/series." },

    // Sophomore Fall
    {
        id: 'cs201',
        code: 'CS201',
        name: 'Algorithms',
        credits: 4,
        type: 'core',
        prerequisites: ['CS102', 'MATH102'],
        tags: ['Theory'],
        description: "Design and analysis of efficient algorithms.",
        syllabus: [
            "Divide and Conquer Strategies",
            "Dynamic Programming",
            "Greedy Algorithms",
            "Graph Algorithms (Dijkstra, Prim, Kruskal)",
            "NP-Completeness and Reductions",
            "Approximation Algorithms"
        ]
    },
    // KEY REQUEST: Detailed Computer Org
    {
        id: 'cs202',
        code: 'CS202',
        name: 'Computer Organization & Architecture',
        credits: 4,
        type: 'core',
        prerequisites: ['CS101'],
        tags: ['Systems'],
        description: "A comprehensive study of the internal working of computer systems, from logic gates to processor design.",
        syllabus: [
            "Digital Logic Design: Gates, Boolean Algebra",
            "Combinational and Sequential Circuits",
            "Instruction Set Architecture (ISA) - MIPS/RISC-V",
            "CPU Datapath and Control Unit Design",
            "Pipelining and Hazards",
            "Memory Hierarchy: Cache, Main Memory, Virtual Memory",
            "I/O Systems and Interrupts",
            "Multicore Processors and Parallelism"
        ]
    },

    // Sophomore Spring
    { id: 'cs203', code: 'CS203', name: 'Operating Systems', credits: 4, type: 'core', prerequisites: ['CS202', 'CS102'], tags: ['Systems'], description: "Management of system resources by the OS.", syllabus: ["Processes and Threads", "Scheduling Algorithms", "Synchronization and Deadlocks", "Memory Management (Paging)", "File Systems"] },
    { id: 'cs204', code: 'CS204', name: 'Software Engineering', credits: 3, type: 'core', prerequisites: ['CS102'], tags: ['Software'], description: "Principles of software development lifecycles." },

    // Electives (Junior/Senior)
    { id: 'cs301', code: 'CS301', name: 'Artificial Intelligence', credits: 3, type: 'elective', prerequisites: ['CS201'], tags: ['AI', 'Data'], description: "Foundations of intelligent agents and problem solving." },
    { id: 'cs302', code: 'CS302', name: 'Machine Learning', credits: 3, type: 'elective', prerequisites: ['CS201', 'MATH102'], tags: ['AI', 'Data'], description: "Algorithms that learn from data." },
    { id: 'cs303', code: 'CS303', name: 'Database Systems', credits: 3, type: 'elective', prerequisites: ['CS102'], tags: ['Data'], description: "Relational database design and SQL." },
    { id: 'cs304', code: 'CS304', name: 'Web Development', credits: 3, type: 'elective', prerequisites: ['CS102'], tags: ['Web'], description: "Full-stack web application development." },
    { id: 'cs305', code: 'CS305', name: 'Computer Networks', credits: 3, type: 'elective', prerequisites: ['CS203'], tags: ['Systems'], description: "Protocols and architecture of the internet." },
    { id: 'cs306', code: 'CS306', name: 'Cyber Security', credits: 3, type: 'elective', prerequisites: ['CS203'], tags: ['Security'], description: "Protecting systems from attacks." },
    { id: 'cs401', code: 'CS401', name: 'Deep Learning', credits: 3, type: 'elective', prerequisites: ['CS302'], tags: ['AI'], description: "Neural networks and deep architectures." },
    { id: 'cs402', code: 'CS402', name: 'Cloud Computing', credits: 3, type: 'elective', prerequisites: ['CS305'], tags: ['Systems', 'Web'], description: "Distributed computing and cloud services." },
];
