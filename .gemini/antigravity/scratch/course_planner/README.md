# Smart Student Course Planner

A modern, intelligent course planning application designed to help Computer Science students visualize their degree path. This project leverages a custom topological sort algorithm to generate personalized semester-by-semester roadmaps based on user interests and prerequisites.

![Project Screenshot](/dark_mode_verification_1767511211882.png)

## 🚀 Features

*   **Intelligent Scheduling**: Automatically respects course prerequisites and corequisites using a topological sort algorithm.
*   **Personalized Priorities**: Users can specify "Courses Interested In" which are heavily weighted in the scheduling logic.
*   **Dark Mode UI**: A premium, "glassmorphism" design with deep slate backgrounds and glowing accents.
*   **Dynamic Syllabus**: Detailed course breakdowns (e.g., Logic Gates, Algorithms) viewable in modal cards.
*   **Interest-Based Electives**: Automatically recommends electives based on user-defined career goals (e.g., "AI", "Web Dev").

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `clsx` and `tailwind-merge`
*   **Components**: Custom UI components built with accessibility in mind (Radix UI primitives / Shadcn-like structure)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth transitions
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🏃‍♂️ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/smart-course-planner.git
    cd smart-course-planner
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧩 Project Structure

-   `src/components/planner`: Core application components (`StudentInputForm`, `SemesterView`)
-   `src/lib/planner-logic.ts`: The core algorithm for course scheduling.
-   `src/data/courses.ts`: Mock database of courses, prerequisites, and syllabi.
-   `src/types`: TypeScript definitions for strong type safety.

## 🎨 Design Philosophy

The application features a "resume-ready" aesthetic, focusing on:
-   **Readability**: High contrast text on dark backgrounds.
-   **Interactivity**: Subtle hover states and layout animations.
-   **Professionalism**: Clean, unbranded headers and clear calls to action.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
