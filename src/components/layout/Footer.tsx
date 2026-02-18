import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { config } from '../../constants/config';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-right">
                        <h4 className="text-sm font-semibold text-slate-200">{config.app.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">
                            &copy; {new Date().getFullYear()} {config.app.description}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                            <Twitter size={20} />
                        </a>
                    </div>

                    <div className="text-xs text-slate-500 text-center md:text-left">
                        <p>CompTIA Security+ SY0-701</p>
                        <p>Version {config.app.version}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
