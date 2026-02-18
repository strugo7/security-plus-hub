import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to dashboard after 3 seconds
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="bg-black text-white h-screen flex flex-col items-center justify-center font-mono relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-10"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="size-24 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin mb-8"></div>
                <h2 className="text-2xl font-display tracking-widest text-primary animate-pulse">AUTHENTICATING...</h2>
                <p className="text-text-secondary mt-2 text-sm">Verifying credentials with central server</p>
            </div>

            <div className="absolute bottom-10 text-xs text-text-secondary">
                SECURE CONNECTION ESTABLISHED
            </div>
        </div>
    );
};

export default LoadingPage;
