import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { Save, Plus, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface Module {
  title: string;
  description: string;
}

const AddModulePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [modules, setModules] = useState<Module[]>([
    { title: '', description: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    const updatedModules = [...modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value
    };
    setModules(updatedModules);
  };

  const addModule = () => {
    setModules([...modules, { title: '', description: '' }]);
  };

  const removeModule = (index: number) => {
    if (modules.length > 1) {
      const updatedModules = modules.filter((_, i) => i !== index);
      setModules(updatedModules);
    }
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === modules.length - 1)
    ) {
      return;
    }

    const newModules = [...modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]];
    setModules(newModules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirect to course edit page
      window.location.href = `/educator/courses/${courseId}/edit`;
    } catch (error) {
      console.error('Error creating modules:', error);
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
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Course Modules</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {modules.map((module, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        Module {index + 1}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveModule(index, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveModule(index, 'down')}
                          disabled={index === modules.length - 1}
                        >
                          <ArrowDown size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeModule(index)}
                          disabled={modules.length === 1}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>

                    <Input
                      label="Module Title"
                      value={module.title}
                      onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Module Description
                      </label>
                      <textarea
                        value={module.description}
                        onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addModule}
                  leftIcon={<Plus size={20} />}
                  fullWidth
                >
                  Add Another Module
                </Button>

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
                    Save Modules
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

export default AddModulePage;