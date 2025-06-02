import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { useCourses } from '../../context/CourseContext';
import { Save, Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';

const CourseEditor: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, modules, videos, updateCourse, addModule, updateModule, deleteModule, addVideo, updateVideo, deleteVideo } = useCourses();

  const course = courses.find(c => c.id === courseId);
  const courseModules = modules[courseId!] || [];

  const [courseData, setCourseData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    category: course?.category || 'Beginner',
    thumbnailUrl: course?.thumbnailUrl || '',
  });

  const handleCourseUpdate = async () => {
    if (courseId) {
      await updateCourse(courseId, courseData);
    }
  };

  const handleAddModule = async () => {
    if (courseId) {
      await addModule({
        courseId,
        title: 'New Module',
        description: 'Module description',
        order: courseModules.length + 1,
      });
    }
  };

  const handleAddVideo = async (moduleId: string) => {
    await addVideo({
      moduleId,
      title: 'New Video',
      videoUrl: '',
      duration: 0,
      order: (videos[moduleId] || []).length + 1,
    });
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {courseId === 'new' ? 'Create New Course' : 'Edit Course'}
            </h1>
            <button
              onClick={handleCourseUpdate}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>

          {/* Course Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={courseData.category}
                  onChange={(e) => setCourseData({ ...courseData, category: e.target.value as 'Beginner' | 'Average' | 'Advanced' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Average">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                <input
                  type="text"
                  value={courseData.thumbnailUrl}
                  onChange={(e) => setCourseData({ ...courseData, thumbnailUrl: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Course Modules</h2>
              <button
                onClick={handleAddModule}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-1" />
                Add Module
              </button>
            </div>

            <div className="space-y-6">
              {courseModules.map((module, moduleIndex) => (
                <div key={module.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => updateModule(module.id, { title: e.target.value })}
                        className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-blue-600 focus:ring-0 sm:text-sm"
                      />
                      <textarea
                        value={module.description}
                        onChange={(e) => updateModule(module.id, { description: e.target.value })}
                        className="mt-2 block w-full border-0 border-b border-transparent bg-gray-50 focus:border-blue-600 focus:ring-0 sm:text-sm"
                        rows={2}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => moduleIndex > 0 && updateModule(module.id, { order: module.order - 1 })}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        disabled={moduleIndex === 0}
                      >
                        <MoveUp className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => moduleIndex < courseModules.length - 1 && updateModule(module.id, { order: module.order + 1 })}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        disabled={moduleIndex === courseModules.length - 1}
                      >
                        <MoveDown className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteModule(module.id)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Videos */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Videos</h4>
                      <button
                        onClick={() => handleAddVideo(module.id)}
                        className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Video
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(videos[module.id] || []).map((video, videoIndex) => (
                        <div key={video.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                          <input
                            type="text"
                            value={video.title}
                            onChange={(e) => updateVideo(video.id, { title: e.target.value })}
                            className="flex-1 border-0 bg-transparent focus:ring-0 sm:text-sm"
                            placeholder="Video title"
                          />
                          <input
                            type="text"
                            value={video.videoUrl}
                            onChange={(e) => updateVideo(video.id, { videoUrl: e.target.value })}
                            className="flex-1 border-0 bg-transparent focus:ring-0 sm:text-sm"
                            placeholder="Video URL"
                          />
                          <input
                            type="number"
                            value={video.duration}
                            onChange={(e) => updateVideo(video.id, { duration: parseInt(e.target.value) })}
                            className="w-20 border-0 bg-transparent focus:ring-0 sm:text-sm"
                            placeholder="Duration"
                          />
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => videoIndex > 0 && updateVideo(video.id, { order: video.order - 1 })}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              disabled={videoIndex === 0}
                            >
                              <MoveUp className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => videoIndex < (videos[module.id] || []).length - 1 && updateVideo(video.id, { order: video.order + 1 })}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              disabled={videoIndex === (videos[module.id] || []).length - 1}
                            >
                              <MoveDown className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteVideo(video.id)}
                              className="p-1 text-red-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseEditor;