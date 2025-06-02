import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import Card from '../../components/ui/Card';
import Progress from '../../components/ui/Progress';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useCourseStore } from '../../store/courseStore';
import { Student } from '../../types';

const MyLearningPage: React.FC = () => {
  const { user } = useAuthStore();
  const { courses } = useCourseStore();
  const student = user as Student;
  
  if (!student) {
    return <div>Loading...</div>;
  }
  
  // Get enrolled courses
  const enrolledCourses = courses.filter(course => 
    student.enrolledCourses.includes(course.id)
  );
  
  // Split courses into in progress and completed
  const inProgressCourses = enrolledCourses.filter(course => 
    !student.completedCourses.includes(course.id)
  );
  
  const completedCourses = enrolledCourses.filter(course => 
    student.completedCourses.includes(course.id)
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
          <p className="text-gray-600">Track your progress and continue learning</p>
        </div>
        
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start your learning journey by enrolling in a course
            </p>
            <Link to="/courses">
              <Button variant="primary">Browse Courses</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* In Progress Courses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  In Progress
                </h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-1" />
                  {inProgressCourses.length} courses
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map(course => (
                  <Card key={course.id} hoverable>
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <span>by {course.educatorName}</span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">
                            {Math.round(student.progress[course.id] || 0)}%
                          </span>
                        </div>
                        <Progress 
                          value={student.progress[course.id] || 0} 
                          size="sm"
                        />
                      </div>
                      
                      <Link to={`/course/${course.id}/learn`}>
                        <Button variant="primary" fullWidth>
                          Continue Learning
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Completed Courses */}
            {completedCourses.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Completed
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle size={16} className="mr-1" />
                    {completedCourses.length} courses
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCourses.map(course => (
                    <Card key={course.id} hoverable>
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course.title}
                        </h3>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <span>by {course.educatorName}</span>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center text-green-600">
                            <CheckCircle size={16} className="mr-1" />
                            <span className="text-sm font-medium">
                              Course Completed
                            </span>
                          </div>
                        </div>
                        
                        <Link to={`/course/${course.id}/learn`}>
                          <Button variant="outline" fullWidth>
                            Review Course
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearningPage;