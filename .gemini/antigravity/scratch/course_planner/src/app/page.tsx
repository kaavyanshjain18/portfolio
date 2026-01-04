"use client"

import * as React from "react"
import { StudentInputForm } from "@/components/planner/StudentInputForm"
import { SemesterView } from "@/components/planner/SemesterView"
import { generateDegreePlan } from "@/lib/planner-logic"
import { DegreePlan, StudentProfile } from "@/types"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [plan, setPlan] = React.useState<DegreePlan | null>(null)

  const handleFormSubmit = (profile: StudentProfile) => {
    // Artificial delay for "processing" feel
    setTimeout(() => {
      const generatedPlan = generateDegreePlan(profile);
      setPlan(generatedPlan);
    }, 800);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">


        <AnimatePresence mode="wait">
          {!plan ? (
            <motion.div
              key="intro"
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              className="w-full"
            >
              <div className="text-center mb-10 space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  Smart Degree Planning <br />
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    Expertly Curated.
                  </span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Enter your major and interests to generate a hand-crafted, semester-by-semester course roadmap tailored just for you.
                </p>
              </div>
              <StudentInputForm onSubmit={handleFormSubmit} />
            </motion.div>
          ) : (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="w-full mt-20"
            >
              <SemesterView plan={plan} onReset={() => setPlan(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
