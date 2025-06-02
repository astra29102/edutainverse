import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  showActions?: boolean;
  onEnroll?: (courseId: string) => void;
  onAddToCart?: (courseId: string) => void;
  isEnrolled?: boolean;
  isInCart?: boolean;
  isLoading?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  showActions = true,
  onEnroll,
  onAddToCart,
  isEnrolled = false,
  isInCart = false,
  isLoading = false,
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };
  
  return (
    <Card
      hoverable
      className="flex flex-col h-full transition-transform duration-300"
      padding="none"
    >
      <Link to={`/courses/${course.slug}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            <Badge variant="primary">{course.level}</Badge>
          </div>
        </div>
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex-grow">
          <Link to={`/courses/${course.slug}`} className="block">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-primary-600 transition-colors">
              {course.title}
            </h3>
          </Link>
          
          <p className="text-sm text-gray-600 mb-3">{course.shortDescription}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap gap-y-2">
            <div className="flex items-center mr-4">
              <Clock size={16} className="mr-1" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center mr-4">
              <Users size={16} className="mr-1" />
              <span>{course.enrolledStudents} students</span>
            </div>
            <div className="flex items-center">
              <Star size={16} className="mr-1 text-amber-500 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            {course.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="default" className="mr-1">
                {tag}
              </Badge>
            ))}
            {course.tags.length > 3 && (
              <Badge variant="default">+{course.tags.length - 3}</Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="font-semibold text-lg">${course.price.toFixed(2)}</div>
          
          {showActions && (
            <div className="flex space-x-2">
              {!isEnrolled && !isInCart && (
                <>
                  <button
                    onClick={() => onAddToCart?.(course.id)}
                    disabled={isLoading}
                    className="px-3 py-1 text-xs font-medium rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onEnroll?.(course.id)}
                    disabled={isLoading}
                    className="px-3 py-1 text-xs font-medium rounded bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    Enroll Now
                  </button>
                </>
              )}
              
              {isEnrolled && (
                <span className="px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                  Enrolled
                </span>
              )}
              
              {!isEnrolled && isInCart && (
                <span className="px-3 py-1 text-xs font-medium rounded bg-accent-100 text-accent-800">
                  In Cart
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;