import React from 'react';
import { Category } from '../../types';
import { CATEGORY_COLORS } from '../../lib/constants';

interface BadgeProps {
  category?: Category;
  children?: React.ReactNode;
  variant?: 'neutral' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  category,
  children,
  variant = 'neutral',
  size = 'md',
}) => {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  if (category) {
    const config = CATEGORY_COLORS[category] || CATEGORY_COLORS['Outros'];
    return (
      <span
        className={`inline-flex items-center font-medium rounded-full border ${sizeClass} ${config.bg} ${config.text} ${config.border}`}
      >
        <span
          className="w-1.5 h-1.5 rounded-full mr-1.5"
          style={{ backgroundColor: config.hex }}
        />
        {category}
      </span>
    );
  }

  const variantClasses = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClass} ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
};
