import { CourseAnalytics, EducatorAnalytics, PlatformAnalytics } from '../types';

export const courseAnalytics: CourseAnalytics[] = [
  {
    courseId: '1',
    views: 8520,
    enrollments: 325,
    completions: 178,
    averageRating: 4.8,
    completionRate: 54.8,
    revenueGenerated: 16247.75
  },
  {
    courseId: '2',
    views: 10230,
    enrollments: 412,
    completions: 245,
    averageRating: 4.9,
    completionRate: 59.5,
    revenueGenerated: 24717.88
  },
  {
    courseId: '3',
    views: 12680,
    enrollments: 587,
    completions: 320,
    averageRating: 4.7,
    completionRate: 54.5,
    revenueGenerated: 26409.13
  },
  {
    courseId: '4',
    views: 9450,
    enrollments: 498,
    completions: 287,
    averageRating: 4.6,
    completionRate: 57.6,
    revenueGenerated: 19915.02
  },
  {
    courseId: '5',
    views: 15320,
    enrollments: 735,
    completions: 410,
    averageRating: 4.5,
    completionRate: 55.8,
    revenueGenerated: 25718.65
  },
  {
    courseId: '6',
    views: 11780,
    enrollments: 623,
    completions: 352,
    averageRating: 4.7,
    completionRate: 56.5,
    revenueGenerated: 34257.77
  }
];

export const educatorAnalytics: EducatorAnalytics[] = [
  {
    educatorId: '101',
    totalStudents: 1060,
    totalCourses: 2,
    averageCourseRating: 4.65,
    totalRevenue: 41966.40,
    courseCompletionRate: 55.3
  },
  {
    educatorId: '102',
    totalStudents: 1035,
    totalCourses: 2,
    averageCourseRating: 4.8,
    totalRevenue: 58975.65,
    courseCompletionRate: 58.0
  },
  {
    educatorId: '103',
    totalStudents: 587,
    totalCourses: 1,
    averageCourseRating: 4.7,
    totalRevenue: 26409.13,
    courseCompletionRate: 54.5
  },
  {
    educatorId: '104',
    totalStudents: 498,
    totalCourses: 1,
    averageCourseRating: 4.6,
    totalRevenue: 19915.02,
    courseCompletionRate: 57.6
  }
];

export const platformAnalytics: PlatformAnalytics = {
  totalStudents: 3180,
  totalEducators: 4,
  totalCourses: 6,
  coursesCreatedThisMonth: 1,
  newStudentsThisMonth: 245,
  totalRevenue: 147266.20,
  pendingApprovals: 2
};

export const monthlySales = [
  { month: 'Jan', revenue: 8320 },
  { month: 'Feb', revenue: 9450 },
  { month: 'Mar', revenue: 11200 },
  { month: 'Apr', revenue: 15300 },
  { month: 'May', revenue: 12800 },
  { month: 'Jun', revenue: 16500 },
  { month: 'Jul', revenue: 19200 },
  { month: 'Aug', revenue: 18400 },
  { month: 'Sep', revenue: 17300 },
  { month: 'Oct', revenue: 21500 },
  { month: 'Nov', revenue: 22600 },
  { month: 'Dec', revenue: 24800 }
];

export const studentGrowth = [
  { month: 'Jan', students: 220 },
  { month: 'Feb', students: 270 },
  { month: 'Mar', students: 310 },
  { month: 'Apr', students: 285 },
  { month: 'May', students: 340 },
  { month: 'Jun', students: 390 },
  { month: 'Jul', students: 320 },
  { month: 'Aug', students: 280 },
  { month: 'Sep', students: 310 },
  { month: 'Oct', students: 350 },
  { month: 'Nov', students: 410 },
  { month: 'Dec', students: 450 }
];

export const categoryDistribution = [
  { category: 'Development', percentage: 35 },
  { category: 'Business', percentage: 25 },
  { category: 'Data Science', percentage: 20 },
  { category: 'Psychology', percentage: 10 },
  { category: 'Others', percentage: 10 }
];

export const getCourseAnalyticsById = (courseId: string) => {
  return courseAnalytics.find(analytics => analytics.courseId === courseId);
};

export const getEducatorAnalyticsById = (educatorId: string) => {
  return educatorAnalytics.find(analytics => analytics.educatorId === educatorId);
};