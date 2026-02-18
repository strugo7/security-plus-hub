import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string | React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    title,
    footer,
    className = '',
    noPadding = false,
}) => {
    return (
        <div className={`bg-slate-800 rounded-lg border border-slate-700 shadow-sm overflow-hidden ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-slate-700">
                    {typeof title === 'string' ? (
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                    ) : (
                        title
                    )}
                </div>
            )}

            <div className={noPadding ? '' : 'p-6'}>
                {children}
            </div>

            {footer && (
                <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
