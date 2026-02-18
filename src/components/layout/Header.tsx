import React from 'react';
import { Menu, Shield, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { config } from '../../constants/config';
import Button from '../ui/Button';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="bg-slate-900 border-b border-slate-800 h-16 fixed top-0 w-full z-30">
            <div className="flex h-full items-center justify-between px-4">
                {/* Left: Mobile Menu & Logo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    <Link to={routes.HOME} className="flex items-center gap-2">
                        <Shield className="text-blue-500" size={28} />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hidden sm:block">
                            {config.app.name}
                        </span>
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Button>

                    <div className="hidden md:flex items-center gap-3 border-r border-slate-700 pr-4 mr-1">
                        <span className="text-sm text-slate-400">Streak: <span className="text-orange-400 font-bold">5 🔥</span></span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold ring-2 ring-slate-800">
                        OS
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
