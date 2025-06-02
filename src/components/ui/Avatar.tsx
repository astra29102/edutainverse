import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  fallback,
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };
  
  const [imgError, setImgError] = React.useState(false);
  
  const getFallbackInitials = () => {
    if (fallback) return fallback;
    
    if (alt && alt !== 'Avatar') {
      const words = alt.split(' ');
      if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
      } else {
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
      }
    }
    
    return 'U';
  };
  
  return (
    <div 
      className={`
        relative inline-flex rounded-full overflow-hidden bg-gray-200
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-800 font-medium">
          {getFallbackInitials()}
        </div>
      )}
    </div>
  );
};

export default Avatar;