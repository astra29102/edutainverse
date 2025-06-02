import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Clock, Users, Star, Award, BarChart, CheckCircle, Play } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Spinner from '../../components/ui/Spinner';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';
import { Student } from '../../types';

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getCourseDetails, enrollInCourse, addToCart, isLoading, error } = useCourseStore();
  const { user, isAuthenticated } = useAuthStore();
  const [course, setCourse] = useState<any>(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseFromSlug = await getCourseDetails(slug ? findCourseIdBySlug(slug) : '');
      setCourse(courseFromSlug);
    };
    
    fetchCourseDetails();
  }, [slug, getCourseDetails]);
  
  // In a real app, we would have an API call to find a course by slug
  // For this demo, we'll simulate it by finding a course with a matching slug
  const findCourseIdBySlug = (slug: string) => {
    // Assuming courses are available from the store
    const allCourses = useCourseStore.getState().courses;
    const course = allCourses.find(c => c.slug === slug);
    return course ? course.id : '';
  };
  
  const handleEnroll = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    if (!course) return;
    
    setActionInProgress(true);
    const success = await enrollInCourse(course.id);
    setActionInProgress(false);
    
    if (success) {
      // Redirect to learning page or show success message
      window.location.href = `/course/${course.id}/learn`;
    }
  };
  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    if (!course) return;
    
    setActionInProgress(true);
    const success = await addToCart(course.id);
    setActionInProgress(false);
    
    if (success) {
      // Show success message or redirect to cart
    }
  };
  
  // Check if the student is enrolled in the course
  const isEnrolled = () => {
    if (!isAuthenticated || user?.role !== 'student' || !course) return false;
    return (user as Student).enrolledCourses.includes(course.id);
  };
  
  // Check if the course is in the student's cart
  const isInCart = () => {
    if (!isAuthenticated || user?.role !== 'student' || !course) return false;
    return (user as Student).cart.includes(course.id);
  };
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };
  
  if (isLoading || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link to="/courses" className="ml-2 text-gray-500 hover:text-gray-700">Courses</Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="ml-2 text-gray-700">{course.title}</span>
            </li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video w-full">
                <img 
                  src={course.coverImage} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary">{course.level}</Badge>
                  {course.tags.slice(0, 3).map((tag: string, index: number) => (
                    <Badge key={index} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                
                <div className="flex items-center text-sm text-gray-500 mb-6 flex-wrap gap-y-2">
                  <div className="flex items-center mr-4">
                    <Clock size={16} className="mr-1" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Users size={16} className="mr-1" />
                    <span>{course.enrolledStudents} students</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Star size={16} className="mr-1 text-amber-500 fill-current" />
                    <span>{course.rating.toFixed(1)} rating</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700">
                      Created by <span className="font-medium">{course.educatorName}</span>
                    </span>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    {['overview', 'curriculum', 'instructor'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`
                          pb-4 px-1 border-b-2 font-medium text-sm
                          ${activeTab === tab 
                            ? 'border-primary-600 text-primary-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                        `}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>
                
                {activeTab === 'overview' && (
                  <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-3">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      {[
                        "Master key concepts and practical applications",
                        "Build real-world projects for your portfolio",
                        "Learn best practices and industry standards",
                        "Get personalized feedback on your work",
                        "Join a community of like-minded learners",
                        "Earn a certificate upon course completion"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-3">Requirements</h3>
                    <ul className="list-disc list-inside text-gray-700 mb-6">
                      <li>Basic understanding of the subject area</li>
                      <li>Computer with internet connection</li>
                      <li>Willingness to learn and practice</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'curriculum' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                    <div className="text-sm text-gray-600 mb-4">
                      {course.modules.length} modules • {course.modules.reduce((total: number, module: any) => total + module.videos.length, 0)} lessons • {formatDuration(course.duration)} total length
                    </div>
                    
                    <div className="space-y-4">
                      {course.modules.map((module: any, index: number) => (
                        <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
                            <h3 className="font-medium">
                              {index + 1}. {module.title}
                            </h3>
                            <div className="text-sm text-gray-500">
                              {module.videos.length} lessons
                            </div>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {module.videos.map((video: any, vIndex: number) => (
                              <div key={video.id} className="px-4 py-3 flex justify-between items-center">
                                <div className="flex items-center">
                                  <Play size={16} className="text-primary-600 mr-2" />
                                  <span>
                                    {index + 1}.{vIndex + 1} {video.title}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  {video.duration} min
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'instructor' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Meet Your Instructor</h2>
                    <div className="flex items-start">
                      <Avatar 
                        src={`https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=100`}
                        alt={course.educatorName}
                        size="xl"
                        className="mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium">{course.educatorName}</h3>
                        <p className="text-gray-600 text-sm mb-2">Expert in {course.tags.join(', ')}</p>
                        <div className="flex items-center text-sm mb-4">
                          <Star size={16} className="mr-1 text-amber-500 fill-current" />
                          <span className="mr-2">{course.rating.toFixed(1)} Instructor Rating</span>
                          <Award size={16} className="mr-1 text-primary-600" />
                          <span>{Math.floor(Math.random() * 200) + 100} Reviews</span>
                        </div>
                        <p className="text-gray-700">
                          An experienced educator with a passion for teaching and helping students achieve their goals. 
                          With years of industry experience, they bring real-world insights to their courses, making 
                          complex concepts accessible and engaging.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg">
                <img 
                  src={course.coverImage} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${course.price.toFixed(2)}
                </div>
              </div>
              
              {isEnrolled() ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-md px-4 py-3 flex items-center text-green-800">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>You're enrolled in this course</span>
                  </div>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => window.location.href = `/course/${course.id}/learn`}
                  >
                    Continue Learning
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleEnroll}
                    isLoading={actionInProgress}
                  >
                    Enroll Now
                  </Button>
                  
                  {isInCart() ? (
                    <div className="bg-accent-50 border border-accent-200 rounded-md px-4 py-3 flex items-center text-accent-800">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Added to cart</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleAddToCart}
                      isLoading={actionInProgress}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              )}
              
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">This course includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-700">
                    <Play size={18} className="mr-2 text-gray-500" />
                    {formatDuration(course.duration)} of on-demand video
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <BarChart size={18} className="mr-2 text-gray-500" />
                    Access on mobile and desktop
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Award size={18} className="mr-2 text-gray-500" />
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;