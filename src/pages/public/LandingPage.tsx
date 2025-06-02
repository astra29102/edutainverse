import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Users, Star, DivideIcon as LucideIcon } from 'lucide-react';
import Button from '../../components/ui/Button';
import { courses } from '../../mock/courses';

// Feature item component
interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const LandingPage: React.FC = () => {
  // Get featured courses (top 3 by rating)
  const featuredCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
    
  // Categories from course tags
  const categories = Array.from(
    new Set(courses.flatMap(course => course.tags))
  ).slice(0, 8);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Unlock Your Potential with Expert-Led Courses
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                Join thousands of students and transform your skills with our world-class learning platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="accent" 
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => window.location.href = '/courses'}
                >
                  Explore Courses
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={() => window.location.href = '/signup'}
                >
                  Sign Up for Free
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-primary-600 overflow-hidden">
                      <img 
                        src={`https://images.pexels.com/photos/${3778603 + i}/pexels-photo-${3778603 + i}.jpeg?auto=compress&cs=tinysrgb&w=32`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-primary-100">Trusted by <span className="font-semibold text-white">10,000+</span> students</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up hidden lg:block">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-accent-500/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-secondary-500/20 rounded-full filter blur-3xl"></div>
              
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl transform rotate-1">
                <img 
                  src="https://images.pexels.com/photos/4492126/pexels-photo-4492126.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Learning Platform" 
                  className="w-full h-auto rounded-lg"
                />
                
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg transform -rotate-3">
                  <div className="flex items-center space-x-2">
                    <div className="text-amber-500 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">4.9/5 average rating</span>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-accent-500 p-4 rounded-lg shadow-lg">
                  <p className="text-white font-bold">New courses added weekly!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-primary-600">100+</p>
              <p className="text-gray-600 mt-2">Expert Instructors</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-primary-600">500+</p>
              <p className="text-gray-600 mt-2">Courses Available</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-primary-600">10k+</p>
              <p className="text-gray-600 mt-2">Active Students</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-primary-600">95%</p>
              <p className="text-gray-600 mt-2">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular courses chosen by thousands of students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md">
                <Link to={`/courses/${course.slug}`}>
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={course.coverImage} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-600">{course.level}</span>
                    <div className="flex items-center">
                      <Star size={16} className="text-amber-500 fill-current" />
                      <span className="ml-1 text-sm font-medium">{course.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <Link to={`/courses/${course.slug}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4">{course.shortDescription}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-bold text-gray-900">${course.price.toFixed(2)}</span>
                    <Link 
                      to={`/courses/${course.slug}`}
                      className="text-primary-600 font-medium hover:text-primary-700 flex items-center"
                    >
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="primary" rightIcon={<ArrowRight size={18} />}>
                Browse All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse courses by category and find the perfect match for your learning goals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={`/courses?category=${category}`}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-primary-200"
              >
                <div className="text-primary-600 mb-2">
                  <BookOpen size={32} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EduHub</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers a unique learning experience with features designed to help you succeed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureItem 
              icon={BookOpen}
              title="Quality Content"
              description="Courses created by industry experts with real-world experience and in-depth knowledge"
            />
            <FeatureItem 
              icon={Award}
              title="Certification"
              description="Earn certificates upon completion to showcase your newly acquired skills"
            />
            <FeatureItem 
              icon={Users}
              title="Community Support"
              description="Join a community of learners and get help whenever you need it"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read testimonials from students who have transformed their careers with our courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Developer",
                image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100",
                quote: "The web development courses on EduHub helped me transition from a non-technical role to a full-stack developer position in just 6 months. The quality of instruction is outstanding!"
              },
              {
                name: "Michael Lee",
                role: "Data Scientist",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
                quote: "I completed the Data Science track and landed my dream job shortly after. The hands-on projects and personalized feedback from instructors made all the difference."
              },
              {
                name: "Emily Chen",
                role: "Marketing Specialist",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
                quote: "The digital marketing courses provided practical skills I could immediately apply at work. My manager noticed the improvement in my campaigns within weeks."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4 text-amber-500 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students and transform your career with our expert-led courses
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="accent" 
              size="lg"
              onClick={() => window.location.href = '/courses'}
            >
              Explore Courses
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up for Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;