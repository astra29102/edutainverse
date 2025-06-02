import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Play, CheckCircle, List } from 'lucide-react';
import Card from '../../components/ui/Card';
import Progress from '../../components/ui/Progress';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useCourseStore } from '../../store/courseStore';
import { Student } from '../../types';

const CoursePlayerPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuthStore();
  const { getCourseDetails, markVideoAsWatched } = useCourseStore();
  const [course, setCourse] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  
  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId) {
        const courseData = await getCourseDetails(courseId);
        setCourse(courseData);
        if (courseData?.modules?.length > 0) {
          setCurrentModule(courseData.modules[0]);
          setCurrentVideo(courseData.modules[0].videos[0]);
        }
      }
    };
    
    fetchCourse();
  }, [courseId, getCourseDetails]);
  
  const handleVideoComplete = async () => {
    if (courseId && currentVideo) {
      await markVideoAsWatched(courseId, currentVideo.id);
    }
  };
  
  if (!course || !currentModule || !currentVideo) {
    return <div>Loading...</div>;
  }
  
  const student = user as Student;
  const progress = student?.progress[courseId] || 0;
  
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        {/* Video Player Section */}
        <div className={`flex-grow ${showSidebar ? 'mr-80' : ''}`}>
          <div className="h-full flex flex-col">
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            
            {/* Video Info */}
            <div className="flex-grow bg-gray-800 p-6">
              <div className="max-w-4xl mx-auto">
                <nav className="flex mb-4" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 text-sm text-gray-400">
                    <li>
                      <Link to="/my-learning" className="hover:text-white">
                        My Learning
                      </Link>
                    </li>
                    <ChevronRight size={16} />
                    <li>
                      <Link to={`/courses/${course.slug}`} className="hover:text-white">
                        {course.title}
                      </Link>
                    </li>
                    <ChevronRight size={16} />
                    <li className="text-white">{currentVideo.title}</li>
                  </ol>
                </nav>
                
                <h1 className="text-2xl font-bold text-white mb-4">
                  {currentVideo.title}
                </h1>
                
                <p className="text-gray-300 mb-6">
                  {currentVideo.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="primary"
                      onClick={handleVideoComplete}
                    >
                      Mark as Complete
                    </Button>
                    
                    <div className="text-gray-400">
                      {Math.round(progress)}% Complete
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="text-white"
                    onClick={() => setShowSidebar(!showSidebar)}
                  >
                    <List size={20} />
                    <span className="ml-2">
                      {showSidebar ? 'Hide' : 'Show'} Course Content
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content Sidebar */}
        {showSidebar && (
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-gray-800 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                Course Content
              </h2>
              
              <div className="mb-4">
                <Progress value={progress} showValue color="primary" />
              </div>
              
              <div className="space-y-4">
                {course.modules.map((module: any) => (
                  <Card key={module.id} className="bg-gray-700">
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-white mb-2">
                        {module.title}
                      </h3>
                      
                      <div className="space-y-2">
                        {module.videos.map((video: any) => (
                          <button
                            key={video.id}
                            onClick={() => {
                              setCurrentModule(module);
                              setCurrentVideo(video);
                            }}
                            className={`
                              w-full flex items-center p-2 rounded
                              ${currentVideo.id === video.id
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-300 hover:bg-gray-600'}
                            `}
                          >
                            {student?.completedVideos?.includes(video.id) ? (
                              <CheckCircle size={16} className="mr-2 text-green-500" />
                            ) : (
                              <Play size={16} className="mr-2" />
                            )}
                            <span className="text-sm text-left">{video.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayerPage;