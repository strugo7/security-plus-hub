import React from 'react';

interface ProgressBarProps {
    progress: number; // 0 to 100
    color?: string;   // Tailwind bg color class
    height?: string;  // Tailwind height class
    showLabel?: boolean;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = 'bg-blue-600',
    height = 'h-2.5',
    showLabel = false,
    className = '',
}) => {
    // Clamp progress between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-300">Progress</span>
                    <span className="text-sm font-medium text-slate-300">{Math.round(clampedProgress)}%</span>
                </div>
            )}
            <div className={`w-full bg-slate-700 rounded-full ${height}`}>
                <div
                    className={`${color} ${height} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${clampedProgress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
