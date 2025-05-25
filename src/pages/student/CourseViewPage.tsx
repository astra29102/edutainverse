import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/common/Layout';

const CourseViewPage: React.FC = () => {
  const { courseId } = useParams();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Course Content</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">Loading course content for ID: {courseId}...</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseViewPage;