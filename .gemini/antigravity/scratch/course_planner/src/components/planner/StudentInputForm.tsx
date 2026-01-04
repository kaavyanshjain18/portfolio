"use client"

import * as React from "react"
import { Button, Input, Card } from "@/components/ui"
import { StudentProfile } from "@/types"
import { motion } from "framer-motion"
import { Book, GraduationCap, Sparkles, User, ArrowRight, Loader2 } from "lucide-react"

interface StudentInputFormProps {
    onSubmit: (profile: StudentProfile) => void;
}

export function StudentInputForm({ onSubmit }: StudentInputFormProps) {
    const [name, setName] = React.useState("")
    const [major, setMajor] = React.useState("Computer Science")
    const [interests, setInterests] = React.useState("")
    const [completed, setCompleted] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate thinking time for effect
        setTimeout(() => {
            const profile: StudentProfile = {
                name,
                major,
                interests: interests.split(',').map(s => s.trim()).filter(Boolean),
                preferredCourses: completed.split(',').map(s => s.trim().toUpperCase()).filter(Boolean),
                completedCredits: 0,
                totalCreditsRequired: 120,
                maxCreditsPerSemester: 18
            };
            onSubmit(profile);
            setIsSubmitting(false);
        }, 1500);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-lg mx-auto"
        >
            <Card className="overflow-hidden border-0 shadow-2xl bg-slate-900/50 backdrop-blur-md ring-1 ring-white/10">
                <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-slate-800/80 rounded-3xl flex items-center justify-center mx-auto mb-6 text-cyan-400 shadow-lg shadow-cyan-900/20 ring-1 ring-white/5">
                            <GraduationCap className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                            Design Your Future
                        </h2>
                        <p className="text-slate-400 text-base">
                            Personalized degree planning. <span className="text-cyan-400">Dark Mode activated.</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" /> Name
                                    </label>
                                    <Input
                                        placeholder="Alice"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-slate-950/50 border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all h-12 text-slate-200 placeholder:text-slate-600 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <GraduationCap className="w-3.5 h-3.5" /> Major
                                    </label>
                                    <Input
                                        placeholder="CS, Math..."
                                        value={major}
                                        onChange={(e) => setMajor(e.target.value)}
                                        className="bg-slate-950/50 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-12 text-slate-200 placeholder:text-slate-600 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Interests & Career Goals
                                </label>
                                <Input
                                    placeholder="e.g. Artificial Intelligence, Web Development"
                                    value={interests}
                                    onChange={(e) => setInterests(e.target.value)}
                                    className="bg-slate-950/50 border-slate-800 focus:border-amber-500 focus:ring-amber-500/20 transition-all h-12 text-slate-200 placeholder:text-slate-600 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Course Interested In
                                </label>
                                <textarea
                                    placeholder="e.g. CS301, CS402 (Ai, Cloud)"
                                    value={completed}
                                    onChange={(e) => setCompleted(e.target.value)}
                                    className="flex min-h-[100px] w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm ring-offset-background placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all text-slate-200 font-medium"
                                />
                                <p className="text-[10px] text-slate-600 text-right font-bold tracking-wide uppercase">Separate codes with commas</p>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-14 text-base font-bold bg-white text-slate-950 hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-white/10 rounded-xl"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Analyzing Requirements...
                                </>
                            ) : (
                                <>
                                    Generate Roadmap <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </Card>
        </motion.div>
    )
}
