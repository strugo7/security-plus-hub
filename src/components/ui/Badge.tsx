import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    color?: string; // Custom tailwind color class override
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'sm',
    color,
    className = '',
}) => {
    const baseStyles = 'inline-flex items-center rounded-full font-medium';

    const sizeStyles = {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
    };

    const variantStyles = {
        default: 'bg-slate-700 text-slate-200',
        success: `bg-green-900 text-green-200 border border-green-700`,
        warning: `bg-yellow-900 text-yellow-200 border border-yellow-700`,
        error: `bg-red-900 text-red-200 border border-red-700`,
        info: `bg-blue-900 text-blue-200 border border-blue-700`,
        outline: 'bg-transparent border border-slate-600 text-slate-300',
    };

    // If a custom color is provided, use it (assuming it's a bg color class)
    const customStyle = color ? `bg-${color} text-white` : variantStyles[variant];

    return (
        <span className={`${baseStyles} ${sizeStyles[size]} ${customStyle} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
