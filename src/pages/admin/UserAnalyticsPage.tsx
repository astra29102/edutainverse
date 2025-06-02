import React from 'react';
import Layout from '../../components/common/Layout';
import { Users, TrendingUp, UserCheck, Clock } from 'lucide-react';

const UserAnalyticsPage: React.FC = () => {
  // Mock data for demonstration
  const stats = {
    totalUsers: 1250,
    activeUsers: 890,
    averageEngagement: '3.5h',
    completionRate: '78%',
  };

  const engagementData = [
    { date: 'Mon', users: 750 },
    { date: 'Tue', users: 820 },
    { date: 'Wed', users: 950 },
    { date: 'Thu', users: 890 },
    { date: 'Fri', users: 915 },
    { date: 'Sat', users: 760 },
    { date: 'Sun', users: 680 },
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">User Analytics</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<Users className="h-6 w-6 text-blue-600" />}
              trend="+12% from last month"
            />
            <StatCard
              title="Active Users"
              value={stats.activeUsers}
              icon={<UserCheck className="h-6 w-6 text-green-600" />}
              trend="+8% from last month"
            />
            <StatCard
              title="Avg. Engagement"
              value={stats.averageEngagement}
              icon={<Clock className="h-6 w-6 text-purple-600" />}
              trend="+15% from last month"
            />
            <StatCard
              title="Completion Rate"
              value={stats.completionRate}
              icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
              trend="+5% from last month"
            />
          </div>

          {/* Engagement Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Engagement</h2>
            <div className="h-64">
              <div className="flex h-full items-end space-x-2">
                {engagementData.map((day) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{
                        height: `${(day.users / 1000) * 100}%`,
                      }}
                    ></div>
                    <div className="mt-2 text-sm text-gray-600">{day.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Activity Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent User Activity</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">User {i}</div>
                          <div className="text-sm text-gray-500">user{i}@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed Lesson
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Web Development Basics
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2 hours ago
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default UserAnalyticsPage;