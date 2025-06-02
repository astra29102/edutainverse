import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { Save, Plus, Image as ImageIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AddCoursePage: React.FC = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    price: '',
    level: 'beginner',
    category: '',
    thumbnailUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirect to educator courses page
      window.location.href = '/educator/courses';
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
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
                      leftIcon={<ImageIcon size={20} />}
                      required
                    />
                  </div>
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
                    isLoading={isSubmitting}
                    leftIcon={<Save size={20} />}
                  >
                    Create Course
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCoursePage;