import { create } from 'zustand';
import { Course, Student } from '../types';
import { courses, getCourseById } from '../mock/courses';
import { useAuthStore } from './authStore';

interface CourseState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  getCourseDetails: (id: string) => Promise<Course | undefined>;
  enrollInCourse: (courseId: string) => Promise<boolean>;
  addToCart: (courseId: string) => Promise<boolean>;
  removeFromCart: (courseId: string) => Promise<boolean>;
  markVideoAsWatched: (courseId: string, videoId: string) => Promise<boolean>;
  searchCourses: (query: string) => Course[];
  filterCourses: (filters: CourseFilters) => Course[];
}

interface CourseFilters {
  level?: 'beginner' | 'intermediate' | 'advanced';
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: courses,
  isLoading: false,
  error: null,
  
  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, we would fetch from an API
      set({ courses: courses, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },
  
  getCourseDetails: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const course = getCourseById(id);
      set({ isLoading: false });
      
      return course;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },
  
  enrollInCourse: async (courseId: string) => {
    const user = useAuthStore.getState().user as Student | null;
    
    if (!user || user.role !== 'student') {
      set({ error: 'You must be logged in as a student to enroll in courses' });
      return false;
    }
    
    if (user.enrolledCourses.includes(courseId)) {
      set({ error: 'You are already enrolled in this course' });
      return false;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would update this on the server
      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId],
        progress: { ...user.progress, [courseId]: 0 }
      };
      
      useAuthStore.setState({ user: updatedUser });
      return true;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
      return false;
    }
  },
  
  addToCart: async (courseId: string) => {
    const user = useAuthStore.getState().user as Student | null;
    
    if (!user || user.role !== 'student') {
      set({ error: 'You must be logged in as a student to add courses to cart' });
      return false;
    }
    
    if (user.enrolledCourses.includes(courseId)) {
      set({ error: 'You are already enrolled in this course' });
      return false;
    }
    
    if (user.cart.includes(courseId)) {
      set({ error: 'Course is already in your cart' });
      return false;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // In a real app, we would update this on the server
      const updatedUser = {
        ...user,
        cart: [...user.cart, courseId]
      };
      
      useAuthStore.setState({ user: updatedUser });
      return true;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
      return false;
    }
  },
  
  removeFromCart: async (courseId: string) => {
    const user = useAuthStore.getState().user as Student | null;
    
    if (!user || user.role !== 'student') {
      set({ error: 'You must be logged in as a student to manage your cart' });
      return false;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // In a real app, we would update this on the server
      const updatedUser = {
        ...user,
        cart: user.cart.filter(id => id !== courseId)
      };
      
      useAuthStore.setState({ user: updatedUser });
      return true;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
      return false;
    }
  },
  
  markVideoAsWatched: async (courseId: string, videoId: string) => {
    const user = useAuthStore.getState().user as Student | null;
    
    if (!user || user.role !== 'student') {
      set({ error: 'You must be logged in as a student to track progress' });
      return false;
    }
    
    if (!user.enrolledCourses.includes(courseId)) {
      set({ error: 'You are not enrolled in this course' });
      return false;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get course to calculate progress
      const course = getCourseById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      
      // Count total videos in the course
      const totalVideos = course.modules.reduce(
        (count, module) => count + module.videos.length, 
        0
      );
      
      // In a real app, we would track specific videos watched
      // For simplicity, we'll just update the progress percentage
      const currentProgress = user.progress[courseId] || 0;
      const increment = 100 / totalVideos;
      const newProgress = Math.min(currentProgress + increment, 100);
      
      // In a real app, we would update this on the server
      const updatedUser = {
        ...user,
        progress: { ...user.progress, [courseId]: newProgress }
      };
      
      // If course is completed, move it to completedCourses
      if (newProgress >= 100 && !user.completedCourses.includes(courseId)) {
        updatedUser.completedCourses = [...user.completedCourses, courseId];
      }
      
      useAuthStore.setState({ user: updatedUser });
      return true;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
      return false;
    }
  },
  
  searchCourses: (query: string) => {
    if (!query.trim()) return get().courses;
    
    const lowercaseQuery = query.toLowerCase();
    return get().courses.filter(course => 
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  },
  
  filterCourses: (filters: CourseFilters) => {
    let filteredCourses = get().courses;
    
    if (filters.level) {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }
    
    if (typeof filters.minPrice === 'number') {
      filteredCourses = filteredCourses.filter(course => course.price >= filters.minPrice!);
    }
    
    if (typeof filters.maxPrice === 'number') {
      filteredCourses = filteredCourses.filter(course => course.price <= filters.maxPrice!);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filteredCourses = filteredCourses.filter(course => 
        filters.tags!.some(tag => course.tags.includes(tag))
      );
    }
    
    return filteredCourses;
  }
}));