import { Student, Educator, Admin } from '../types';

export const students: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-09-15T10:30:00Z',
    enrolledCourses: ['1', '3', '5'],
    completedCourses: ['2'],
    progress: {
      '1': 45,
      '3': 20,
      '5': 10,
      '2': 100
    },
    cart: []
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-10-05T14:20:00Z',
    enrolledCourses: ['2', '4'],
    completedCourses: ['1', '3'],
    progress: {
      '2': 75,
      '4': 30,
      '1': 100,
      '3': 100
    },
    cart: ['6']
  },
  {
    id: '3',
    name: 'Michael Wong',
    email: 'michael@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-08-22T09:15:00Z',
    enrolledCourses: ['1', '6'],
    completedCourses: [],
    progress: {
      '1': 15,
      '6': 5
    },
    cart: ['2', '3']
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-11-10T16:45:00Z',
    enrolledCourses: ['3', '5'],
    completedCourses: ['4'],
    progress: {
      '3': 60,
      '5': 25,
      '4': 100
    },
    cart: []
  },
  {
    id: '5',
    name: 'David Smith',
    email: 'david@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-07-30T11:50:00Z',
    enrolledCourses: ['2'],
    completedCourses: ['1', '5', '6'],
    progress: {
      '2': 90,
      '1': 100,
      '5': 100,
      '6': 100
    },
    cart: ['3', '4']
  }
];

export const educators: Educator[] = [
  {
    id: '101',
    name: 'Dr. Robert Miller',
    email: 'robert@example.com',
    role: 'educator',
    avatar: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-01-15T08:30:00Z',
    courses: ['1', '5'],
    bio: 'PhD in Computer Science with 10+ years of teaching experience',
    expertise: ['Machine Learning', 'AI', 'Data Science'],
    rating: 4.8
  },
  {
    id: '102',
    name: 'Prof. Jennifer Lee',
    email: 'jennifer@example.com',
    role: 'educator',
    avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-02-20T13:45:00Z',
    courses: ['2', '6'],
    bio: 'Harvard Business School graduate with extensive industry experience',
    expertise: ['Business Strategy', 'Marketing', 'Entrepreneurship'],
    rating: 4.9
  },
  {
    id: '103',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'educator',
    avatar: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-03-10T10:15:00Z',
    courses: ['3'],
    bio: 'Full-stack developer and tech educator with 15 years of experience',
    expertise: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    rating: 4.7
  },
  {
    id: '104',
    name: 'Dr. Maya Patel',
    email: 'maya@example.com',
    role: 'educator',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2023-04-05T15:20:00Z',
    courses: ['4'],
    bio: 'Neuroscientist and psychology professor at Stanford University',
    expertise: ['Psychology', 'Neuroscience', 'Cognitive Behavior'],
    rating: 4.6
  }
];

export const admins: Admin[] = [
  {
    id: '201',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2022-12-01T09:00:00Z',
    permissions: ['user_management', 'content_approval', 'analytics_access', 'settings']
  }
];

export const allUsers = [...students, ...educators, ...admins];

export const findUserByEmail = (email: string) => {
  return allUsers.find(user => user.email === email);
};

export const findUserById = (id: string) => {
  return allUsers.find(user => user.id === id);
};