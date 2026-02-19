import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    BrainCircuit,
    ShieldAlert,
    Library,
    Dumbbell,
    Settings
} from 'lucide-react';
import { routes } from '../../constants/routes';

interface SidebarProps {
    isOpen: boolean;
    closeMobileWrapper: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeMobileWrapper }) => {
    const baseClasses = "fixed md:sticky top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-slate-900 border-l border-slate-800 overflow-y-auto transition-transform duration-300 z-40";
    const mobileClasses = isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0";

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: routes.DASHBOARD },
        { icon: <BookOpen size={20} />, label: 'Study Sections', to: routes.SECTIONS.BASE },
        { icon: <ShieldAlert size={20} />, label: 'SecOps Modules', to: routes.SIMULATIONS.LIST },
        { icon: <Dumbbell size={20} />, label: 'Practice Zone', to: routes.PRACTICE.EXAM },
        { icon: <Library size={20} />, label: 'Notes', to: routes.NOTES },
        { icon: <BrainCircuit size={20} />, label: 'Flashcards', to: routes.FLASHCARDS.MANAGER },
    ];


    return (
        <aside className={`${baseClasses} ${mobileClasses}`}>
            <div className="p-4 flex flex-col h-full">
                <div className="mb-6">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Main Menu
                    </p>
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={closeMobileWrapper}
                                className={({ isActive }: { isActive: boolean }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                                        ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                                    }
                `}
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="mt-auto pt-4 border-t border-slate-800">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        System
                    </p>
                    <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
                        <Settings size={20} />
                        Settings
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
