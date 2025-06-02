import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  className?: string;
  valueClassName?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showValue = false,
  className = '',
  valueClassName = '',
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center">
        <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[size]}`}>
          <div 
            className={`${colorClasses[color]} transition-all duration-300 ease-in-out rounded-full ${heightClasses[size]}`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
        
        {showValue && (
          <span className={`ml-2 text-sm font-medium text-gray-700 ${valueClassName}`}>
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

export default Progress;