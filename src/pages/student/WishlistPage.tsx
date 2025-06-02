import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useCourses } from '../../context/CourseContext';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseList from '../../components/courses/CourseList';

const WishlistPage: React.FC = () => {
  const { courses, getWishlist } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');

  const wishlist = getWishlist();
  const wishlistCourses = courses.filter(course => wishlist.includes(course.id));

  const filteredCourses = wishlistCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Wishlist</h1>
            <p className="text-gray-600">Courses you're interested in</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search wishlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <CourseList
              courses={filteredCourses}
              showWishlist={true}
              showEnrollButton={true}
            />
          ) : (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
              <p className="mt-2 text-gray-500">
                {wishlistCourses.length === 0
                  ? "You haven't added any courses to your wishlist yet."
                  : "No courses match your search criteria."}
              </p>
              <Link
                to="/courses"
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;