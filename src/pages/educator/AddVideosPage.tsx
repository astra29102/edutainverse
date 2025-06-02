import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import { Save, Plus, ArrowUp, ArrowDown, Trash2, Play } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface Video {
  title: string;
  youtubeId: string;
  duration: string;
}

const AddVideosPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [videos, setVideos] = useState<Video[]>([
    { title: '', youtubeId: '', duration: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVideoChange = (index: number, field: keyof Video, value: string) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = {
      ...updatedVideos[index],
      [field]: value
    };
    setVideos(updatedVideos);
  };

  const addVideo = () => {
    setVideos([...videos, { title: '', youtubeId: '', duration: '' }]);
  };

  const removeVideo = (index: number) => {
    if (videos.length > 1) {
      const updatedVideos = videos.filter((_, i) => i !== index);
      setVideos(updatedVideos);
    }
  };

  const moveVideo = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === videos.length - 1)
    ) {
      return;
    }

    const newVideos = [...videos];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newVideos[index], newVideos[targetIndex]] = [newVideos[targetIndex], newVideos[index]];
    setVideos(newVideos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirect back to course edit page
      window.history.back();
    } catch (error) {
      console.error('Error adding videos:', error);
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
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Module Videos</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        Video {index + 1}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveVideo(index, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveVideo(index, 'down')}
                          disabled={index === videos.length - 1}
                        >
                          <ArrowDown size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVideo(index)}
                          disabled={videos.length === 1}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>

                    <Input
                      label="Video Title"
                      value={video.title}
                      onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                      required
                    />

                    <Input
                      label="YouTube Video ID"
                      value={video.youtubeId}
                      onChange={(e) => handleVideoChange(index, 'youtubeId', e.target.value)}
                      leftIcon={<Play size={20} />}
                      helperText="Example: dQw4w9WgXcQ (from youtube.com/watch?v=dQw4w9WgXcQ)"
                      required
                    />

                    <Input
                      label="Duration (minutes)"
                      type="number"
                      value={video.duration}
                      onChange={(e) => handleVideoChange(index, 'duration', e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addVideo}
                  leftIcon={<Plus size={20} />}
                  fullWidth
                >
                  Add Another Video
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
                    Save Videos
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

export default AddVideosPage;