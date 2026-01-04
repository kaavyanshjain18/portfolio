"use client"

import * as React from "react"
import { DegreePlan, Semester } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui"
import { BookOpen, CheckCircle2, X, Info, GraduationCap, Calendar, Trophy, ListChecks, ChevronRight } from "lucide-react"

interface SemesterViewProps {
    plan: DegreePlan;
    onReset: () => void;
}

export function SemesterView({ plan, onReset }: SemesterViewProps) {
    const [selectedCourse, setSelectedCourse] = React.useState<any | null>(null)

    // Calculate stats
    const totalCredits = plan.semesters.reduce((acc, sem) => acc + sem.totalCredits, 0)
    const totalCourses = plan.semesters.reduce((acc, sem) => acc + sem.courses.length, 0)
    const electiveCount = plan.semesters.flatMap(s => s.courses).filter(c => c.type === 'elective').length
    const estYears = Math.ceil(plan.semesters.length / 2);

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800/50 pb-6">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-extrabold text-white mb-2 tracking-tight"
                    >
                        Your Roadmap
                    </motion.h2>
                    <p className="text-slate-400 text-lg">
                        Expertly Designed • Personalized • <span className="text-cyan-400">Dark Mode</span>
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={onReset}
                        className="px-6 py-2.5 text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-full transition-all shadow-sm hover:shadow-cyan-900/20"
                    >
                        Edit Inputs
                    </button>
                    <button
                        className="px-6 py-2.5 text-sm font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all shadow-lg hover:shadow-cyan-500/25 hover:scale-105 active:scale-95"
                        onClick={() => window.print()}
                    >
                        Export as PDF
                    </button>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatsCard
                    icon={<GraduationCap className="w-6 h-6 text-cyan-400" />}
                    label="Total Credits"
                    value={totalCredits}
                    delay={0.1}
                />
                <StatsCard
                    icon={<BookOpen className="w-6 h-6 text-indigo-400" />}
                    label="Total Courses"
                    value={totalCourses}
                    delay={0.2}
                />
                <StatsCard
                    icon={<Trophy className="w-6 h-6 text-amber-400" />}
                    label="Electives"
                    value={electiveCount}
                    delay={0.3}
                />
                <StatsCard
                    icon={<Calendar className="w-6 h-6 text-emerald-400" />}
                    label="Est. Duration"
                    value={`${estYears} Years`}
                    delay={0.4}
                />
            </div>

            {/* Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
                {plan.semesters.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-800">
                        <GraduationCap className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <p className="text-xl font-bold text-slate-300">All requirements completed!</p>
                        <p className="text-slate-500">You don't need any more courses based on your inputs.</p>
                    </div>
                ) : (
                    plan.semesters.map((sem, idx) => (
                        <SemesterCard
                            key={sem.id}
                            semester={sem}
                            index={idx}
                            onCourseClick={setSelectedCourse}
                        />
                    ))
                )}
            </div>

            {/* Course Details Modal */}
            <AnimatePresence>
                {selectedCourse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedCourse(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 ring-1 ring-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 relative">
                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-500 hover:text-slate-300"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-3xl font-bold text-white tracking-tight">{selectedCourse.code}</span>
                                        {selectedCourse.type === 'elective' && (
                                            <span className="px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase tracking-wide">
                                                Elective
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl text-slate-300 font-semibold leading-snug">{selectedCourse.name}</h3>
                                </div>

                                <div className="space-y-8">
                                    {/* Metadata Pills */}
                                    <div className="flex flex-wrap gap-3">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-950/50 text-blue-400 text-sm font-semibold border border-blue-500/20">
                                            <Info className="w-4 h-4" />
                                            <span>{selectedCourse.credits} Credits</span>
                                        </div>
                                        {selectedCourse.tags && selectedCourse.tags.map((t: string) => (
                                            <span key={t} className="px-4 py-2 rounded-xl bg-violet-950/50 text-violet-400 text-sm font-semibold border border-violet-500/20">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <div className="text-slate-300 leading-relaxed bg-black/20 p-6 rounded-2xl border border-white/5">
                                        <p className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">About this Course</p>
                                        <p className="text-lg">{selectedCourse.description || "This course covers fundamental concepts and advanced topics in the field, preparing students for real-world applications."}</p>
                                    </div>

                                    {/* Syllabus - EXPANDED */}
                                    {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                                                <ListChecks className="w-5 h-5 text-slate-500" />
                                                <h4 className="text-lg font-bold text-slate-200">Syllabus & Topics</h4>
                                            </div>
                                            <div className="grid gap-3">
                                                {selectedCourse.syllabus.map((topic: string, i: number) => (
                                                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800 transition-colors group">
                                                        <div className="mt-1 w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 text-xs font-bold group-hover:bg-cyan-900 group-hover:text-cyan-400 transition-colors">
                                                            {i + 1}
                                                        </div>
                                                        <span className="text-slate-300 font-medium">{topic}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Prerequisites */}
                                    {selectedCourse.prerequisites && selectedCourse.prerequisites.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Prerequisites</p>
                                            <div className="flex gap-2 flex-wrap">
                                                {selectedCourse.prerequisites.map((p: string) => (
                                                    <span key={p} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-950/30 text-amber-500 border border-amber-500/20 text-sm font-mono font-medium">
                                                        <ChevronRight className="w-3 h-3" /> {p}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-900 px-8 py-6 flex justify-end border-t border-slate-800 sticky bottom-0 rounded-b-3xl">
                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="px-8 py-3 bg-white text-slate-950 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all shadow-xl shadow-white/10 active:scale-95"
                                >
                                    Close Details
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function StatsCard({ icon, label, value, delay }: { icon: React.ReactNode, label: string, value: string | number, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-slate-700 hover:shadow-lg transition-all cursor-default"
        >
            <div className="flex items-center gap-5">
                <div className="p-4 bg-slate-950 rounded-2xl shrink-0 border border-slate-800">
                    {icon}
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
                </div>
            </div>
        </motion.div>
    )
}

function SemesterCard({ semester, index, onCourseClick }: { semester: any, index: number, onCourseClick: (c: any) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="flex flex-col h-full"
        >
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-sm hover:shadow-cyan-900/10 hover:border-slate-700 hover:translate-y-[-4px] transition-all duration-300 h-full flex flex-col group/card backdrop-blur-sm">

                {/* Card Header */}
                <div className="bg-slate-950/50 px-6 py-5 border-b border-slate-800 flex justify-between items-center">
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Semester {semester.id}</span>
                        <h3 className="text-lg font-bold text-slate-200">{semester.term} Year {semester.year}</h3>
                    </div>
                    <div className="text-center bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
                        <span className="block text-lg font-bold text-white">{semester.totalCredits}</span>
                        <span className="block text-[10px] text-slate-500 font-bold uppercase">Credits</span>
                    </div>
                </div>

                {/* Courses List */}
                <div className="p-5 space-y-3 flex-grow">
                    {semester.courses.map((course: any) => (
                        <motion.button
                            key={course.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onCourseClick(course)}
                            className="w-full text-left group flex items-start gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-950/30 hover:border-cyan-500/30 hover:bg-cyan-950/10 transition-all duration-200"
                        >
                            <div className={`mt-1 rounded-full p-2 shrink-0 ${course.type === 'core' ? 'bg-slate-900 text-slate-500' : 'bg-emerald-950/30 text-emerald-500'}`}>
                                {course.type === 'core' ? <BookOpen className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-sm text-slate-200 group-hover:text-cyan-400 transition-colors">{course.code}</span>
                                    {course.type === 'elective' && (
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full">
                                            Elective
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 font-medium truncate w-full group-hover:text-slate-400">
                                    {course.name}
                                </p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
