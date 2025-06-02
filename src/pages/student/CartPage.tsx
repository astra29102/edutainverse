import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useCourseStore } from '../../store/courseStore';
import { Student } from '../../types';

const CartPage: React.FC = () => {
  const { user } = useAuthStore();
  const { courses, removeFromCart, enrollInCourse } = useCourseStore();
  const student = user as Student;
  
  if (!student) {
    return <div>Loading...</div>;
  }
  
  // Get cart courses
  const cartCourses = courses.filter(course => 
    student.cart.includes(course.id)
  );
  
  // Calculate total
  const total = cartCourses.reduce((sum, course) => sum + course.price, 0);
  
  const handleRemove = async (courseId: string) => {
    await removeFromCart(courseId);
  };
  
  const handleCheckout = async () => {
    // In a real app, this would integrate with a payment processor
    // For demo purposes, we'll just enroll in all courses
    for (const course of cartCourses) {
      await enrollInCourse(course.id);
      await removeFromCart(course.id);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>
        
        {cartCourses.length === 0 ? (
          <Card className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-4">
              Browse our courses and add some to your cart
            </p>
            <Link to="/courses">
              <Button variant="primary">Browse Courses</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartCourses.map(course => (
                  <Card key={course.id}>
                    <div className="p-4 flex">
                      <div className="w-32 h-20 flex-shrink-0">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              by {course.educatorName}
                            </p>
                          </div>
                          <div className="text-lg font-semibold">
                            ${course.price.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <Link 
                            to={`/courses/${course.slug}`}
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            View Details
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleRemove(course.id)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="sticky top-24">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                    
                    <div className="flex items-start text-sm text-gray-600">
                      <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <p>
                        By completing your purchase you agree to our terms of service
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;