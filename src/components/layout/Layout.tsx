import React, { useState } from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
            <Header toggleSidebar={toggleSidebar} />

            <div className="flex flex-1 pt-16">
                <Sidebar isOpen={isSidebarOpen} closeMobileWrapper={() => setIsSidebarOpen(false)} />

                <main className="flex-1 w-full md:w-[calc(100%-16rem)] md:mr-64 transition-all duration-300 flex flex-col">
                    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;
