import React from 'react';
import Layout from '../../components/common/Layout';
import { useCourses } from '../../context/CourseContext';
import { Users, BookOpen, TrendingUp, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { courses } = useCourses();

  const stats = {
    totalStudents: 150,
    totalCourses: courses.length,
    totalEnrollments: courses.reduce((acc, course) => acc + course.totalEnrollments, 0),
    averageCompletion: 78,
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Overview of your learning platform</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              icon={<Users className="h-6 w-6 text-blue-600" />}
              trend="+12% from last month"
            />
            <StatCard
              title="Total Courses"
              value={stats.totalCourses}
              icon={<BookOpen className="h-6 w-6 text-green-600" />}
              trend="+3 new this month"
            />
            <StatCard
              title="Total Enrollments"
              value={stats.totalEnrollments}
              icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
              trend="+25% from last month"
            />
            <StatCard
              title="Avg. Completion"
              value={`${stats.averageCompletion}%`}
              icon={<BarChart2 className="h-6 w-6 text-orange-600" />}
              trend="+5% from last month"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <QuickActionCard
              title="Course Management"
              description="Add, edit, or remove courses and their content"
              link="/admin/courses"
              icon={<BookOpen className="h-6 w-6" />}
            />
            <QuickActionCard
              title="User Analytics"
              description="Track student engagement and progress"
              link="/admin/analytics/users"
              icon={<Users className="h-6 w-6" />}
            />
            <QuickActionCard
              title="Course Analytics"
              description="Monitor course performance and metrics"
              link="/admin/analytics/courses"
              icon={<BarChart2 className="h-6 w-6" />}
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <ActivityItem
                title="New Course Published"
                description="Advanced React Patterns course is now live"
                time="2 hours ago"
              />
              <ActivityItem
                title="High Enrollment"
                description="Web Development Basics reached 100 students"
                time="5 hours ago"
              />
              <ActivityItem
                title="Course Updated"
                description="JavaScript Fundamentals content has been updated"
                time="1 day ago"
              />
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

const QuickActionCard: React.FC<{
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}> = ({ title, description, link, icon }) => (
  <Link
    to={link}
    className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center mb-4">
      <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
      <h3 className="ml-3 text-lg font-medium text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
);

const ActivityItem: React.FC<{
  title: string;
  description: string;
  time: string;
}> = ({ title, description, time }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0">
      <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="flex-shrink-0">
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

export default AdminDashboard;