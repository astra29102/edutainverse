import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { Save, Plus, Trash2, Edit2, Play } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useCourseStore } from '../../store/courseStore';

const EditCoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourseDetails } = useCourseStore();
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    price: '',
    level: 'beginner',
    category: '',
    thumbnailUrl: '',
  });

  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId) {
        const course = await getCourseDetails(courseId);
        if (course) {
          setCourseData({
            title: course.title,
            description: course.description,
            shortDescription: course.shortDescription,
            price: course.price.toString(),
            level: course.level,
            category: course.category,
            thumbnailUrl: course.thumbnailUrl,
          });
        }
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, getCourseDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = '/educator/courses';
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Course</h1>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        label="Course Title"
                        name="title"
                        value={courseData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        value={courseData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <Input
                        label="Short Description"
                        name="shortDescription"
                        value={courseData.shortDescription}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          label="Price ($)"
                          type="number"
                          name="price"
                          value={courseData.price}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Level
                        </label>
                        <select
                          name="level"
                          value={courseData.level}
                          onChange={handleInputChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                          required
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Input
                        label="Category"
                        name="category"
                        value={courseData.category}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        label="Thumbnail URL"
                        name="thumbnailUrl"
                        value={courseData.thumbnailUrl}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        leftIcon={<Save size={20} />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h2>

                  <div className="space-y-4">
                    <Link
                      to={`/educator/courses/${courseId}/modules/new`}
                      className="block"
                    >
                      <Button
                        variant="outline"
                        fullWidth
                        leftIcon={<Plus size={20} />}
                      >
                        Add Module
                      </Button>
                    </Link>

                    <div className="space-y-4">
                      {/* Module list would be dynamically rendered here */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">Module 1: Introduction</h3>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit2 size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Play size={16} className="mr-2 text-gray-500" />
                              <span>Introduction Video</span>
                            </div>
                            <span className="text-gray-500">10:30</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            fullWidth
                            leftIcon={<Plus size={16} />}
                          >
                            Add Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditCoursePage;