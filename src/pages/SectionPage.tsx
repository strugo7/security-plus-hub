// src/pages/SectionPage.tsx
// Section overview page matching "Page 3.1" UX/UI design

import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useProgress } from '../context/ProgressContext';
import { SECTIONS_DATA, type Section, type Topic } from '../data/sectionsData';

const SECTION_COLORS: Record<number, { from: string; to: string; accent: string }> = {
    1: { from: '#0da6f2', to: '#00d4ff', accent: '#0da6f2' },
    2: { from: '#f97316', to: '#fb923c', accent: '#f97316' },
    3: { from: '#22c55e', to: '#4ade80', accent: '#22c55e' },
    4: { from: '#a855f7', to: '#c084fc', accent: '#a855f7' },
    5: { from: '#ec4899', to: '#f472b6', accent: '#ec4899' },
};

export default function SectionPage() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const navigate = useNavigate();
    const { progress } = useProgress();

    const section = useMemo(
        () => SECTIONS_DATA.find((s: Section) => s.id === Number(sectionId)),
        [sectionId]
    );

    if (!section) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center h-64" style={{ color: '#8b949e' }}>
                    Section not found.
                </div>
            </AppLayout>
        );
    }

    const col = SECTION_COLORS[section.id] ?? SECTION_COLORS[1];
    const sectionProgress = progress.sections[section.id];
    const completedTopics = sectionProgress?.completedTopics ?? [];

    return (
        <AppLayout hideSidebar>
            <div className="flex flex-1 overflow-hidden h-[calc(100vh-73px)]">
                {/* ── Sidebar ── */}
                <aside className="w-72 hidden lg:flex flex-col border-r border-[#233648] bg-[#0d1117] h-full sticky top-0 overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-4 pl-3">Course Curriculum</h2>
                        <nav className="space-y-1">
                            {SECTIONS_DATA.map((s) => {
                                const isActive = s.id === section.id;
                                const isCompleted = progress.sections[s.id]?.completionPercentage === 100;

                                return (
                                    <div key={s.id} className={isActive ? 'rounded-xl bg-[#192633] overflow-hidden mb-2' : ''}>
                                        <button
                                            onClick={() => navigate(`/sections/${s.id}`)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${isActive
                                                ? 'text-white bg-primary/10 border-l-2 border-primary py-3'
                                                : 'rounded-lg text-text-secondary hover:text-white hover:bg-[#233648]'
                                                }`}
                                        >
                                            <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-primary' : 'group-hover:text-white'
                                                }`}>
                                                {isCompleted ? 'check_circle' : s.id === 2 ? 'bug_report' : s.id === 3 ? 'architecture' : s.id === 1 ? 'shield' : 'terminal'}
                                            </span>
                                            <span className="text-sm font-medium">{s.id}. {s.title.split(':')[0]}</span>
                                        </button>

                                        {isActive && (
                                            <div className="pl-10 pr-3 py-2 space-y-1">
                                                {s.topics.map((t) => (
                                                    <button
                                                        key={t.id}
                                                        onClick={() => navigate(`/sections/${s.id}/${t.id}`)}
                                                        className="block w-full text-left py-1.5 text-xs text-text-secondary hover:text-white transition-colors truncate"
                                                    >
                                                        {t.id} {t.title}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-[#233648]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-text-secondary">Course Progress</span>
                            <span className="text-xs font-bold text-white">32%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#233648] rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[32%] shadow-[0_0_8px_rgba(19,127,236,0.4)]"></div>
                        </div>
                    </div>
                </aside>

                {/* ── Main Content ── */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-full">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-primary/20 text-primary border border-primary/20 uppercase tracking-wide">
                                            Domain {section.id}.0
                                        </span>
                                        <span className="text-text-secondary text-sm font-medium flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                                            ~{(section.topics.length * 45) / 60} Hours
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                        {section.title}
                                    </h2>
                                    <p className="mt-2 text-text-secondary max-w-3xl text-lg">
                                        {section.description}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end min-w-[200px]">
                                    <div className="text-right mb-2">
                                        <span className="text-sm text-text-secondary block">Section Progress</span>
                                        <span className="text-2xl font-bold text-white">
                                            {sectionProgress?.completionPercentage ?? 0}%
                                            <span className="text-sm font-normal text-text-secondary ml-1">Complete</span>
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-[#233648] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(19,127,236,0.5)] transition-all duration-700"
                                            style={{ width: `${sectionProgress?.completionPercentage ?? 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[1px] w-full bg-[#233648]"></div>
                        </div>

                        <div className="space-y-6">
                            {section.topics.map((topic: Topic) => {
                                const isDone = completedTopics.includes(topic.id);
                                // Determine styling based on status
                                // Completed: Green
                                // In Progress (or Next): Primary
                                // Locked (or Future): Slate

                                // For now, treat "Done" as Completed (Green), "Not Done" as In Progress (Primary)
                                // If I had "started" state, I'd use Primary. Default to Primary if not done.
                                // Or use Slate if index > completedCount + 1 (Locked logic simulation)

                                const isLocked = false; // logic placeholder

                                let containerClass = "group relative bg-card-dark border border-primary/50 rounded-xl p-6 transition-all duration-300 shadow-[0_0_15px_rgba(19,127,236,0.1)] flex flex-col md:flex-row gap-6 ring-1 ring-primary/20";
                                let barColor = "bg-primary";
                                let iconColor = "text-primary";
                                let buttonClass = "w-full py-3 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-all shadow-[0_4px_14px_0_rgba(19,127,236,0.39)] hover:shadow-[0_6px_20px_rgba(19,127,236,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2";
                                let statusText = "In Progress";
                                let statusIcon = "pending";
                                let statusBg = "bg-primary/10 text-primary border-primary/20";
                                let leftStripe = "bg-primary";

                                if (isDone) {
                                    containerClass = "group relative bg-card-dark border border-[#233648] hover:border-green-500/30 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] flex flex-col md:flex-row gap-6";
                                    barColor = "bg-green-500";
                                    iconColor = "text-green-500";
                                    buttonClass = "w-full py-2.5 px-4 rounded-lg bg-[#233648] hover:bg-[#2c4257] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 group-hover:border-green-500/30 border border-transparent";
                                    statusText = "Completed";
                                    statusIcon = "check_circle";
                                    statusBg = "bg-green-500/10 text-green-500 border-green-500/20";
                                    leftStripe = "bg-green-500";
                                }

                                return (
                                    <div key={topic.id} className={containerClass}>
                                        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${leftStripe} ${!isDone ? 'shadow-[0_0_10px_rgba(19,127,236,0.6)]' : ''}`}></div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-sm font-mono ${iconColor}`}>Module {topic.id}</span>
                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold border flex items-center gap-1 ${statusBg} ${!isDone ? 'animate-pulse' : ''}`}>
                                                    <span className="material-symbols-outlined text-[14px]">{statusIcon}</span>
                                                    {statusText}
                                                </span>
                                            </div>

                                            <h3 className={`text-xl font-bold mb-2 transition-colors ${isDone ? 'text-white group-hover:text-green-400' : 'text-white'}`}>
                                                {topic.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm mb-4">
                                                {topic.description}
                                            </p>

                                            <div className="flex items-center gap-4 text-xs text-text-secondary">
                                                <span className="flex items-center gap-1 bg-[#233648] px-2 py-1 rounded text-white">
                                                    <span className="material-symbols-outlined text-[14px] text-yellow-500">signal_cellular_alt</span>
                                                    Intermediate
                                                </span>
                                                <span className="flex items-center gap-1 bg-[#233648] px-2 py-1 rounded">
                                                    <span className="material-symbols-outlined text-[14px]">play_lesson</span>
                                                    {topic.lessons?.length ?? 4} Lessons
                                                </span>
                                                <span className="flex items-center gap-1 bg-[#233648] px-2 py-1 rounded">
                                                    <span className="material-symbols-outlined text-[14px]">quiz</span>
                                                    1 Quiz
                                                </span>
                                            </div>

                                            {!isDone && (
                                                <div className="mt-4 w-full h-1.5 bg-[#233648] rounded-full overflow-hidden max-w-md">
                                                    <div className={`h-full ${barColor} rounded-full w-[0%] shadow-[0_0_8px_rgba(19,127,236,0.4)]`}></div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col justify-center items-end md:w-48 shrink-0 border-t md:border-t-0 md:border-l border-[#233648] pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
                                            <button
                                                onClick={() => navigate(`/sections/${section.id}/${topic.id}`)}
                                                className={buttonClass}
                                            >
                                                <span>{isDone ? 'Review Module' : 'Continue'}</span>
                                                <span className="material-symbols-outlined text-sm">{isDone ? 'history' : 'arrow_forward'}</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
