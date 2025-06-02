import React from 'react';
import Layout from '../../components/common/Layout';
import { Eye, Star, TrendingUp, Users } from 'lucide-react';

const CourseAnalyticsPage: React.FC = () => {
  // Mock data for demonstration
  const stats = {
    totalViews: '25.5K',
    averageRating: 4.8,
    completionRate: '82%',
    activeEnrollments: '1.2K',
  };

  const coursePerformance = [
    {
      title: 'Web Development Basics',
      enrollments: 450,
      completionRate: 85,
      rating: 4.9,
    },
    {
      title: 'Advanced React Patterns',
      enrollments: 320,
      completionRate: 78,
      rating: 4.7,
    },
    {
      title: 'JavaScript Fundamentals',
      enrollments: 580,
      completionRate: 92,
      rating: 4.8,
    },
    {
      title: 'UI/UX Design Principles',
      enrollments: 290,
      completionRate: 75,
      rating: 4.6,
    },
    {
      title: 'Node.js Backend Development',
      enrollments: 410,
      completionRate: 88,
      rating: 4.9,
    },
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Course Analytics</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Views"
              value={stats.totalViews}
              icon={<Eye className="h-6 w-6 text-blue-600" />}
              trend="+18% from last month"
            />
            <StatCard
              title="Average Rating"
              value={stats.averageRating}
              icon={<Star className="h-6 w-6 text-yellow-600" />}
              trend="+0.2 from last month"
            />
            <StatCard
              title="Completion Rate"
              value={stats.completionRate}
              icon={<TrendingUp className="h-6 w-6 text-green-600" />}
              trend="+5% from last month"
            />
            <StatCard
              title="Active Enrollments"
              value={stats.activeEnrollments}
              icon={<Users className="h-6 w-6 text-purple-600" />}
              trend="+15% from last month"
            />
          </div>

          {/* Course Performance Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Course Performance</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coursePerformance.map((course, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.enrollments}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${course.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {course.completionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-900">{course.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Engagement Chart */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Engagement</h2>
            <div className="h-64 flex items-end space-x-2">
              {[65, 75, 90, 85, 80, 95, 70].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="mt-2 text-sm text-gray-600">
                    Week {index + 1}
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

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
}> = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
    <p className="text-sm text-green-600">{trend}</p>
  </div>
);

export default CourseAnalyticsPage;