import React from 'react';
import { User, Mail, Calendar, BookOpen, Award, Clock } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Progress from '../../components/ui/Progress';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useCourseStore } from '../../store/courseStore';
import { Student } from '../../types';

const StudentProfilePage: React.FC = () => {
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
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar
                    src={student.avatar}
                    alt={student.name}
                    size="xl"
                    className="mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {student.name}
                  </h2>
                  <p className="text-gray-600">Student</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail size={20} className="mr-3" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={20} className="mr-3" />
                    <span>
                      Joined {new Date(student.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" fullWidth>
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Learning Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Enrolled Courses
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {enrolledCourses.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <Award size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {completedCourses.length}
                      </p>
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
                      <p className="text-sm font-medium text-gray-500">
                        In Progress
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {enrolledCourses.length - completedCourses.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Overall Progress
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {overallProgress}%
                      </span>
                    </div>
                    <Progress value={overallProgress} size="lg" showValue />
                  </div>
                  
                  <div className="space-y-4">
                    {enrolledCourses.map(course => (
                      <div key={course.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600">
                            {course.title}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;