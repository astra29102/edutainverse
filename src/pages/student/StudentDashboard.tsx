import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, TrendingUp, BarChart } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Progress from '../../components/ui/Progress';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useCourseStore } from '../../store/courseStore';
import { Student } from '../../types';

const StudentDashboard: React.FC = () => {
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
  
  // Get courses in progress (enrolled but not completed)
  const coursesInProgress = enrolledCourses.filter(course => 
    !student.completedCourses.includes(course.id)
  );
  
  // Get completed courses
  const completedCourses = enrolledCourses.filter(course => 
    student.completedCourses.includes(course.id)
  );
  
  // Calculate overall progress
  const overallProgress = enrolledCourses.length > 0
    ? Math.round(
        (completedCourses.length / enrolledCourses.length) * 100
      )
    : 0;
  
  // Get courses with highest progress for "Continue Learning" section
  const continueLearningCourses = coursesInProgress
    .sort((a, b) => 
      (student.progress[b.id] || 0) - (student.progress[a.id] || 0)
    )
    .slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {student.name}!</h1>
          <p className="text-gray-600">
            Continue your learning journey and track your progress.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{coursesInProgress.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Overall Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
              </CardHeader>
              <CardContent>
                {continueLearningCourses.length > 0 ? (
                  <div className="space-y-6">
                    {continueLearningCourses.map(course => {
                      const progress = student.progress[course.id] || 0;
                      
                      return (
                        <div key={course.id} className="flex flex-col sm:flex-row sm:items-center">
                          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                            <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden">
                              <img
                                src={course.coverImage}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {course.title}
                            </h3>
                            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2">
                              <span className="mr-3">{course.educatorName}</span>
                              <span>{Math.round(progress)}% complete</span>
                            </div>
                            <Progress value={progress} size="sm" color="primary" className="mb-2" />
                            <Link to={`/course/${course.id}/learn`}>
                              <Button variant="outline" size="sm">
                                Continue
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No courses in progress</h3>
                    <p className="text-gray-600 mb-4">
                      Start learning today by enrolling in a course
                    </p>
                    <Link to="/courses">
                      <Button variant="primary">Browse Courses</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-primary-50 rounded-full mb-4">
                      <BarChart className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {overallProgress}% Complete
                    </h3>
                    <p className="text-sm text-gray-600">
                      {completedCourses.length} of {enrolledCourses.length} courses completed
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {enrolledCourses.slice(0, 5).map(course => (
                      <div key={course.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
                            {course.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {Math.round(student.progress[course.id] || 0)}%
                          </span>
                        </div>
                        <Progress 
                          value={student.progress[course.id] || 0} 
                          size="sm" 
                          color={student.completedCourses.includes(course.id) ? "success" : "primary"} 
                        />
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/my-learning" className="block text-center">
                    <Button variant="outline" size="sm">
                      View All Courses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses
                  .filter(course => !student.enrolledCourses.includes(course.id))
                  .slice(0, 3)
                  .map(course => (
                    <div key={course.id} className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
                      <div className="aspect-video w-full">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 flex-grow">
                          {course.shortDescription}
                        </p>
                        <Link to={`/courses/${course.slug}`} className="mt-auto">
                          <Button variant="outline" size="sm" fullWidth>
                            View Course
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;