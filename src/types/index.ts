// User types
export type UserRole = 'student' | 'educator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Student extends User {
  role: 'student';
  enrolledCourses: string[];
  completedCourses: string[];
  progress: Record<string, number>; // courseId: progressPercentage
  cart: string[];
}

export interface Educator extends User {
  role: 'educator';
  courses: string[];
  bio?: string;
  expertise?: string[];
  rating?: number;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Course types
export type CourseStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  price: number;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  educatorId: string;
  educatorName: string;
  status: CourseStatus;
  tags: string[];
  enrolledStudents: number;
  rating: number;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  videos: Video[];
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: number; // in minutes
  order: number;
}

// Progress tracking
export interface StudentProgress {
  courseId: string;
  userId: string;
  completedVideos: string[];
  lastWatched: string; // videoId
  completionPercentage: number;
  startDate: string;
  lastAccessDate: string;
}

// Analytics
export interface CourseAnalytics {
  courseId: string;
  views: number;
  enrollments: number;
  completions: number;
  averageRating: number;
  completionRate: number;
  revenueGenerated: number;
}

export interface EducatorAnalytics {
  educatorId: string;
  totalStudents: number;
  totalCourses: number;
  averageCourseRating: number;
  totalRevenue: number;
  courseCompletionRate: number;
}

export interface PlatformAnalytics {
  totalStudents: number;
  totalEducators: number;
  totalCourses: number;
  coursesCreatedThisMonth: number;
  newStudentsThisMonth: number;
  totalRevenue: number;
  pendingApprovals: number;
}