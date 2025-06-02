import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import CourseCard from '../../components/courses/CourseCard';
import CourseFilter from '../../components/courses/CourseFilter';
import Spinner from '../../components/ui/Spinner';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';
import { Course, Student } from '../../types';

const CoursesPage: React.FC = () => {
  const { courses, isLoading, error, fetchCourses, searchCourses, filterCourses, enrollInCourse, addToCart } = useCourseStore();
  const { user, isAuthenticated } = useAuthStore();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  
  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);
  
  // Get all unique tags from all courses
  const allTags = Array.from(new Set(courses.flatMap(course => course.tags)));
  
  const handleSearch = (query: string) => {
    setFilteredCourses(searchCourses(query));
  };
  
  const handleFilter = (filters: any) => {
    setFilteredCourses(filterCourses(filters));
  };
  
  const handleEnroll = async (courseId: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    setActionInProgress(courseId);
    const success = await enrollInCourse(courseId);
    setActionInProgress(null);
    
    if (success) {
      // Show success message or redirect
    }
  };
  
  const handleAddToCart = async (courseId: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    setActionInProgress(courseId);
    const success = await addToCart(courseId);
    setActionInProgress(null);
    
    if (success) {
      // Show success message
    }
  };
  
  // Check if the student is enrolled in a course
  const isEnrolled = (courseId: string) => {
    if (!isAuthenticated || user?.role !== 'student') return false;
    return (user as Student).enrolledCourses.includes(courseId);
  };
  
  // Check if the course is in the student's cart
  const isInCart = (courseId: string) => {
    if (!isAuthenticated || user?.role !== 'student') return false;
    return (user as Student).cart.includes(courseId);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover a wide range of courses taught by industry experts
          </p>
        </div>
        
        <CourseFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          availableTags={allTags}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md">
            {error}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
                onAddToCart={handleAddToCart}
                isEnrolled={isEnrolled(course.id)}
                isInCart={isInCart(course.id)}
                isLoading={actionInProgress === course.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;